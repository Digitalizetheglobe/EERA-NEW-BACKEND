const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Sequelize } = require('sequelize');
const { add_notices, user_registration } = require('./models'); 
const employeeRoutes = require('./routes/employee');
const adminRoutes = require('./routes/admin');

const app = express();
const port = 8082;
// const port = 8000;

app.use(bodyParser.json());

// Enable CORS for all routes and methods
app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));


app.use('/employee', employeeRoutes);
app.use('/admin', adminRoutes);

// Routes for add_notices
app.get('/notices', async (req, res) => {
  try {
    const notices = await add_notices.findAll();
    res.json(notices);
  } catch (error) {
    console.error('Failed to fetch notices:', error);
    res.status(500).json({ error: 'Failed to fetch notices' });
  }
});

app.post('/notices', async (req, res) => {
  const { notice_title, notice_description, date, lawyer_name, location } = req.body;

  try {
    console.log('Received data:', { notice_title, notice_description, date, lawyer_name, location });

    const notice = await add_notices.create({
      notice_title: notice_title || null,
      notice_description: notice_description || null,
      date: date ? new Date(date) : null,
      lawyer_name: lawyer_name || null,
      location: location || null
    });
    res.status(201).json(notice);
  } catch (error) {
    console.error('Failed to publish notice:', error);
    res.status(500).json({ error: 'Failed to publish notice', details: error.message });
  }
});


// POST API to create a new notice TEST API'S
// app.post('/notices', async (req, res) => {
//   const { notice_title, notice_description, date, lawyer_name, location } = req.body;

//   try {
//     // Validate and log data
//     console.log('Received data:', { notice_title, notice_description, date, lawyer_name, location });

//     const notice = await add_notices.create({
//       notice_title: notice_title || null,
//       notice_description: notice_description || null,
//       date: date ? new Date(date) : null,
//       lawyer_name: lawyer_name || null,
//       location: location || null
//     });
//     res.status(201).json(notice);
//   } catch (error) {
//     console.error('Failed to publish notice:', error);
//     res.status(500).json({ error: 'Failed to publish notice', details: error.message });
//   }
// });



// GET API to fetch a notice by ID
app.get('/notices/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Find notice by primary key (ID)
    const notice = await add_notices.findByPk(id);

    if (!notice) {
      // Return a 404 error if the notice is not found
      return res.status(404).json({ error: `Notice with ID ${id} not found` });
    }

    // Return the found notice
    res.status(200).json(notice);
  } catch (error) {
    console.error('Failed to fetch notice:', error);
    res.status(500).json({ error: 'Failed to fetch notice', details: error.message });
  }
});

// Routes for user_registration
// sdfja
app.get('/users', async (req, res) => {
  try {
    const users = await user_registration.findAll();
    res.json(users);
  } catch (error) {
    console.error('Failed to fetch users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

app.post('/users', async (req, res) => {
  const { fullName, mobileNumber, password } = req.body;

  if (!fullName || !mobileNumber || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const user = await user_registration.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    console.error('Failed to register user:', error);
    res.status(500).json({ error: 'Failed to register user' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
