import {Author, Comment, CommentType} from "@cedx/akismet";
import "chai/register-should.js";

/**
 * Tests the features of the {@link Comment} class.
 */
describe("Comment", () => {
	context("toJSON()", () => {
		it("should return only the author info with a newly created instance", () => {
			const json = new Comment({author: new Author({ipAddress: "127.0.0.1"})}).toJSON();
			Object.keys(json).should.have.lengthOf(1);
			json.user_ip.should.equal("127.0.0.1");
		});

		it("should return a non-empty map with an initialized instance", () => {
			const json = new Comment({
				author: new Author({ipAddress: "127.0.0.1", name: "Cédric Belin", userAgent: "Doom/6.6.6"}),
				content: "A user comment.",
				date: new Date("2000-01-01T00:00:00.000Z"),
				referrer: "https://cedric-belin.fr",
				type: CommentType.BlogPost
			}).toJSON();

			Object.keys(json).should.have.lengthOf(7);
			json.comment_author.should.equal("Cédric Belin");
			json.comment_content.should.equal("A user comment.");
			json.comment_date_gmt.should.equal("2000-01-01T00:00:00.000Z");
			json.comment_type.should.equal("blog-post");
			json.referrer.should.equal("https://cedric-belin.fr/");
			json.user_agent.should.equal("Doom/6.6.6");
			json.user_ip.should.equal("127.0.0.1");
		});
	});
});
