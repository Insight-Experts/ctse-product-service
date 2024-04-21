const express = require("express");
const dotenv = require("dotenv");
const app = express();

app.disable('x-powered-by');

dotenv.config();

const connectDB = require("./config/db");
connectDB();

app.use(express.json());

const productRoutes = require("./routes/productRoutes");
app.use("/", productRoutes);

app.get("/app", (req, res) => {
  res.send("Product API is Running");
});

const { notFound, errorHandler } = require("./middleware/errorMiddleware");
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5003;
const server = app.listen(PORT, () => {
  console.log(`Product Server Started on port ${PORT}..`);
});

process.on('SIGINT', () => {
  console.log('Shutting down gracefully...');
  server.close(() => {
    console.log('Server closed.');
    process.exit(0);
  });
});
