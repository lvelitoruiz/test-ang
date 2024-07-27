const express = require('express');
const cors = require('cors');
require('dotenv').config();
const sequelize = require('./db/database');

const app = express();
const PORT = process.env.PORT || 5500;

app.use(cors());
app.use(express.json());

const taskRoutes = require('./routes/tasks');
app.use('/api/tasks', taskRoutes);

sequelize.sync({ force: false })
  .then(() => {
    console.log('Database & tables created!');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });