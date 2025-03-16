import { connectToServer } from "./socket-client";
import "./style.css";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <h2>Websocket - Client</h2>
    <input id="jwt-token" placeholder="Json Web Token"/>
    <button id="btn-connect">Connect</button>
    <hr/>
    <span id='server-status'>offline</span>
    <ul id='clients-ul'>
    </ul>

    <form id="message-form" autocomplete='off'>
      <input type='text' id='message-input' placeholder='message' />
    </form>

    <h3>Messages</h3>
    <ul id='messages-ul'></ul>
  </div>
`;
//connectToServer();
const imputJwt= document.querySelector<HTMLInputElement>("#jwt-token")!;
const btnConnect= document.querySelector<HTMLButtonElement>("#btn-connect")!;
btnConnect.addEventListener("click", ()=>{
  if(imputJwt.value.trim().length <= 0) return;
  connectToServer(imputJwt.value);
})