const express = require("express");
const billRouter = express.Router();
const BillControllerFunction = require("../CONTROLLER/BillingController");

billRouter.post("/add-bill", BillControllerFunction.CreateBill);
billRouter.get("/all-bill", BillControllerFunction.ShowAllbill);
billRouter.delete("/remove-bill/:id", BillControllerFunction.DeleteBill);
billRouter.get("/single-bill/:id", BillControllerFunction.ViewSingleBill);
billRouter.put("/update-bill/:id", BillControllerFunction.UpdateBill);

module.exports = billRouter;
