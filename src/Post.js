import React, { useEffect } from "react";
import "./Post.css";

import Tools from "./Tools.js";
import CommentBlock from "./CommentBlock.js";
import EditBlock from "./EditBlock.js";

import axios from "axios";

import { useSelector, useDispatch } from "react-redux";

import { selectPost, set_post } from "./features/postSlice.js";
import { selectComments, set_comments } from "./features/commentsSlice.js";

import DeleteIcon from "@material-ui/icons/Delete";
import { IconButton } from "@material-ui/core";

function Post() {
	const post = useSelector(selectPost);
	const comments = useSelector(selectComments);
	const dispatch = useDispatch();

	//function for saving data to localstorage
	const saveToLocalStorage = () => {
		try {
			const data = JSON.stringify(post);
			localStorage.setItem("state", data);
		} catch (e) {
			console.log(e);
		}
	};

	useEffect(() => {
		async function findPost(post) {
			await axios
				.get(
					`https://bloggy-api.herokuapp.com/posts/${post?.id}?_embed=comments`
				)
				.then((response) => {
					const { id, title, body } = response.data;

					dispatch(set_comments(response.data.comments));
					dispatch(
						set_post({
							id: id,
							title: title,
							body: body,
						})
					);
				})
				.catch((e) => {
					console.log(e);
				});
		}

		//if user reload page and data gone from redux, then get last saved data from localstorage
		if (post == null) {
			const data = JSON.parse(localStorage.getItem("state"));
			dispatch(set_post(data));

			findPost(data);
		} else {
			//in other case save data to localstorage
			saveToLocalStorage();

			findPost(post);
		}
	}, []);

	return (
		<React.Fragment>
			<div className="post">
				<h1 className="post_title">{post?.title}</h1>
				<p className="post_description">{post?.body}</p>

				<Tools />
			</div>

			<div className="comments">
				{comments.map((comment) => (
					<p key={comment.id} className="comment">
						{comment.body}

						<IconButton>
							<DeleteIcon />
						</IconButton>
					</p>
				))}
			</div>

			<CommentBlock />
			<EditBlock />
		</React.Fragment>
	);
}

export default Post;
