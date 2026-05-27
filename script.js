const envelope = document.getElementById("envelope");
const openHeart = document.getElementById("openHeart");

const intro = document.getElementById("intro");

const letterScreen = document.getElementById("letterScreen");
const bigLetter = document.getElementById("bigLetter");

const closeHeart = document.getElementById("closeHeart");

const coupleScene = document.getElementById("coupleScene");

const restartHeart = document.getElementById("restartHeart");

const music = document.getElementById("music");

/* VOLUMEN */

music.volume = 0.35;

/* ABRIR SOBRE */

openHeart.addEventListener("click", (e) => {

  e.stopPropagation();

  envelope.classList.add("open");

  music.play();

  setTimeout(() => {

    letterScreen.classList.add("show");

  }, 1200);

});

/* CERRAR CARTA */

closeHeart.addEventListener("click", () => {

  bigLetter.classList.add("closing");

  setTimeout(() => {

    letterScreen.classList.remove("show");

  }, 900);

  setTimeout(() => {

    intro.classList.add("hide");

  }, 1300);

  setTimeout(() => {

    coupleScene.classList.add("show");

  }, 2200);

});

/* REINICIAR */

restartHeart.addEventListener("click", () => {

  coupleScene.classList.remove("show");

  setTimeout(() => {

    intro.classList.remove("hide");

    envelope.classList.remove("open");

    bigLetter.classList.remove("closing");

  }, 800);

});

/* PARTÍCULAS */

function createHeart() {

  const heart = document.createElement("div");

  heart.innerHTML = "❤";

  heart.classList.add("floating-heart");

  document.body.appendChild(heart);

  const size = Math.random() * 25 + 15;

  heart.style.fontSize = size + "px";

  heart.style.left = Math.random() * window.innerWidth + "px";

  heart.style.animationDuration = Math.random() * 4 + 4 + "s";

  heart.style.opacity = Math.random();

  setTimeout(() => {

    heart.remove();

  }, 8000);

}

setInterval(createHeart, 350);