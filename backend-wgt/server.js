// server.js
import express from 'express';
import cors from 'cors';
import 'dotenv/config.js';

import connectDB from './config/mongodb.js';
import authRoutes from './routes/authRoutes.js';
import weightRoutes from './routes/weightRoutes.js';
import targetRoutes from './routes/targetRoutes.js';


const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/wgt', weightRoutes);
app.use('/api/auth', targetRoutes);

// Connect DB and Start Server
connectDB();

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
