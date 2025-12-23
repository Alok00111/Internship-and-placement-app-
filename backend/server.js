const app = require('./src/app');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');

// Load environment variables
dotenv.config();

// Connect to Database
connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Backend is ready using MongoDB`);
});