const express = require('express');
const SocketServer = require('ws').Server;
const uuidV4 = require('uuid/v4')

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });
const allMessages = []
let countObj = {
  type: 'count',
  content: 0
}

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');
  const broadcast = (message) => {
    wss.clients.forEach((c) => {
      c.send(JSON.stringify(message));
    })
  }

  countObj.content++;
  let username = 'Anonymous';
  let sysMessage = {
      type: 'incomingNotification',
      content: `${username} joined the chat`
    };
  broadcast(sysMessage);


  allMessages.forEach((message) => {
    ws.send(JSON.stringify(message));
  })


  broadcast(countObj);

  ws.on('message', (rawMessage) => {
    const message = JSON.parse(rawMessage);
    message.id = uuidV4();
    if (message.type === 'postMessage') {
      username = message.username;
      message.type = 'incomingMessage';
      allMessages.push(message);
      console.log(message);
      broadcast(message);
    } else if (message.type === 'postNotification') {
      message.content = `**${message.oldname}** changed their name to **${message.username}**`
      message.type = 'incomingNotification';
      username = message.username;
      broadcast(message);
    }

  })

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    countObj.content--;
    broadcast(countObj);
    sysMessage = {
      type: 'incomingNotification',
      content: `${username} left the chat`
    };
    broadcast(sysMessage);
    console.log('Client disconnected')
  });
});