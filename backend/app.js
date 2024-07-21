import express from 'express';
import dotenv from 'dotenv';
import sequelize from './database.js';
// import User from './model/user.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Example route to create a user
app.post('/users', async (req, res) => {
  try {
    // const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
// Sync database and start server
// sequelize.sync({ force: true })
//   .then(() => {
//     console.log('Database synced');
//     app.listen(PORT, () => {
//       console.log(`Server is running on port ${PORT}`);
//     });
//   })
//   .catch((error) => {
//     console.error('Unable to sync database:', error);
//   });