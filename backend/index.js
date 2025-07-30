const connectToMongo = require("./db");
connectToMongo();

const express = require('express');
const cors = require('cors');
const productsRoute = require('./routes/products'); // <-- Use require

const app = express();
const port = process.env.PORT || 5001;

const allowedOrigins = [
  "http://localhost:3001",
  "https://yashrxx.github.io"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.warn(`CORS blocked request from: ${origin}`);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());

app.use('/api/products', productsRoute);

app.listen(port, () => {
  console.log(`Cake N Cream backend listening at http://localhost:${port}`);
});