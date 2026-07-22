/**
 * Specifies the role of an author.
 */
export const AuthorRole = Object.freeze({

	/**
	 * The author is an administrator.
	 */
	Administrator: "administrator"
});

/**
 * Specifies the role of an author.
 */
export type AuthorRole = typeof AuthorRole[keyof typeof AuthorRole];
