const envelope = document.getElementById("envelope");
const openHeart = document.getElementById("openHeart");
const intro = document.getElementById("intro");

const letterScreen = document.getElementById("letterScreen");
const bigLetter = document.getElementById("bigLetter");
const closeHeart = document.getElementById("closeHeart");

const coupleScene = document.getElementById("coupleScene");
const restartHeart = document.getElementById("restartHeart");

const secondLetterScreen = document.getElementById("secondLetterScreen");
const secondLetter = document.getElementById("secondLetter");
const bigCenterHeart = document.getElementById("bigCenterHeart");

const collageScreen = document.getElementById("collageScreen");
const slideshowScreen = document.getElementById("slideshowScreen");
const slideImage = document.getElementById("slideImage");
const prevSlide = document.getElementById("prevSlide");
const nextSlide = document.getElementById("nextSlide");

const finalQuoteScreen = document.getElementById("finalQuoteScreen");
const doveScreen = document.getElementById("doveScreen");
const restartAll = document.getElementById("restartAll");

const music1 = document.getElementById("music1");
const music2 = document.getElementById("music2");

music1.volume = 0.35;
music2.volume = 0;

const photos = [
  "gallery/foto1.jpg",
  "gallery/foto2.jpg",
  "gallery/foto3.jpg",
  "gallery/foto4.jpg",
  "gallery/foto5.jpg",
  "gallery/foto6.jpg",
  "gallery/foto7.jpg",
  "gallery/foto8.jpg",
  "gallery/foto9.jpg",
  "gallery/foto10.jpg",
  "gallery/foto11.jpg"
];

let currentPhoto = 0;
let slideshowTimer = null;

/* ABRIR SOBRE */

openHeart.addEventListener("click", (e) => {
  e.stopPropagation();

  envelope.classList.add("open");

  music1.play();

  setTimeout(() => {
    letterScreen.classList.add("show");
  }, 1200);
});

/* CERRAR CARTA 1 */

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

/* PASAR A CARTA 2 */

restartHeart.addEventListener("click", () => {
  crossfadeMusic();

  coupleScene.classList.remove("show");
  coupleScene.classList.add("hide");

  setTimeout(() => {
    secondLetterScreen.classList.add("show");
  }, 1200);
});

/* CORAZÓN GRANDE */

bigCenterHeart.addEventListener("click", () => {
  secondLetter.classList.add("closing");

  setTimeout(() => {
    secondLetterScreen.classList.remove("show");
    startCollage();
  }, 1000);
});

/* COLLAGE */

function startCollage() {
  collageScreen.classList.add("show");

  setTimeout(() => {
    collageScreen.classList.remove("show");
    startSlideshow();
  }, 9000);
}

/* SLIDESHOW */

function startSlideshow() {
  currentPhoto = 0;
  slideshowScreen.classList.add("show");
  showPhoto();
  startAutoSlide();
}

function showPhoto() {
  slideImage.classList.remove("show");

  setTimeout(() => {
    slideImage.src = photos[currentPhoto];
    slideImage.classList.add("show");
  }, 250);
}

function startAutoSlide() {
  clearTimeout(slideshowTimer);

  slideshowTimer = setTimeout(() => {
    nextPhoto();
  }, 5000);
}

function nextPhoto() {
  clearTimeout(slideshowTimer);

  if (currentPhoto < photos.length - 1) {
    currentPhoto++;
    showPhoto();
    startAutoSlide();
  } else {
    showFinalQuote();
  }
}

function previousPhoto() {
  clearTimeout(slideshowTimer);

  if (currentPhoto > 0) {
    currentPhoto--;
    showPhoto();
  }

  startAutoSlide();
}

nextSlide.addEventListener("click", nextPhoto);
prevSlide.addEventListener("click", previousPhoto);

/* FRASE */

function showFinalQuote() {
  clearTimeout(slideshowTimer);

  slideshowScreen.classList.remove("show");

  setTimeout(() => {
    finalQuoteScreen.classList.add("show");
  }, 500);

  setTimeout(() => {
    finalQuoteScreen.classList.remove("show");
    showDove();
  }, 5000);
}

/* PALOMA + MENSAJE FINAL */

function showDove() {
  doveScreen.classList.add("show");
}

/* REINICIAR TODO */

restartAll.addEventListener("click", () => {
  clearTimeout(slideshowTimer);

  envelope.classList.remove("open");
  bigLetter.classList.remove("closing");
  secondLetter.classList.remove("closing");

  intro.classList.remove("hide");

  letterScreen.classList.remove("show");
  coupleScene.classList.remove("show");
  coupleScene.classList.remove("hide");
  secondLetterScreen.classList.remove("show");
  collageScreen.classList.remove("show");
  slideshowScreen.classList.remove("show");
  finalQuoteScreen.classList.remove("show");
  doveScreen.classList.remove("show");

  currentPhoto = 0;
  slideImage.src = photos[0];

  music2.pause();
  music2.currentTime = 0;
  music2.volume = 0;

  music1.currentTime = 0;
  music1.volume = 0.35;
  music1.play();
});

/* CROSSFADE */

function crossfadeMusic() {
  music2.currentTime = 0;
  music2.play();

  let step = 0;

  const fade = setInterval(() => {
    step++;

    music1.volume = Math.max(0, 0.35 - step * 0.0175);
    music2.volume = Math.min(0.35, step * 0.0175);

    if (step >= 20) {
      clearInterval(fade);
      music1.pause();
    }
  }, 250);
}

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