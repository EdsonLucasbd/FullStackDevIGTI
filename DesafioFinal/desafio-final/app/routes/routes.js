const express = require("express");
const service = require("../services/transactionService.js");

const transactionRouter = express();

transactionRouter.post("/", service.create);
transactionRouter.get("/", service.findByPeriod);
transactionRouter.put("/:id", service.update);
transactionRouter.put("/many", service.updateMany);
transactionRouter.delete("/:id", service.remove);

module.exports = transactionRouter;
