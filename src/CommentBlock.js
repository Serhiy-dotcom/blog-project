import React from "react";
import "./CommentBlock.css";

import axios from "axios";

import { useSelector, useDispatch } from "react-redux";

import { selectPost } from "./features/postSlice.js";
import { set_comments } from "./features/commentsSlice.js";

function CommentBlock() {
	const post = useSelector(selectPost);
	const dispatch = useDispatch();

	const submitHandler = async (e) => {
		console.log("comment block");
		const comment_input = document.getElementsByClassName(
			"comment_input"
		)[0];
		const comment_textarea = document.getElementById("comment_textarea")
			.value;

		e.preventDefault();

		//post comment for specific Post
		await axios
			.post("https://bloggy-api.herokuapp.com/comments", {
				postId: post.id,
				body: comment_textarea,
			})
			.then((response) => {
				console.log(response.status);
			})
			.catch((e) => {
				console.log(e);
			});

		//getting comments
		await axios
			.get(
				`https://bloggy-api.herokuapp.com/posts/${post?.id}?_embed=comments`
			)
			.then((response) => {
				dispatch(set_comments(response.data.comments));
			})
			.catch((e) => {
				console.log(e);
			});

		comment_input.value = "";
		comment_input.style.cssText = "display:none";
	};

	const closeCommentEditor = () => {
		const comment_input = document.getElementsByClassName(
			"comment_input"
		)[0];

		comment_input.style.display = "none";
	};

	return (
		<div className="comment_input">
			<div className="commentBlock">
				<form onSubmit={(e) => submitHandler(e)}>
					<h3>Add your comment: </h3>
					<textarea type="text" id="comment_textarea" required />

					<button type="submit">Send</button>
					<button onClick={() => closeCommentEditor()}>Cancel</button>
				</form>
			</div>

			<div className="commentBlock_bg"></div>
		</div>
	);
}

export default CommentBlock;
