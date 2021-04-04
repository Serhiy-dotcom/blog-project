import React from "react";
import "./EditBlock.css";

import axios from "axios";

import { useSelector, useDispatch } from "react-redux";

import { selectPost, set_post } from "./features/postSlice.js";

function EditBlock() {
	const post = useSelector(selectPost);
	const dispatch = useDispatch();

	const submitHandler = async (e) => {
		const edit_section = document.getElementsByClassName(
			"edit_input_block"
		)[0];
		const edit_input = document.getElementById("edit_input");
		const edit_textarea = document.getElementById("edit_textarea");

		e.preventDefault();

		//updating data in API
		await axios
			.put(`https://bloggy-api.herokuapp.com/posts/${post.id}`, {
				title: edit_input?.value,
				body: edit_textarea?.value,
			})
			.then((response) => {
				console.log(response.status);
			})
			.catch((e) => {
				console.log(e);
			});

		//getting current title and body from API
		await axios
			.get(
				`https://bloggy-api.herokuapp.com/posts/${post?.id}?_embed=comments`
			)
			.then((response) => {
				dispatch(set_post(response.data));
			})
			.catch((e) => {
				console.log(e);
			});

		edit_input.value = "";
		edit_textarea.value = "";
		edit_section.style.cssText = "display:none";
	};

	const closeEditor = () => {
		const edit_section = document.getElementsByClassName(
			"edit_input_block"
		)[0];

		edit_section.style.display = "none";
	};

	return (
		<div className="edit_input_block">
			<div className="editBlock">
				<form onSubmit={(e) => submitHandler(e)}>
					<h3>Edit your header: </h3>
					<input type="text" id="edit_input" required />

					<h3>Edit your description: </h3>
					<textarea type="text" id="edit_textarea" required />

					<button type="submit">Submit</button>
					<button onClick={() => closeEditor()}>Cancel</button>
				</form>
			</div>

			<div className="editBlock_bg"></div>
		</div>
	);
}

export default EditBlock;
