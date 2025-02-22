const express = require("express");
const serverless = require("serverless-http");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const sequelize = require("../../db/sequelize"); // Adapte le chemin si nécessaire
const cors = require("cors");

const app = express();

app
    .use(bodyParser.json())
    .use(express.urlencoded({ extended: true }))
    .use(morgan("dev"))
    .use(cors())
    .use(express.json());

app.get("/", (req, res) => {
    res.send("Hello depuis l'API.");
});

app.get("/hello", (req, res) => {
    res.json({ message: "Hello from Netlify Functions!" });
});

sequelize.initBD();

require("../../routes/user/setUser")(app);
require("../../routes/task/setTask")(app);
require("../../routes/task/getTask")(app);
require("../../routes/user/getUser")(app);

app.use(({ res }) => {
    const message = "Impossible de trouver le service demandé. Veuillez saisir une autre URL.";
    res.status(404).json({ message });
});

module.exports.handler = serverless(app);
