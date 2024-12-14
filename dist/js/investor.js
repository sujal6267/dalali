window.addEventListener('DOMContentLoaded', event => {
    let currentSenderId = 1; // Owner ID
    let currentReceiverId = 2; // Analyzer ID

    // Fetch unread message count
    function fetchUnreadCount() {
        let unreadCount = localStorage.getItem('unreadCountOwner') || 0;
        document.getElementById('unreadCount').textContent = unreadCount;
    }

    // Fetch messages and update message history
    function fetchMessages() {
        let messageHistory = document.getElementById('messageHistory');
        messageHistory.innerHTML = ''; // Clear previous messages
        let messages = JSON.parse(localStorage.getItem('messagesOwner') || '[]');
        messages.forEach(msg => {
            const messageDiv = document.createElement('div');
            messageDiv.textContent = `${msg.sender === currentSenderId ? 'You' : 'Analyzer'}: ${msg.message}`;
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
        let messages = JSON.parse(localStorage.getItem('messagesOwner') || '[]');
        messages.push({ sender: currentSenderId, receiver: currentReceiverId, message: newMessage });
        localStorage.setItem('messagesOwner', JSON.stringify(messages));

        // Update unread count
        let unreadCount = parseInt(localStorage.getItem('unreadCountOwner') || 0);
        localStorage.setItem('unreadCountOwner', unreadCount + 1);

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
    
    document.addEventListener('DOMContentLoaded', () => {
        const buySubscriptionButton = document.getElementById('buySubscription');
        const lockMessage = document.getElementById('lockMessage');
        const projectContent = document.getElementById('projectContent');
    
        // Simulate subscription purchase
        buySubscriptionButton.addEventListener('click', () => {
            // Simulate a delay for purchase confirmation
            setTimeout(() => {
                alert('Subscription purchased successfully!');
                // Unlock content
                lockMessage.classList.add('d-none');
                projectContent.classList.remove('d-none');
            }, 1000); // Simulated delay (1 second)
        });
    });
});

