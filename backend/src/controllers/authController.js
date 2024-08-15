import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const createUser = async (req, res, db) => { 
  try {
    const { username, email, password } = req.body;

    const existingUsername = await db('user').where({ username }).first();
    if (existingUsername) {
      return res.status(400).json({ message: 'Username is already taken' });
    }
    const existingEmail = await db('user').where({ email }).first();
    if (existingEmail) {
      return res.status(400).json({ message: 'Email is already registered' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await db('user').insert({
      username,
      email,
      password: hashedPassword,
      role: "user" 
    });

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const loginUser = async (req, res, db) => { 
  try {
    const { username, password } = req.body;
    const user = await db('user').where({ username }).first();
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    req.session.user = {
      id: user.id,
      username: user.username,
      role: user.role
    };
    
    const JWT_token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
    res.status(200).json({ JWT_token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getUserByUsername = async (req, res, db) => {
  const { username } = req.params;

  try {
    const user = await db('user').where({ username }).first();
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Error getting user by username:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export { createUser, loginUser, getUserByUsername };
