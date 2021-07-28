const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const userRoute = require("./routes/users");
const pinRoute = require("./routes/pin");

dotenv.config();

const app = express();

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("connectd to mongo db"))
  .catch((err) => console.log(err));

app.use("/api/users/", userRoute);
app.use("/api/pins/", pinRoute);

app.listen(process.env.PORT, () => {
  console.log("backend is running");
});
