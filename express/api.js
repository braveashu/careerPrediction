// Set up Express app
const express = require('express');
const router = express.Router();
const app = express();

// Connect to MongoDB 
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/career_db', { useNewUrlParser: true });

router.post('/receive-data', async (req, res) => {
  try {
    // Receive data from the POST request
    const userData = req.body;
    const userSchema = new mongoose.Schema({
        personality: Number,
        work_scenerio: Number,
        field_interest: Number,
        academics: Number,
        analytics: Number,
        general_science: Number
      });

      const User = mongoose.model('User', userSchema);
      const newUser = new User(userData);
      await newUser.save();
      
      const { exec } = require('child_process');


      const pythonProcess = exec('careerai.py', (error, stdout, stderr) => {
        if (error) {
           console.error(error);
            return;
        }
        console.log('Python script output:', stdout);
      });
      res.json({ message: 'Data received and processed successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
  }
});

module.exports = router;