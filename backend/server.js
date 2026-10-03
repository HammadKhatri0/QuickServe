const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const Service = require('./models/Service');
const { initialServices } = require('./seeder/seedServices');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB().then(async () => {
  // Auto-seed initial services if collection is empty
  try {
    const count = await Service.countDocuments();
    if (count === 0) {
      await Service.insertMany(initialServices);
      console.log('[Auto-Seed]: Initial services populated into database.');
    }
  } catch (err) {
    console.error('[Auto-Seed Warning]:', err.message);
  }
});

const app = express();

// Middlewares
app.use(cors({
  origin: '*', // Allow all origins for seamless development
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    app: 'QuickServe Backend API',
    timestamp: new Date().toISOString(),
  });
});

// Mount Routes (MVC Model)
app.use('/api/services', require('./routes/serviceRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));

// 404 Handler for undefined API routes
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `API Route ${req.originalUrl} not found`,
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('[Server Error]:', err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`===============================================`);
  console.log(` QuickServe Backend running on port ${PORT}`);
  console.log(` API Endpoint: http://localhost:${PORT}/api/services`);
  console.log(`===============================================`);
});
