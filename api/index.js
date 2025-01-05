const express = require('express');
require('dotenv').config();

const coursesRoutes = require('./routes/coursesRoutes');

const app = express();
const port = 5000;

// Routes
app.use('/courses', coursesRoutes);

// Start Server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
}); 