const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static('public'));

let statusList = []; 

io.on('connection', (socket) => {
  console.log('A user connected');
  socket.emit('loadStatuses', statusList);
  socket.on('statusUpdate', (data) => {
    statusList.push(data);         
    io.emit('broadcastStatus', data); 
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

const PORT = 3000;
http.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
