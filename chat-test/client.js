const socket = io();

const messageList = document.getElementById('messageList');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');

sendButton.addEventListener('click', () => {
  const message = messageInput.value.trim();
  if (message !== '') {
    socket.emit('chatMessage', { username: 'User', message });
    messageInput.value = '';
  }
});

socket.on('message', (data) => {
  displayMessage(data);
});

function displayMessage(data) {
  const messageItem = document.createElement('li');
  messageItem.innerText = `${data.username}: ${data.message}`;
  messageList.appendChild(messageItem);
}
