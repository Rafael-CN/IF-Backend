const bodyParser = require("body-parser");

module.exports = (app) => {
  const controllers = require("../controllers");
  for (c in controllers) {
    var router = require("express").Router();

    router.post("/", controllers[c].create);

    router.get("/", controllers[c].findAll);

    router.get("/:id", controllers[c].findOne);

    router.put("/:id", controllers[c].update);

    router.delete("/:id", controllers[c].delete);

    router.delete("/", controllers[c].deleteAll);

    app.use(`/${c}`, bodyParser.json(), router);
  }
};
