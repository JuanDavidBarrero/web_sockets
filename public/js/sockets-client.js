const lblOnline = document.getElementById('lblOnline');
const lblOffline = document.getElementById('lblOffline');
const txtMenssage = document.getElementById('txtMenssage');
const btnEnviar = document.getElementById('btnEnviar');


const socket = io();

socket.on('connect', () => {
    // console.log("Conectado");
    lblOffline.style.display = 'none';
    lblOnline.style.display = '';
});

socket.on('disconnect', () => {
    // console.log("Desconectado");
    lblOffline.style.display = '';
    lblOnline.style.display = 'none';
});

socket.on('enviar-mensaje', (payload) => {
    // console.log(`El mensaje desde el server fue -> ${payload.message}`);
    console.log(payload);
});

btnEnviar.addEventListener('click', () => {

    const message = txtMenssage.value; 

    const payload = {
        message,
        id: '4f56ad4f54da6f4ads',
        date: new Date().getTime()
    }
    
    socket.emit('enviar-mensaje',payload);

});