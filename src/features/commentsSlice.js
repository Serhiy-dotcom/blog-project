import { createSlice } from "@reduxjs/toolkit";

export const commentsSlice = createSlice({
	name: "comments",
	initialState: {
		comments: [],
	},
	reducers: {
		set_comments: (state, action) => {
			state.comments = action.payload;
		},
	},
});

export const { set_comments } = commentsSlice.actions;

export const selectComments = (state) => state.comments.comments;

export default commentsSlice.reducer;
