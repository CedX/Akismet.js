import {Author} from "@cedx/akismet";
import "chai/register-should.js";

/**
 * Tests the features of the {@link Author} class.
 */
describe("Author", () => {
	context("toJSON()", () => {
		it("should return only the IP address with a newly created instance", () => {
			const json = new Author({ipAddress: "127.0.0.1"}).toJSON();
			Object.keys(json).should.have.lengthOf(1);
			json.user_ip.should.equal("127.0.0.1");
		});

		it("should return a non-empty map with an initialized instance", () => {
			const json = new Author({
				email: "contact@cedric-belin.fr",
				ipAddress: "192.168.0.1",
				name: "Cédric Belin",
				url: "https://cedric-belin.fr",
				userAgent: "Mozilla/5.0"
			}).toJSON();

			Object.keys(json).should.have.lengthOf(5);
			json.comment_author.should.equal("Cédric Belin");
			json.comment_author_email.should.equal("contact@cedric-belin.fr");
			json.comment_author_url.should.equal("https://cedric-belin.fr/");
			json.user_agent.should.equal("Mozilla/5.0");
			json.user_ip.should.equal("192.168.0.1");
		});
	});
});
