import express from "express";
import services from "../services/factory.js";
import CartController from "../controller/carts.controller.js";

const cartsRouter = express.Router();
const cartsController = new CartController(services.cartsService);

cartsRouter.post("/", cartsController.createCart);
cartsRouter.get("/", cartsController.getCarts);
cartsRouter.get("/:cid", cartsController.getCart);
cartsRouter.post("/:cid/product/:pid", cartsController.addProductToCart);
cartsRouter.put("/:cid/product/:pid", cartsController.updateProductQuantity);
cartsRouter.delete("/:cid/product/:pid", cartsController.removeProductFromCart);
cartsRouter.delete("/:cid", cartsController.deleteCart);

export default cartsRouter;
