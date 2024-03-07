import { describe, it, before, after } from "node:test";
import assert from "node:assert"
import { app } from "./app.js";

let server;
let apiBaseUrl;

describe("USER ROLE PERMISSION", () => {

  before(async () => {
    // Start a testing server
    const port = 7357;
    server = app.listen(port);
    apiBaseUrl = `http://localhost:${port}`;
  });

  after(async () => {
    await server.close();
  });

  it("should get the home page without authentication", async () => {
    const { status } = await fetch(`${apiBaseUrl}/`);

    assert.equal(status, 200);
  });

  it("should not get the delivery page without authentication", async () => {
    const { status } = await fetch(`${apiBaseUrl}/delivery/42`);

    assert.equal(status, 401);
  });

  it("should allow Alice (pizzaiolo) to create a pizza", async () => {
    const ALICE_API_KEY = 1;

    const { status } = await fetch(`${apiBaseUrl}/pizzas`, {
      method: "POST", headers: { "x-api-key": ALICE_API_KEY }
    });

    assert.equal(status, 200);
  });

  it("should not allow Bob (waiter) to create a pizza", async () => {
    const BOB_API_KEY = 2;

    const { status } = await fetch(`${apiBaseUrl}/pizzas`, {
      method: "POST", headers: { "x-api-key": BOB_API_KEY }
    });

    assert.equal(status, 403);
  });
});
