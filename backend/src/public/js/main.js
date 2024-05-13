/*
// Clase 10 - 1h 14'
const socket = io();

// .emit recibir un mensaje del cliente (terminal clg)
socket.emit('buy', 'El cliente esta comprando');

// .emit recibir un mensaje del cliente (terminal clg)
socket.emit('finish', 'El cliente finalizo la compra con exito');

// Recibo el mensaje del cliente y puedo enviar informacion
socket.on('message-client', (info) => {
  console.log(info);
});

socket.on('buy-finish', (info) => {
  console.log(info);
});
*/

const socket = io();

const chatBox = document.getElementById('chatBox');

const messageLogs = document.getElementById('messageLogs');

let user;

Swal.fire({
  title: 'Inicie sesion',
  input: 'text',
  text: 'Por favor ingrese su nombre usuario',
  inputValidator: (value) => {
    if (!value) {
      return 'Ingrese un valor valido';
    }
  },
  allowOutsideClick: false,
}).then((result) => {
  user = result.value;
  console.log(user);
});

chatBox.addEventListener('change', (e) => {
  if (chatBox.value.trim().length > 0) {
    socket.emit('message', {
      usuario: user,
      mensaje: chatBox.value,
      hora: new Date().toLocaleString(),
    });
    chatBox.value = '';
  }
});

socket.on('messageLogs', (info) => {
  messageLogs.innerHTML = '';
  info.forEach((message) => {
    messageLogs.innerHTML += `<p>${message.hora}hs. Usuario ${message.usuario} dice: ${message.mensaje}</p>`;
  });
});
