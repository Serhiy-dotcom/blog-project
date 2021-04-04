import React, { useState, useEffect } from "react";
import "./Posts.css";

//axios for fetching data
import axios from "axios";

import { useHistory } from "react-router-dom";

import { useDispatch } from "react-redux";

import { set_post } from "./features/postSlice.js";

import VisibilityIcon from "@material-ui/icons/Visibility";

function Posts() {
	const [posts, setPosts] = useState([]);
	const history = useHistory();
	const dispatch = useDispatch();

	useEffect(() => {
		async function findPosts() {
			await axios
				.get("https://bloggy-api.herokuapp.com/posts")
				.then((response) => {
					setPosts(response.data);
				})
				.catch((error) => {
					console.log(error);
				});
		}

		findPosts();
	}, []);

	//checkPost redirect user to specific post
	const checkPost = (post) => {
		dispatch(set_post(post));

		history.push(`/post/${post.id}`);
	};

	return (
		<React.Fragment>
			<h1>Blog</h1>

			<div className="posts">
				{posts?.map((post) => (
					<div
						key={post?.id}
						className="posts_elem"
						onClick={() => checkPost(post)}
					>
						<h2>{post?.title}</h2>
						<p>{post?.body}</p>

						<div className="posts_elem_bg"></div>
						<div className="posts_elem_icon">
							<VisibilityIcon />
						</div>
					</div>
				))}
			</div>
		</React.Fragment>
	);
}

export default Posts;
