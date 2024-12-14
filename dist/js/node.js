const express = require('express');
const bcrypt = require('bcrypt');
const app = express();
const bodyParser = require('body-parser');
const users = {};  // In-memory storage for simplicity (replace with a database in production)

app.use(bodyParser.json());

app.post('/register', async (req, res) => {
    const { email, username, password, identity } = req.body;

    if (!email || !username || !password || !identity) {
        return res.json({ success: false, message: 'Missing fields.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user data (this would go to a database)
    users[username] = { email, username, password: hashedPassword, identity };

    console.log("User Registered:", users[username]);  // Log for debugging

    res.json({ success: true });
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const user = users[username];  // Get user data (from DB in a real app)
    if (!user) {
        return res.json({ success: false, message: 'User not found' });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.json({ success: false, message: 'Invalid credentials' });
    }

    console.log("Login successful for user:", user);  // Log for debugging

    // Return the user identity for redirection
    res.json({ success: true, identity: user.identity });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
