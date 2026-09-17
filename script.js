/* =========================
   MUSIC
========================= */

function selectSong(song) {

    document.querySelectorAll(".song").forEach(item => {
        item.style.background = "";
    });

    song.style.background = "#252525";
}


/* =========================
   PHOTO LIGHTBOX
========================= */

const photoImages = document.querySelectorAll(".album-photo img");

const lightbox = document.getElementById("photoLightbox");
const lightboxImage = document.getElementById("lightboxImage");

const lightboxClose = document.getElementById("lightboxClose");
const lightboxPrev = document.getElementById("lightboxPrev");
const lightboxNext = document.getElementById("lightboxNext");

let currentPhoto = 0;


/* OPEN IMAGE */

function openPhoto(index) {

    currentPhoto = index;

    lightboxImage.src = photoImages[currentPhoto].src;
    lightboxImage.alt = photoImages[currentPhoto].alt;

    lightbox.classList.add("active");

    document.body.style.overflow = "hidden";
}


/* CLOSE IMAGE */

function closePhoto() {

    lightbox.classList.remove("active");

    document.body.style.overflow = "";
}


/* NEXT */

function nextPhoto() {

    currentPhoto++;

    if (currentPhoto >= photoImages.length) {
        currentPhoto = 0;
    }

    lightboxImage.src = photoImages[currentPhoto].src;
    lightboxImage.alt = photoImages[currentPhoto].alt;
}


/* PREVIOUS */

function previousPhoto() {

    currentPhoto--;

    if (currentPhoto < 0) {
        currentPhoto = photoImages.length - 1;
    }

    lightboxImage.src = photoImages[currentPhoto].src;
    lightboxImage.alt = photoImages[currentPhoto].alt;
}


/* CLICK PHOTO */

photoImages.forEach((image, index) => {

    image.addEventListener("click", function () {
        openPhoto(index);
    });

});


/* BUTTONS */

lightboxClose.addEventListener("click", closePhoto);

lightboxNext.addEventListener("click", nextPhoto);

lightboxPrev.addEventListener("click", previousPhoto);


/* CLICK OUTSIDE IMAGE */

lightbox.addEventListener("click", function (event) {

    if (event.target === lightbox) {
        closePhoto();
    }

});


/* ESCAPE KEY */

document.addEventListener("keydown", function (event) {

    if (!lightbox.classList.contains("active")) {
        return;
    }

    if (event.key === "Escape") {
        closePhoto();
    }

    if (event.key === "ArrowRight") {
        nextPhoto();
    }

    if (event.key === "ArrowLeft") {
        previousPhoto();
    }

});