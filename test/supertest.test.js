import supertest from "supertest";
import chai from "chai";

const expect = chai.expect;
const requester = supertest("http://localhost:8080");

describe ("Testing Proyecto Ecommerce", () => {
    it("GET /products", async () => {
        const response = await requester.get("/products");
        expect(response.status).to.equal(200);
    });
    it("POST /products", async () => {
        const response = await requester.post("/products");
        expect(response.status).to.equal(200);
    });
    it("PUT /products", async () => {
        const response = await requester.put("/products");
        expect(response.status).to.equal(200);
    });
    it("DELETE /products", async () => {
        const response = await requester.delete("/products");
        expect(response.status).to.equal(200);
    });
})

describe ("Testing Proyecto Ecommerce", () => {
    it("GET /users", async () => {
        const response = await requester.get("/users");
        expect(response.status).to.equal(200);
    });
    it("POST /users", async () => {
        const response = await requester.post("/users");
        expect(response.status).to.equal(200);
    });
    it("PUT /users", async () => {
        const response = await requester.put("/users");
        expect(response.status).to.equal(200);
    });
    it("DELETE /users", async () => {
        const response = await requester.delete("/users");
        expect(response.status).to.equal(200);
    });
})
describe ("Testing Proyecto Ecommerce", () => {
    it("GET /carts", async () => {
        const response = await requester.get("/carts");
        expect(response.status).to.equal(200);
    });
    it("POST /carts", async () => {
        const response = await requester.post("/carts");
        expect(response.status).to.equal(200);
    });
    it("PUT /carts", async () => {
        const response = await requester.put("/carts");
        expect(response.status).to.equal(200);
    });
    it("DELETE /carts", async () => {   
        const response = await requester.delete("/carts");
        expect(response.status).to.equal(200);
    });
})