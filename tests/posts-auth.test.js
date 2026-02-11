import request from "supertest";
import app from "../app.js";


test("POST /api/posts returns 401 without token", async () => {
  const res = await request(app)
    .post("/api/posts")
    .send({ title: "t", content: "c" });

  expect(res.status).toBe(401);
  expect(res.body).toHaveProperty("error");
});

test("GET /api/posts/ return 200 (get all posts)", async () => {

    const res = await request(app)
        .get("/api/posts/")

        console.log("STATUS:", res.status);
  console.log("BODY:", res.body);
  console.log("TEXT:", res.text);


    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
})