/**
 * Specifies the type of a comment.
 */
export const CommentType = Object.freeze({

	/**
	 * A blog post.
	 */
	BlogPost: "blog-post",

	/**
	 * A blog comment.
	 */
	Comment: "comment",

	/**
	 * A contact form or feedback form submission.
	 */
	ContactForm: "contact-form",

	/**
	 * A top-level forum post.
	 */
	ForumPost: "forum-post",

	/**
	 * A message sent between just a few users.
	 */
	Message: "message",

	/**
	 * A reply to a top-level forum post.
	 */
	Reply: "reply",

	/**
	 * A new user account.
	 */
	Signup: "signup"
});

/**
 * Specifies the type of a comment.
 */
export type CommentType = typeof CommentType[keyof typeof CommentType];
