import {Author, AuthorRole, Blog, CheckResult, Client, Comment, CommentType} from "@cedx/akismet";
import {use} from "chai";
import chaiAsPromised from "chai-as-promised";
import "chai/register-should.js";
import {env} from "node:process";

/**
 * Tests the features of the {@link Client} class.
 */
describe("Client", () => {
	use(chaiAsPromised);

	// The client used to query the remote API.
	const client = new Client(env.AKISMET_API_KEY ?? "", new Blog({url: "https://github.com/CedX/Akismet.js"}), {isTest: true});

	// A comment with content marked as ham.
	const ham = new Comment({
		author: new Author({
			ipAddress: "192.168.0.1",
			name: "Akismet",
			role: AuthorRole.Administrator,
			url: "https://cedric-belin.fr",
			userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:156.0) Gecko/20100101 Firefox/156.0"
		}),
		content: "I'm testing out the Service API.",
		referrer: "https://www.npmjs.com/package/@cedx/akismet",
		type: CommentType.Comment
	});

	// A comment with content marked as spam.
	const spam = new Comment({
		author: new Author({
			email: "akismet-guaranteed-spam@example.com",
			ipAddress: "127.0.0.1",
			name: "viagra-test-123",
			userAgent: "Spam Bot/6.6.6"
		}),
		content: "Spam!",
		type: CommentType.BlogPost
	});

	context("checkComment()", () => {
		it("should return `CheckResult.Ham` for valid comment (e.g. ham)", async () =>
			(await client.checkComment(ham)).should.equal(CheckResult.Ham));

		it("should return `CheckResult.Spam` for invalid comment (e.g. spam)", async () => {
			const isSpam = [CheckResult.Spam, CheckResult.PervasiveSpam];
			(await client.checkComment(spam)).should.be.oneOf(isSpam);
		});
	});

	context("submitHam()", () =>
		it("should complete without any error", () => client.submitHam(ham).should.be.fulfilled));

	context("submitSpam()", () =>
		it("should complete without any error", () => client.submitSpam(spam).should.be.fulfilled));

	context("verifyKey()", () => {
		it("should return `true` for a valid API key", async () =>
			(await client.verifyKey()).should.be.true);

		it("should return `false` for an invalid API key", async () =>
			(await new Client("0123456789AB", client.blog, {isTest: true}).verifyKey()).should.be.false);
	});
});
