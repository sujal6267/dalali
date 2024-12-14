window.addEventListener('DOMContentLoaded', event => {
    let currentSenderId = 2; // Analyzer ID
    let currentReceiverId = 1; // Owner ID

    // Fetch unread message count
    function fetchUnreadCount() {
        let unreadCount = localStorage.getItem('unreadCountAnalyzer') || 0;
        document.getElementById('unreadCount').textContent = unreadCount;
    }

    // Fetch messages and update message history
    function fetchMessages() {
        let messageHistory = document.getElementById('messageHistory');
        messageHistory.innerHTML = ''; // Clear previous messages
        let messages = JSON.parse(localStorage.getItem('messagesAnalyzer') || '[]');
        messages.forEach(msg => {
            const messageDiv = document.createElement('div');
            messageDiv.textContent = `${msg.sender === currentSenderId ? 'You' : 'Owner'}: ${msg.message}`;
            messageDiv.classList.add('mb-2', msg.sender === currentSenderId ? 'text-end' : 'text-start');
            messageHistory.appendChild(messageDiv);
        });
    }

    // Send a new message
    function sendMessage() {
        const newMessage = document.getElementById('newMessage').value;
        if (newMessage.trim() === '') {
            alert('Please type a message.');
            return;
        }

        // Save message in localStorage
        let messages = JSON.parse(localStorage.getItem('messagesAnalyzer') || '[]');
        messages.push({ sender: currentSenderId, receiver: currentReceiverId, message: newMessage });
        localStorage.setItem('messagesAnalyzer', JSON.stringify(messages));

        // Update unread count
        let unreadCount = parseInt(localStorage.getItem('unreadCountAnalyzer') || 0);
        localStorage.setItem('unreadCountAnalyzer', unreadCount + 1);

        fetchMessages(); // Refresh message history
        document.getElementById('newMessage').value = ''; // Clear input
        fetchUnreadCount(); // Update unread count
    }

    // Initialize message updates
    document.addEventListener('DOMContentLoaded', () => {
        fetchUnreadCount(); // Initial fetch
        setInterval(fetchUnreadCount, 5000); // Periodically check for unread messages
    
        // Load messages when modal is opened
        document.getElementById('messageModal').addEventListener('show.bs.modal', fetchMessages);
    });
});
