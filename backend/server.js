const app = require('./src/app');
const dotenv = require('dotenv');
const pool = require('./src/config/db'); // Importing triggers the connection check

dotenv.config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Backend is ready using PostgreSQL`);
});