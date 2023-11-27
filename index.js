const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const Port = 3000;
const productRouter = require("./routes/products");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const cartRouter = require("./routes/cart");
const orderRouter = require("./routes/order");

dotenv.config();
mongoose
  .connect(process.env.MONGO)
  .then(() => console.log("db connected"))
  .catch((err) => console.log(err));

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(
  cors({
    origin: process.env.ORIGIN,
  })
);
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/orders", orderRouter);

// app.use((err, _, res) => {
//   const errorStatus = err.status || 500;
//   const errorMessage = err.message || "Something went wrong!";

//   return res.status(errorStatus).send(errorMessage);
// });

app.listen(process.env.PORT || Port, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`)
);
