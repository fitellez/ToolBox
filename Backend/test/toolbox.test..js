const request = require("supertest");
const app = require("../index");

/**
 * Testing get point
 */

it("Servidor principal se inicia", (done) => {
  request(app)
    .get("/")
    .set("Accept", "application/json")
    .expect("Content-Type", /json/)
    .expect(200, done);
});

describe("Endpoint principal: /text/:text", () => {
  it("responde al enpoint text/:text cuando se envia texto", (done) => {
    request(app)
      .get("/text/Palabra")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
});
