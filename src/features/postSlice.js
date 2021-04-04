import { createSlice } from "@reduxjs/toolkit";

export const postSlice = createSlice({
	name: "post",
	initialState: {
		post: null,
	},
	reducers: {
		set_post: (state, action) => {
			state.post = action.payload;
		},
	},
});

export const { set_post } = postSlice.actions;

export const selectPost = (state) => state.post.post;

export default postSlice.reducer;
