import { Manager, Socket } from "socket.io-client";

export const connectToServer = () => {
  const manager = new Manager("http://localhost:3000/socket.io/socket.io.js");
  const socket = manager.socket("/");
  addListener(socket);
};

const addListener = (socket: Socket) => {
  const serverStatusLabel = document.querySelector("#server-status")!;
  const ul = document.querySelector<HTMLUListElement>("#clients-ul")!;

  const messageForm = document.querySelector<HTMLFormElement>("#message-form")!;
  const messageInput =
    document.querySelector<HTMLInputElement>("#message-input")!;
  const messagesUl = document.querySelector<HTMLUListElement>("#messages-ul")!;

  socket.on("connect", () => {
    serverStatusLabel.innerHTML = "online";
  });

  socket.on("disconnect", () => {
    serverStatusLabel.innerHTML = "offline";
  });

  socket.on("clients-updated", (clients: string[]) => {
    let clienteHtml = "";
    clients.forEach((clientId) => {
      clienteHtml += `
        <li>${clientId}</li>`;
    });
    ul.innerHTML = clienteHtml;
  });
  messageForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (messageInput.value.trim().length <= 0) return;
    socket.emit("message-from-client", {
      id: "John Doe",
      message: messageInput.value,
    });
    messageInput.value = "";
  });
  
  socket.on("message-from-server", (payload: { fullName: string; message: string }) => {
    const newMessage = document.createElement("li");
    const fullName = payload.fullName;
    const message = payload.message;
    newMessage.innerHTML = `
      <strong>${fullName}</strong>
      <span>${message}</span>
    `;
    messagesUl.append(newMessage);
  });
};
