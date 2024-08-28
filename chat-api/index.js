const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const cors = require("cors");
const WebSocket = require("ws");
const contactsData = require("./data/contacts.json");
const messagesData = require("./data/messages.json");

const PORT = 3020;
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ noServer: true });

app.use(cors());
app.use(bodyParser.json());

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Miesiące są zero-indexowane, więc dodajemy 1
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

wss.on("connection", (ws, req) => {
  const contacts = [...contactsData];
  const messages = { ...messagesData };
  let selectedContact = contacts[0].id;

  ws.on("message", (input) => {
    const { type, payload } = JSON.parse(input);

    if (type === "load-contacts") {
      const { phrase, take = 15, skip } = payload;
      let total = contacts.length;
      let all = contacts;
      let ret = contacts;
      if (phrase) {
        ret = ret.filter((c) => c.fullName.includes(phrase));
      }
      if (skip) {
        ret = ret.slice(skip);
      }
      ws.send(
        JSON.stringify({
          type: "contacts",
          payload: {
            contacts: ret.slice(0, take),
            total: total,
          },
        })
      );
    }

    if (type === "load-messages") {
      const { contactId, take = 15, beforeMessageId } = payload;
      const contactMessages = String(contactId) in messages ? messages[String(contactId)] : null
      if(!contactMessages){
        return
      }
      const all = [...[...messages[String(contactId)]].reverse()]
      let slicedBefore = null;
      if (beforeMessageId) {
        const targetIndex = all.findIndex(
          (record) => record.id === beforeMessageId
        );
        slicedBefore = all.slice(targetIndex + 1, targetIndex + take + 1);
      }
      ws.send(
        JSON.stringify({
          type: "messages",
          payload: {
            subtype: "prepend",
            messages: slicedBefore ? slicedBefore : all.slice(0, take),
            total: all.length,
          },
        })
      );
    }

    if (type === "send-message") {
      const { recipient, text } = payload;
      const newMsg = {
        id: String(messages[String(recipient)].length),
        fromId: "0",
        text,
        date: formatDate(new Date()),
      }
      messages[String(recipient)].push(newMsg);
      const all = [...messages[String(selectedContact)].reverse()]
      ws.send(
        JSON.stringify({
          type: "messages",
          payload: {
            subtype: "append",
            messages: [newMsg],
            total: all.length,
          },
        })
      );
    }

    if (type === "switch-contact") {
      const { contactId } = payload;
      selectedContact = contactId;
    }
  });

  ws.send(JSON.stringify({ type: "connection", text: "Welcome!" }));
  ws.send(
    JSON.stringify({
      type: "contacts",
      payload: {
        contacts: contacts.slice(0, 2),
        total: contacts.length,
      },
    })
  );
  selectedContact = contacts[0].id
});

server.on("upgrade", (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit("connection", ws, request);
  });
});

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
