import React from "react";
import "./CreatePost.css";

import axios from "axios";

import { useHistory } from "react-router-dom";

function CreatePost() {
	const history = useHistory();

	const submitHandler = async (e) => {
		const title = document.getElementById("createPost_title").value;
		const body = document.getElementById("createPost_description").value;

		e.preventDefault();

		await axios
			.post("https://bloggy-api.herokuapp.com/posts", {
				title: title,
				body: body,
			})
			.then((response) => {
				console.log(response.status);
			})
			.catch((e) => {
				console.log(e);
			});

		history.push("/");
	};

	return (
		<div className="createPost">
			<form onSubmit={(e) => submitHandler(e)}>
				<h2>Input your title: </h2>
				<input type="text" id="createPost_title" required />

				<h2>Input your description: </h2>
				<textarea type="text" id="createPost_description" required />

				<button>Create</button>
			</form>
		</div>
	);
}

export default CreatePost;
