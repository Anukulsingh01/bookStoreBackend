const express = require("express");
const dotenv = require("dotenv");
const connection = require("./connection/connection");
const UserRoute = require("./routes/user.routes.js");
const BookRoute = require("./routes/book.routes.js")
const favouriteRoute = require("./routes/favourite.routes.js");
const cartRoute = require("./routes/cart.routes.js")
const orderRoute = require("./routes/order.routes.js")
dotenv.config();

const app = express();
let Port = process.env.PORT || 5000;

connection();

app.use(express.json())
// routes
app.use("/api/v1",UserRoute);
app.use("/api/v1",BookRoute);
app.use("/api/v1",favouriteRoute);
app.use("/api/v1",cartRoute);
app.use("/api/v1",orderRoute);


app.listen(Port, () => {
  console.log(`The app is running in http://localhost:${Port}`);
});