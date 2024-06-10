const express = require("express");
const cors = require("cors");
const db = require("./models");
const app = express();

app.get("/", function (req, res) {
  res.send("Desenvolvimento de Aplicações WEB II");
});

app.get("/aula1", function (req, res) {
  res.send("Primeira aula - DAW II");
});

require("./routes/main.routes")(app);

app.listen(8000, function (req, res) {
  console.log("App rodando na porta 8000");
});

var corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db.sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });
