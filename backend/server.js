const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 9090;
const JWT_SECRET = process.env.JWT_SECRET || 'health_club_secret_jwt_key_2026';

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(morgan('dev'));

// Seed in-memory database with pre-populated admin, trainers, and customers
const db = {
  users: [
    {
      username: 'admin',
      password: 'admin123',
      firstName: 'Admin',
      lastName: 'Manager',
      email: 'admin@healthclub.com',
      phone: '9876543210',
      mobileNo: '9876543210',
      gender: 'M',
      address: [{ houseNo: '101', city: 'Metro City', state: 'NY', pincode: '10001' }],
      role: 'ADMIN',
      facility: [],
      active: true
    },
    {
      username: 'trainer_john',
      password: 'password123',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@healthclub.com',
      phone: '9876543211',
      mobileNo: '9876543211',
      gender: 'M',
      address: [{ houseNo: '204', city: 'Westfield', state: 'CA', pincode: '90210' }],
      role: 'TRAINER',
      facility: { facilityName: 'Gym' },
      active: true
    },
    {
      username: 'trainer_sarah',
      password: 'password123',
      firstName: 'Sarah',
      lastName: 'Smith',
      email: 'sarah@healthclub.com',
      phone: '9876543212',
      mobileNo: '9876543212',
      gender: 'F',
      address: [{ houseNo: '305', city: 'Oakridge', state: 'IL', pincode: '60007' }],
      role: 'TRAINER',
      facility: { facilityName: 'Yoga' },
      active: true
    },
    {
      username: 'trainer_mike',
      password: 'password123',
      firstName: 'Mike',
      lastName: 'Phelps',
      email: 'mike@healthclub.com',
      phone: '9876543213',
      mobileNo: '9876543213',
      gender: 'M',
      address: [{ houseNo: '112', city: 'Bayside', state: 'FL', pincode: '33101' }],
      role: 'TRAINER',
      facility: { facilityName: 'Swimming' },
      active: true
    },
    {
      username: 'customer1',
      password: 'password123',
      firstName: 'Alex',
      lastName: 'Rider',
      email: 'alex@example.com',
      phone: '9876543214',
      mobileNo: '9876543214',
      gender: 'M',
      address: [{ houseNo: '501', city: 'Metro City', state: 'NY', pincode: '10002' }],
      role: 'CUSTOMER',
      facility: [{ facilityName: 'Gym' }, { facilityName: 'Swimming' }],
      active: true
    },
    {
      username: 'customer2',
      password: 'password123',
      firstName: 'Emma',
      lastName: 'Watson',
      email: 'emma@example.com',
      phone: '9876543215',
      mobileNo: '9876543215',
      gender: 'F',
      address: [{ houseNo: '602', city: 'Greenwood', state: 'TX', pincode: '75001' }],
      role: 'CUSTOMER',
      facility: [{ facilityName: 'Yoga' }],
      active: true
    }
  ],
  feedbacks: [
    {
      id: 1,
      username: 'customer1',
      rating: 5,
      feedback: 'Excellent gym equipment and clean swimming pool!',
      createdAt: new Date().toISOString()
    },
    {
      id: 2,
      username: 'customer2',
      rating: 4,
      feedback: 'Great yoga sessions with Trainer Sarah.',
      createdAt: new Date().toISOString()
    }
  ]
};

// Helper to generate JWT token
const generateToken = (user) => {
  return jwt.sign(
    { username: user.username, role: user.role },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
};

// 1. Health check
app.get('/', (req, res) => {
  res.json({
    status: 'online',
    service: 'Health Club Node/Express REST API',
    port: PORT,
    version: '1.0.0'
  });
});

// 2. Authentication: POST /signIn
app.post('/signIn', (req, res) => {
  const { username, password } = req.body;
  const user = db.users.find(u => u.username === username && u.password === password);

  if (!user) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  if (!user.active) {
    return res.status(403).json({ message: 'Account is deactivated. Contact Admin.' });
  }

  const token = generateToken(user);
  res.json({
    jwt: token,
    role: user.role,
    username: user.username
  });
});

// 3. User Details: GET /showUser/:username
app.get('/showUser/:username', (req, res) => {
  const { username } = req.params;
  const user = db.users.find(u => u.username === username);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.json({
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
    role: user.role,
    facility: Array.isArray(user.facility) ? user.facility : [user.facility],
    active: user.active
  });
});

// 4. Trainer Details: GET /showTrainer/:username
app.get('/showTrainer/:username', (req, res) => {
  const { username } = req.params;
  const trainer = db.users.find(u => u.username === username && u.role === 'TRAINER');

  if (!trainer) {
    return res.status(404).json({ message: 'Trainer not found' });
  }

  res.json({
    username: trainer.username,
    firstName: trainer.firstName,
    lastName: trainer.lastName,
    email: trainer.email,
    phone: trainer.phone,
    role: trainer.role,
    facility: typeof trainer.facility === 'object' ? trainer.facility : { facilityName: trainer.facility },
    active: trainer.active
  });
});

// 5. List all customers: GET /showAllUser
app.get('/showAllUser', (req, res) => {
  const customers = db.users.filter(u => u.role === 'CUSTOMER');
  res.json(customers);
});

// 6. List all trainers: GET /showAllTrainers
app.get('/showAllTrainers', (req, res) => {
  const trainers = db.users.filter(u => u.role === 'TRAINER');
  res.json(trainers);
});

// 7. Signup Customer: POST /signupUser
app.post('/signupUser', (req, res) => {
  const { username, password, firstName, lastName, email, phone, facility } = req.body;

  if (db.users.some(u => u.username === username)) {
    return res.status(400).json({ message: 'Username already exists' });
  }

  const facilities = Array.isArray(facility)
    ? facility.map(f => typeof f === 'string' ? { facilityName: f } : f)
    : (facility ? [{ facilityName: facility }] : []);

  const newUser = {
    username,
    password: password || 'password123',
    firstName: firstName || 'First',
    lastName: lastName || 'Last',
    email: email || '',
    phone: phone || '',
    role: 'CUSTOMER',
    facility: facilities,
    active: true
  };

  db.users.push(newUser);
  res.status(201).json({ message: 'User registered successfully', user: newUser });
});

// 8. Signup Trainer: POST /signupForTrainer
app.post('/signupForTrainer', (req, res) => {
  const { username, password, firstName, lastName, email, phone, facility } = req.body;

  if (db.users.some(u => u.username === username)) {
    return res.status(400).json({ message: 'Username already exists' });
  }

  const facilityObj = typeof facility === 'string' ? { facilityName: facility } : (facility || { facilityName: 'Gym' });

  const newTrainer = {
    username,
    password: password || 'password123',
    firstName: firstName || 'First',
    lastName: lastName || 'Last',
    email: email || '',
    phone: phone || '',
    role: 'TRAINER',
    facility: facilityObj,
    active: true
  };

  db.users.push(newTrainer);
  res.status(201).json({ message: 'Trainer registered successfully', user: newTrainer });
});

// 9. Change Password (Customer): PATCH /changePasswordUser
app.patch('/changePasswordUser', (req, res) => {
  const { username, password } = req.body;
  const user = db.users.find(u => u.username === username);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  user.password = password;
  res.json({ message: 'Password changed successfully' });
});

// 10. Change Password (Trainer): PATCH /changePasswordTrainer
app.patch('/changePasswordTrainer', (req, res) => {
  const { username, password } = req.body;
  const trainer = db.users.find(u => u.username === username);

  if (!trainer) {
    return res.status(404).json({ message: 'Trainer not found' });
  }

  trainer.password = password;
  res.json({ message: 'Password changed successfully' });
});

// 11. Subscribe Membership: PATCH /subscribeMembership
app.patch('/subscribeMembership', (req, res) => {
  const { username, facilityName } = req.body;
  const user = db.users.find(u => u.username === username);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  if (!Array.isArray(user.facility)) {
    user.facility = [];
  }

  if (!user.facility.some(f => f.facilityName.toLowerCase() === facilityName.toLowerCase())) {
    user.facility.push({ facilityName });
  }

  res.json({ message: 'Subscribed successfully', facility: user.facility });
});

// 12. Unsubscribe Membership: PATCH /unsubscribeMembership
app.patch('/unsubscribeMembership', (req, res) => {
  const { username, facilityName } = req.body;
  const user = db.users.find(u => u.username === username);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  if (Array.isArray(user.facility)) {
    user.facility = user.facility.filter(
      f => f.facilityName.toLowerCase() !== facilityName.toLowerCase()
    );
  }

  res.json({ message: 'Unsubscribed successfully', facility: user.facility });
});

// 13. Send Feedback: POST /sendFeedback
app.post('/sendFeedback', (req, res) => {
  const { feedback, rating, username } = req.body;
  const newFeedback = {
    id: db.feedbacks.length + 1,
    username: username || 'Anonymous',
    feedback,
    rating: Number(rating) || 5,
    createdAt: new Date().toISOString()
  };

  db.feedbacks.push(newFeedback);
  res.status(201).json({ message: 'Feedback submitted successfully', feedback: newFeedback });
});

// 14. List Feedbacks: GET /showAllFeedbacks
app.get('/showAllFeedbacks', (req, res) => {
  res.json(db.feedbacks);
});

// 15. User Account Status Toggle: PATCH /activateAccountUser/:username & /deactivateAccountUser/:username
app.patch('/activateAccountUser/:username', (req, res) => {
  const user = db.users.find(u => u.username === req.params.username);
  if (!user) return res.status(404).json({ message: 'User not found' });
  user.active = true;
  res.json({ message: 'User activated successfully' });
});

app.patch('/deactivateAccountUser/:username', (req, res) => {
  const user = db.users.find(u => u.username === req.params.username);
  if (!user) return res.status(404).json({ message: 'User not found' });
  user.active = false;
  res.json({ message: 'User deactivated successfully' });
});

// 16. Trainer Account Status Toggle: PATCH /activateAccountTrainer/:username & /deactivateAccountTrainer/:username
app.patch('/activateAccountTrainer/:username', (req, res) => {
  const trainer = db.users.find(u => u.username === req.params.username);
  if (!trainer) return res.status(404).json({ message: 'Trainer not found' });
  trainer.active = true;
  res.json({ message: 'Trainer activated successfully' });
});

app.patch('/deactivateAccountTrainer/:username', (req, res) => {
  const trainer = db.users.find(u => u.username === req.params.username);
  if (!trainer) return res.status(404).json({ message: 'Trainer not found' });
  trainer.active = false;
  res.json({ message: 'Trainer deactivated successfully' });
});

// 17. Delete User / Trainer
app.delete('/deleteUser/:username', (req, res) => {
  const index = db.users.findIndex(u => u.username === req.params.username && u.role === 'CUSTOMER');
  if (index === -1) return res.status(404).json({ message: 'User not found' });
  db.users.splice(index, 1);
  res.json({ message: 'User deleted successfully' });
});

app.delete('/deleteTrainer/:username', (req, res) => {
  const index = db.users.findIndex(u => u.username === req.params.username && u.role === 'TRAINER');
  if (index === -1) return res.status(404).json({ message: 'Trainer not found' });
  db.users.splice(index, 1);
  res.json({ message: 'Trainer deleted successfully' });
});

// 18. Show Users by Facility: GET /showUserByFacility/:facility
app.get('/showUserByFacility/:facility', (req, res) => {
  const facility = req.params.facility.toLowerCase();
  const matched = db.users.filter(u =>
    u.role === 'CUSTOMER' &&
    Array.isArray(u.facility) &&
    u.facility.some(f => f.facilityName.toLowerCase() === facility)
  );
  res.json(matched);
});

// Export for Vercel serverless functions / local execution
module.exports = app;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🏋️ Health Club Express Backend running on http://localhost:${PORT}`);
  });
}
