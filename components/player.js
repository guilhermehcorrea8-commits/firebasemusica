const audio = new Audio();

export function tocar(url, nome) {
  audio.src = url;
  audio.play();

  document.getElementById("infoMusica").innerText = nome;
}

export function play() {
  audio.play();
}

export function pause() {
  audio.pause();
}

export function barra() {
  const barra = document.getElementById("barraPlayer");

  function atualizar() {
    if (audio.duration) {
      barra.style.width = (audio.currentTime / audio.duration) * 100 + "%";
    }
    requestAnimationFrame(atualizar);
  }

  atualizar();
}
