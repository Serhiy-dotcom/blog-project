import React from "react";
import "./Tools.css";

import axios from "axios";

import CommentIcon from "@material-ui/icons/Comment";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

import { IconButton } from "@material-ui/core";

import { useSelector } from "react-redux";

import { selectPost } from "./features/postSlice.js";

import { useHistory } from "react-router-dom";

function Tools() {
	const post = useSelector(selectPost);
	const history = useHistory();

	const performComment = () => {
		const comment_section = document.getElementsByClassName(
			"comment_input"
		)[0];

		comment_section.style.display = "block";
	};

	const performEdit = () => {
		const edit_input_block = document.getElementsByClassName(
			"edit_input_block"
		)[0];

		edit_input_block.style.display = "block";
	};

	const performDelete = async () => {
		await axios.delete(`https://bloggy-api.herokuapp.com/posts/${post.id}`);

		history.push("/");
	};

	return (
		<div className="tools">
			<IconButton onClick={() => performComment()}>
				<CommentIcon />
			</IconButton>

			<IconButton onClick={() => performEdit()}>
				<EditIcon />
			</IconButton>

			<IconButton onClick={() => performDelete()}>
				<DeleteIcon />
			</IconButton>
		</div>
	);
}

export default Tools;
