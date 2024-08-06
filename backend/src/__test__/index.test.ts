import request from "supertest";
import app from "../index";
import { Server } from "http";

let server: Server;

beforeAll((done) => {
  server = app.listen(done);
});

afterAll((done) => {
  server.close(done);
});

describe("GET /", () => {
  it("should respond with Hello World!", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.text).toBe("Hello World!");
  });
});
