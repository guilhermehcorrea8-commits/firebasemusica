const audio = new Audio();

export function tocarMusica(url) {
  audio.src = url;
  audio.play();

  setInterval(() => {
    if (!audio.duration) return;

    const p = (audio.currentTime / audio.duration) * 100;
    document.getElementById("barraPlayer").style.width = p + "%";
  }, 200);
}