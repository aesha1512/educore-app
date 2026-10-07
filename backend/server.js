const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const requireAuth = require('./middleware/auth');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.message);
    return;
  }
  console.log('Connected to MySQL database.');
});

app.get('/api/courses/:id', (req, res) => {
  const courseId = req.params.id;

  db.query('SELECT * FROM courses WHERE id = ?', [courseId], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch course' });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ error: 'Course not found' });
      return;
    }

    res.json(results[0]);
  });
});

app.get('/api/courses', (req, res) => {
  db.query('SELECT * FROM courses', (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch courses' });
      return;
    }
    res.json(results);
  });
});

app.post('/api/register', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400).json({ error: 'Name, email and password are required' });
    return;
  }
  
  const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!EMAIL_PATTERN.test(email)) {
  res.status(400).json({ error: 'Please provide a valid email address' });
  return;
}

if (password.length < 6) {
  res.status(400).json({ error: 'Password must be at least 6 characters' });
  return;
}
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    db.query(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, hashedPassword],
      (err, result) => {
        if (err) {
          if (err.code === 'ER_DUP_ENTRY') {
            res.status(409).json({ error: 'An account with this email already exists' });
            return;
          }
          console.error(err);
          res.status(500).json({ error: 'Registration failed' });
          return;
        }
        res.status(201).json({ message: 'User registered successfully', userId: result.insertId });
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Registration failed' });
  }
});



app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: 'Email and password are required' });
    return;
  }

  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Login failed' });
      return;
    }

    if (results.length === 0) {
      res.status(401).json({ error: 'Invalid email or password' });
      return;
    }

    const user = results[0];
    const passwordMatches = await bcrypt.compare(password, user.password);

    if (!passwordMatches) {
      res.status(401).json({ error: 'Invalid email or password' });
      return;
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: { id: user.id, name: user.name, email: user.email },
    });
  });
});

app.post('/api/enrolments', requireAuth, (req, res) => {
  const { userId, courseId } = req.body;

  if (!userId || !courseId) {
    res.status(400).json({ error: 'userId and courseId are required' });
    return;
  }

  // Check if this user is already enrolled in this course
  db.query(
    'SELECT * FROM enrolments WHERE user_id = ? AND course_id = ?',
    [userId, courseId],
    (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to check enrolment' });
        return;
      }

      if (results.length > 0) {
        res.status(409).json({ error: 'Already enrolled in this course' });
        return;
      }

      db.query(
        'INSERT INTO enrolments (user_id, course_id, progress) VALUES (?, ?, 0)',
        [userId, courseId],
        (err, result) => {
          if (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to enrol' });
            return;
          }
          res.status(201).json({ message: 'Enrolled successfully', enrolmentId: result.insertId });
        }
      );
    }
  );
});

app.get('/api/enrolments/:userId', (req, res) => {
  const { userId } = req.params;

  const query = `
    SELECT 
      enrolments.id AS enrolmentId,
      enrolments.progress,
      enrolments.enrolled_at,
      courses.id AS courseId,
      courses.title,
      courses.category,
      courses.instructor,
      courses.duration,
      courses.lessons,
      courses.level,
      courses.description
    FROM enrolments
    JOIN courses ON enrolments.course_id = courses.id
    WHERE enrolments.user_id = ?
  `;

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch enrolments' });
      return;
    }
    res.json(results);
  });
});

app.put('/api/enrolments/:id', requireAuth, (req, res) => {
  const { id } = req.params;
  const { progress } = req.body;

  if (progress === undefined || progress < 0 || progress > 100) {
    res.status(400).json({ error: 'Progress must be a number between 0 and 100' });
    return;
  }

  db.query(
    'UPDATE enrolments SET progress = ? WHERE id = ?',
    [progress, id],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update progress' });
        return;
      }
      if (result.affectedRows === 0) {
        res.status(404).json({ error: 'Enrolment not found' });
        return;
      }
      res.json({ message: 'Progress updated' });
    }
  );
});

app.delete('/api/enrolments/:id', requireAuth, (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM enrolments WHERE id = ?', [id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to unenrol' });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Enrolment not found' });
      return;
    }
    res.json({ message: 'Unenrolled successfully' });
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});