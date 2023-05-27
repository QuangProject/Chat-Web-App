// get current user id
const currentUserId = document.getElementById('current-user-id').value;

const socket = new WebSocket('ws://localhost:3000/ws');
// Handle WebSocket events
socket.onopen = () => {
    console.log('WebSocket connection established');
};

socket.onmessage = (event) => {
    // Handle received messages
    // get json data from server side
    const { UserId, message, avatar } = JSON.parse(event.data);

    // Create message item
    const messageItem = document.createElement('div');
    messageItem.classList.add('message');
    messageItem.classList.add('animate__animated');
    messageItem.classList.add('animate__fadeInUp');

    // Create content
    const messageContent = document.createElement('div');
    messageContent.classList.add('message-content');
    messageContent.textContent = message;

    // Create avatar
    const img = document.createElement('img');
    if (avatar == null) {
        avatar = '/img/default-avatar.png';
    }
    img.src = avatar;
    img.alt = 'Avatar';
    img.className = 'avatar-message';

    if (currentUserId == UserId) {
        messageItem.classList.add('sender');
        messageItem.appendChild(messageContent);
        messageItem.appendChild(img);
        messageList.appendChild(messageItem);
    } else {
        messageItem.appendChild(img);
        messageItem.appendChild(messageContent);
        messageList.appendChild(messageItem);
    }

    // Clear input field
    inputText.value = '';

    // Scroll to the bottom of the message list
    messageList.scrollTop = messageList.scrollHeight;
};

socket.onclose = () => {
    console.log('WebSocket connection closed');
};

// Get necessary DOM elements
const messageList = document.getElementById('message-list');
const inputText = document.getElementById('input-text');
const sendButton = document.getElementById('send-button');

// Function to handle sending a message
function sendMessage() {
    const message = inputText.value.trim();

    if (message !== '') {
        // send message to server
        const conversationId = window.location.pathname.split('/')[2];
        $.ajax({
            type: 'POST',
            url: '/message/create',
            data: {
                conversationId: conversationId,
                message: message
            },
            success: function (response) {
                socket.send(JSON.stringify({ UserId: currentUserId, message, avatar: response.data.avatar }));
            },
            error: function (error) {
                console.log(error);
            }
        })
    }
}

// Event listener for send button click
sendButton.addEventListener('click', sendMessage);

// Event listener for Enter key press
inputText.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        sendMessage();
    }
});