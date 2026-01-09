const socket = io();

function sendStatus() {
  const nameInput = document.getElementById('username');
  const statusInput = document.getElementById('status');

  if (nameInput && statusInput) {
    const name = nameInput.value;
    const status = statusInput.value;

    if (name && status) {
      socket.emit('statusUpdate', {
        user: name,
        message: status
      });

      window.location.href = "/feed.html";
    }
  }
}

socket.on('loadStatuses', (statuses) => {
  const updates = document.getElementById('updates');
  if (updates) {
    updates.innerHTML = '';
    statuses.forEach((data) => {
      addStatusToUI(data);
    });
  }
});

socket.on('broadcastStatus', (data) => {
  addStatusToUI(data);
});

function addStatusToUI(data) {
  const updates = document.getElementById('updates');
  if (updates) {
    const li = document.createElement('li');
    li.textContent = `${data.user}: ${data.message}`;
    updates.appendChild(li);
  }
}
