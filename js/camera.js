const botaoIniciarCamera = document.querySelector("[data-video-botao]"); // rostinho
const campoCamera = document.querySelector("[data-camera]");
const video = document.querySelector("[data-video]");
const botaoTirarFoto = document.querySelector("[data-tirar-foto]");
const canvas = document.querySelector("[data-video-canvas]");
const mensagem = document.querySelector("[data-mensagem]");
const botaoEnviarFoto = document.querySelector("[data-enviar]");
let imagemURL = ""; // inicia vazia e recebe captura de foto quando entrar na função

// Ouvinte de eventos
botaoIniciarCamera.addEventListener("click", async function () {
    const iniciarVideo = await navigator.mediaDevices
    .getUserMedia({video: true, audio: false}) // não solicita áudio

    botaoIniciarCamera.style.display = "none"; // botão de iniciar câmera desaperece quando a câmera está ativada
    campoCamera.style.display = "block";

    video.srcObject = iniciarVideo;
})

botaoTirarFoto.addEventListener("click", function() { // quando clicar no botão de tirar foto
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height); // fez um canvas e desenhou uma imagem da posição que estava a câmera na hora que o botão foi clicado

    imagemURL = canvas.toDataURL("image/jpeg"); // transforma imagem capturada em uma URL, para salvá-la posteriormente

    campoCamera.style.display = "none"; // campo de câmera desaperece
    mensagem.style.display = "block"; // aparece tanto a foto tirada quanto a mensagem "Prontinho..."
})

botaoEnviarFoto.addEventListener("click", () => {
    const receberDadosExistentes = localStorage.getItem("cadastro"); // puxa os dados que já estão salvos no localStorage cadastro
    const converteRetorno = JSON.parse(receberDadosExistentes); // visualização em objeto

    converteRetorno.imagem = imagemURL; // cria atributo imagem e recebe foto capturada

    localStorage.setItem('cadastro', JSON.stringify(converteRetorno)); // informações atualizadas com a imagem

    window.location.href = "./abrir-conta-form-3.html";
})