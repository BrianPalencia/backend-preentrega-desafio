import express from "express";
import ProductsRouter from "./products.routes.js";
import CartsRouter from "./carts.routes.js";
import ViewsRouter from "./views.routes.js";
import SessionsRouter from "../routes/session.routes.js";
import TicketRouter from "../routes/ticket.routes.js";
import mockingRouter from "../routes/mocking.routes.js";


const IndexRouter = express.Router();

IndexRouter.use("/api/products", ProductsRouter);
IndexRouter.use("/api/carts", CartsRouter);
IndexRouter.use("/", ViewsRouter);
IndexRouter.use("/login", ViewsRouter);
IndexRouter.use("/signup", ViewsRouter);
IndexRouter.use("/api/sessions", SessionsRouter);
IndexRouter.use("/api/tickets", TicketRouter);
IndexRouter.use("/api/mockingproducts", mockingRouter);

export default IndexRouter;