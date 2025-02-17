import express from 'express';
import dotenv from 'dotenv';
import connect from './database/connection';
import bodyParser from 'body-parser';
import cors from 'cors'; // Import CORS
import sectionsRoutes from './routes/sections.routes';
import searchRoutes from './routes/search.routes';
import adminRoutes from './routes/admin.routes';
import forgotPasswordRoutes from './routes/forgotPassword.routes';

dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to the database
connect();

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Use CORS middleware

// Routes
app.use('/api/sections', sectionsRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/forgot-password', forgotPasswordRoutes);

app.get('/', (req, res) => {
  res.send('Abha newspaper');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});