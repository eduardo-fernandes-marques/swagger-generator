import request from "supertest";

import app from "#/app";

describe("routes", () => {
  it("routes › should handle not found", async (done) => {
    request(app())
      .get("/api/v0/test/")
      .expect(404)
      .end((error, response) => {
        if (error) return done(error);

        expect(response.text).toBe("Not Found");

        done();
      });
  });
});
