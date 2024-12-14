// backend.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Middleware to parse JSON data from the request body
app.use(bodyParser.json());
app.use(cors());

// Sample endpoint to handle sending a message
app.post('/send-message', (req, res) => {
    const { recipient, message } = req.body;

    // Basic validation
    if (!recipient || !message) {
        return res.status(400).json({ error: 'Recipient and message are required.' });
    }

    // Log the message (you can replace this with actual storage or email functionality)
    console.log(`Message sent to: ${recipient}`);
    console.log(`Message: ${message}`);

    // Simulate saving the message to a database or processing it
    res.status(200).json({ success: true, message: 'Message sent successfully!' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
