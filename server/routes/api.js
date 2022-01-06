/*
/ Rick Fox
/ 01-06-22
/ Api route handlers
*/

const express = require("express"),
	db = require("../models/api"),
	{ validateUserToken } = require("../token-utils");

// Create a router for these stubs
let router = express.Router();

const sendErrorResponse = (res, code, message) => {
	res.status(code).send({
		message: message,
		status: "error",
	});
};

const validateQuery = (res, count) => {
	// validate the query params
	if (!count || !Number(count)) {
		return sendErrorResponse(
			res,
			400,
			"Missing or invalid query param count"
		);
	}
};

//
// Get all posts stub
//
router.get("/:userId/posts", validateUserToken, async (req, res, next) => {
	// Pull vars from the query string
	const { count, next_id } = req.query,
		// Pull vars from the params
		{ userId } = req.params;

	// console.log(count, next_id, userId);

	// Validate the query params
	validateQuery(res, count);

	// get all of the posts for this page
	let postsData;
	try {
		postsData = await db.getPosts(parseInt(count), next_id);
	} catch (e) {
		console.error(e);
		return sendErrorResponse(res, 500, "Could not get this page of posts.");
	}
	// Send a response
	res.send({ status: "success", ...postsData });
});

//
// Create a new post stub
//
router.post("/:userId/posts", validateUserToken, async (req, res, next) => {
	// Pull vars from the body
	const { title, body } = req.body,
		// Pull vars from the params
		{ userId } = req.params;

	// console.log(title, body, userId);

	// create the new post
	let newPost;
	try {
		newPost = await db.addPost(userId, title, body);
	} catch (e) {
		console.error(e);
		return sendErrorResponse(
			res,
			500,
			"Could not create the post at this time."
		);
	}
	// Send a response
	res.send({ status: "success", ...newPost });
});

//
// Get a post by id stub
//
router.get("/:userId/posts/:id", validateUserToken, async (req, res, next) => {
	// Pull vars from the params
	const { userId, id } = req.params;

	// console.log(userId, id);

	// get all of the post meta for this id
	let postData;
	try {
		postData = await db.getPostById(id);
	} catch (e) {
		console.error(e);
		return sendErrorResponse(res, 500, "Could not get this page of posts.");
	}
	// Send a response
	res.send({ status: "success", ...postData });
});

//
// Get a posts comments by id stub
//
router.get(
	"/:userId/posts/:id/comments",
	validateUserToken,
	async (req, res, next) => {
		// Pull vars from the query string
		const { count, next_id } = req.query,
			// Pull vars from the params
			{ userId, id } = req.params;

		// console.log(count, next_id, userId, id);

		// Validate the query params
		validateQuery(res, count);

		// get all of the post meta for this id
		let posts;
		try {
			posts = await db.getPostComments(id, parseInt(count), next_id);
		} catch (e) {
			console.error(e);
			return sendErrorResponse(
				res,
				500,
				"Could not get this page of posts."
			);
		}
		// Send a response
		res.send({ status: "success", ...posts });
	}
);

//
// Add a post comment by id stub
//
router.post(
	"/:userId/posts/:id/comments",
	validateUserToken,
	async (req, res, next) => {
		// Pull vars from the body
		const { body } = req.body,
			// Pull vars from the params
			{ userId, id } = req.params;

		// console.log(body, userId, id);

		// add a new comment for this post
		let newComment;
		try {
			newComment = await db.addPostComment(userId, id, body);
		} catch (e) {
			console.error(e);
			return sendErrorResponse(
				res,
				500,
				"Could not get this page of posts."
			);
		}
		// Send a response
		res.send({ status: "success", ...newComment });
	}
);

module.exports = router;
