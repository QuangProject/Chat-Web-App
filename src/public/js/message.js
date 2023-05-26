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
        const data = { conversationId, message };
        $.ajax({
            type: 'POST',
            url: '/message/create',
            data: data,
            success: function (response) {
                console.log(response);
                // Create message item
                const messageItem = document.createElement('div');
                messageItem.classList.add('message');
                messageItem.classList.add('animate__animated');
                messageItem.classList.add('animate__fadeInUp');
                messageItem.classList.add('sender');

                // Create content
                const messageContent = document.createElement('div');
                messageContent.classList.add('message-content');
                messageContent.textContent = message;
                messageItem.appendChild(messageContent);

                // Create avatar
                const img = document.createElement('img');
                img.src = response.data.avatar;
                img.alt = 'Avatar';
                img.className = 'avatar-message';
                messageItem.appendChild(img);

                messageList.appendChild(messageItem);

                // Clear input field
                inputText.value = '';

                // Scroll to the bottom of the message list
                messageList.scrollTop = messageList.scrollHeight;
            },
            error: function (error) {
                console.log(error);
            }
        });
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