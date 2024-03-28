import CartsRepository from "./carts.repository.js";
import ProductsRepository from "./products.repository.js";
import UsersRepository from "./users.repository.js";

import CartModel from "../models/cart.model.js";
import ProductModel from "../models/product.model.js";
import UserModel from "../models/user.model.js";

export default {
    carts: new CartsRepository(CartModel),
    products: new ProductsRepository(ProductModel),
    users: new UsersRepository(UserModel),
};