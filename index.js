const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const productRouter = require("./ROUTER/ProductRoutes");
const billRouter = require("./ROUTER/BillingRouter");

require("./DATABASE/connection");

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();

const whitelist = ["https://billing-system-mueed.netlify.app"];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json());

app.use("/billing-system", productRouter);
app.use("/billing-system/bill", billRouter);

app.get("/", (req, res) => {
  res.json("SERVER STARTED!!");
});

app.listen(PORT, () => {
  console.log(`APP IS RUNNING ON http://localhost:${PORT}`);
});
