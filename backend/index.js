import express from 'express';
import cors from 'cors';
import connectToMongo from './db.js';
import productsRoute from './routes/productRoutes.js';
import contactRoutes from './routes/contactRoutes.js';

connectToMongo();

const app = express();
const port = process.env.PORT || 5001;

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:8080",
  "https://yashrxx.github.io",
  "https://cream-dreams-bakery-site.onrender.com"
];

// CORS setup
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.error(`[CORS BLOCKED] Origin: ${origin}`);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());

// ✅ Mount routes
app.use('/api/products', productsRoute);
app.use('/api/contact', contactRoutes); // ✅ MOUNT CONTACT ROUTES

// Health + welcome
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

app.get('/', (req, res) => {
  res.send('Welcome to Cream Dreams Bakery API!');
});

// Fallback route
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.listen(port, () => {
  console.log(`✅ Cake N Cream backend is running at http://localhost:${port}`);
});