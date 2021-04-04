import { configureStore } from "@reduxjs/toolkit";
import postReducer from "../features/postSlice.js";
import commentsReducer from "../features/commentsSlice.js";

export default configureStore({
	reducer: {
		post: postReducer,
		comments: commentsReducer,
	},
});
