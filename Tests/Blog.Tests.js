import {Blog} from "@cedx/akismet";
import "chai/register-should.js";

/**
 * Tests the features of the {@link Blog} class.
 */
describe("Blog", () => {
	context("toJSON()", () => {
		it("should return only the blog URL with a newly created instance", () => {
			const json = new Blog({url: "https://github.com/CedX/Akismet.js"}).toJSON();
			Object.keys(json).should.have.lengthOf(1);
			json.blog.should.equal("https://github.com/CedX/Akismet.js");
		});

		it("should return a non-empty map with an initialized instance", () => {
			const json = new Blog({charset: "UTF-8", languages: ["en", "fr"], url: "https://github.com/CedX/Akismet.js"}).toJSON();
			Object.keys(json).should.have.lengthOf(3);
			json.blog.should.equal("https://github.com/CedX/Akismet.js");
			json.blog_charset.should.equal("UTF-8");
			json.blog_lang.should.equal("en,fr");
		});
	});
});
