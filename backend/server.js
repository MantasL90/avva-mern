const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();

cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
//Models
require("./models/houseModel");
require("./models/userModel");

// connectDB();
// const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const houseRoutes = require("./routes/houseRoutes");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");

//Connecting to database
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("MongoDB has been connected"))
  .catch((err) => console.log(err));

//Routes
app.use("/api/users", userRoutes);
app.use("/api/", houseRoutes);

//PORT
const PORT = process.env.PORT || 5000;

//Accesing path module
const path = require("path");

// Deployment
__dirname = path.resolve();

app.use(express.static(path.resolve(__dirname, "./frontend/build")));
// Step 2:
app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "./frontend/build", "index.html"));
});

//Middleware
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, console.log(`server started on: ${PORT}`));
