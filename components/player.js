const audio = new Audio();

/* 🎵 TOCAR MÚSICA */
export function tocar(url, nome, capa) {
  audio.src = url;

  audio.play().catch(() => {
    alert("Clique em play para iniciar");
  });

  document.getElementById("infoMusica").innerText = nome;

  if (capa) {
    document.getElementById("capaPlayer").src = capa;
  }
}

/* ▶ PLAY */
export function play() {
  audio.play();
}

/* ⏸ PAUSE */
export function pause() {
  audio.pause();
}

/* 📊 BARRA DE PROGRESSO */
export function iniciarBarra() {
  const barra = document.getElementById("barraPlayer");

  function atualizar() {
    if (audio.duration) {
      const porcentagem = (audio.currentTime / audio.duration) * 100;
      barra.style.width = porcentagem + "%";
    }

    requestAnimationFrame(atualizar);
  }

  atualizar();
}