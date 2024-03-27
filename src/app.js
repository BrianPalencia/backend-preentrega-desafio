import express from "express";
import passport from "passport";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import { Server } from "socket.io";
import handlebars from "express-handlebars";
import IndexRouter from "./routes/index.routes.js";
import dotenv from "dotenv";
import { __dirname } from "./utils/utils.js";
import configPassport from "./config/passport.config.js";
import compression from "express-compression";
dotenv.config();

const app = express();
const DB_URL = process.env.DB_URL || "mongodb://localhost:27017/";
const PORT = process.env.PORT || 8080;
const COOCKIESECRET = process.env.CODERSECRET;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser(COOCKIESECRET));

app.use(express.static("src/public"));

app.engine("handlebars", handlebars.engine());
app.set("views", "src/views");
app.set("view engine", "handlebars");

app.use(
    session({
        store: MongoStore.create({
            mongoUrl: DB_URL,
            mongoOptions: {
                useNewUrlParser: true,
            },
            ttl: 600,
        }),
        secret: "COOCKIESECRET",
        resave: false,
        saveUninitialized: true,
    })
);

configPassport();
app.use(passport.initialize());
app.use(passport.session());
app.use("/", IndexRouter);

const server = app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

server.on("error", (error) => console.log(error));

const io = new Server(server);

io.on("connection", (socket) => {
    console.log("Se conecto un nuevo ususario");
});

app.get("/", (req, res) => {
    if (req.session.counter) {
        req.session.counter++;
        res.send(`Counter: ${req.session.counter}`);
    } else {
        req.session.counter = 1;
        res.send("Bienvenido");
    }
});

startMongoConnection()
    .then(() => {
        console.log("Conectado a la base de datos");
    })
    .catch((err) => console.log(err));

async function startMongoConnection() {
    await mongoose.connect(DB_URL);
}

app.use(errorHandler);

app.use("/api/user", userRoute);
app.get("*", (req, res) => {
    CustomError.createError({
        name: "Estas perdido",
        cause: req.url,
        message: "La ruta que buscas no existe",
        code: EErrors.ROUTING_ERROR,
    });
});

function generarProductosMock() {
    const productosMock = [];
    for (let i = 0; i < 100; i++) {
        const producto = {
            _id: `producto_${i + 1}`,
            nombre: `Producto ${i + 1}`,
            precio: 10.99,
            descripcion: `Descripción del producto ${i + 1}`
        };
        productosMock.push(producto);
    }
    return productosMock;
}

app.get('/mockingproducts', (req, res) => {
    const productosMock = generarProductosMock();
    res.json(productosMock);
});