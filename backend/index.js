import express from 'express';
import cors from 'cors';
import connectToMongo from './db.js';
import productsRoute from './routes/productRoutes.js';

connectToMongo();

const app = express();
const port = process.env.PORT || 5001;

const allowedOrigins = [
  "http://localhost:3001",
  "https://yashrxx.github.io",
  "https://cream-dreams-bakery-site.onrender.com"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // Allow non-browser requests

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        console.error("Blocked by CORS:", origin); // For debugging
        return callback(new Error("Not allowed by CORS"));
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