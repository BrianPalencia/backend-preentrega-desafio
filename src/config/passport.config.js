import passport from "passport";
import passportLocal from "passport-local";

import * as dotenv from "dotenv";
import bcrypt from "bcrypt";
import UserService from "../dao/mongo/services/db/User.service.db.js";
import CartService from "../dao/mongo/services/db/Carts.service.db.js";

dotenv.config();

const userService = new UserService();
const cartService = new CartService();

const configPassport = () => {
    passport.use(
        "login",
        new passportLocal.Strategy(
            {
                usernameField: "email",
                passwordField: "password",
                passReqToCallback: true,
            },

            async function (req, username, password, done) {
                try {
                    const user = await userService.getUserByEmail(username);

                    if (!user) {
                        req.loginSuccess = false;
                        return done(null, false, { message: "User not found" });
                    }
                    const passwordMatches = await bcrypt.compare(password, user.password);
                    if (!passwordMatches) {
                        req.loginSuccess = false;
                        return done(null, false, { message: "Password incorrect" });
                    }
                    req.loginSuccess = true;
                    return done(null, user);
                } catch (error) {
                    console.log(error.message);
                    return done(error);
                }
            }
        )
    );

    passport.use(
        "signup",
        new passportLocal.Strategy(
            {
                usernameField: "email",
                passwordField: "password",
                passReqToCallback: true,
            },
            async function (req, username, password, done) {
                try {
                    const user = await userService.getUserByEmail(username);
                    if (user) {
                        req.SignupSuccess = false;
                        req.message = "User not found";
                        return done(null, false, { message: "User already exists" });
                    }

                    const hashedPassword = await bcrypt.hash(password, 10);

                    const { age, first_name, last_name } = req.body;

                    const cart = await cartService.createCart();

                    const newUser = await userService.createUser({
                        email: username,
                        password: hashedPassword,
                        age,
                        first_name,
                        last_name,
                        cart: cart._id,
                    });

                    if (!newUser) {
                        req.SignupSuccess = false;
                        return done(null, false, { message: "internal server error" });
                    }
                    req.SignupSuccess = true;
                    return done(null, newUser);
                } catch (error) {
                    console.log(error.message);
                    return done(error);
                }
            }
        )
    );

    passport.serializeUser(function (user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(async function (id, done) {
        const user = await userService.getUserById(id);
        delete user.password;
        done(null, user);
    });
};

export default configPassport;

