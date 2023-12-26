const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const productRouter = require("./ROUTER/ProductRoutes");
const billRouter = require("./ROUTER/BillingRouter");

require("./DATABASE/connection");

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());

app.use(express.json());

app.use("/billing-system", productRouter);
app.use("/billing-system/bill", billRouter);

app.get("/", (req, res) => {
  res.json("SERVER STARTED!!");
});

app.listen(PORT, () => {
  console.log(`APP IS RUNNING ON http://localhost:${PORT}`);
});
