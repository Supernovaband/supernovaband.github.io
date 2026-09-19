/* =========================
   MUSIC PLAYER
========================= */

let currentAudio = null;
let currentSong = null;


function playSong(song, file) {

    /* Same song = pause / resume */

    if (currentSong === song && currentAudio) {

        if (currentAudio.paused) {

            currentAudio.play();

            song.querySelector(".song-play").textContent = "❚❚";

        } else {

            currentAudio.pause();

            song.querySelector(".song-play").textContent = "▶";

        }

        return;
    }


    /* Stop previous song */

    if (currentAudio) {

        currentAudio.pause();

        currentAudio.currentTime = 0;
    }


    /* Reset all songs */

    document.querySelectorAll(".song").forEach(item => {

        item.style.background = "";

        const button = item.querySelector(".song-play");

        if (button) {
            button.textContent = "▶";
        }

    });


    /* Create audio */

    currentAudio = new Audio(file);

    currentSong = song;


    /* Highlight */

    song.style.background = "#252525";

    song.querySelector(".song-play").textContent = "❚❚";


    /* Play */

    currentAudio.play();


    /* Reset when finished */

    currentAudio.addEventListener("ended", function () {

        song.style.background = "";

        song.querySelector(".song-play").textContent = "▶";

        currentAudio = null;

        currentSong = null;

    });

}


/* =========================================================
   PHOTO LIGHTBOX
========================================================= */

const photoImages =
    document.querySelectorAll(".album-photo img");

const lightbox =
    document.getElementById("photoLightbox");


if (lightbox && photoImages.length) {

    const lightboxImage =
        document.getElementById("lightboxImage");

    const lightboxClose =
        document.getElementById("lightboxClose");

    const lightboxPrev =
        document.getElementById("lightboxPrev");

    const lightboxNext =
        document.getElementById("lightboxNext");


    let currentPhoto = 0;


    /* OPEN */

    function openPhoto(index) {

        currentPhoto = index;

        lightboxImage.src =
            photoImages[currentPhoto].src;

        lightboxImage.alt =
            photoImages[currentPhoto].alt;

        lightbox.classList.add("active");

        document.body.style.overflow = "hidden";
    }


    /* CLOSE */

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

        lightboxImage.src =
            photoImages[currentPhoto].src;

        lightboxImage.alt =
            photoImages[currentPhoto].alt;
    }


    /* PREVIOUS */

    function previousPhoto() {

        currentPhoto--;

        if (currentPhoto < 0) {
            currentPhoto = photoImages.length - 1;
        }

        lightboxImage.src =
            photoImages[currentPhoto].src;

        lightboxImage.alt =
            photoImages[currentPhoto].alt;
    }


    /* CLICK IMAGE */

    photoImages.forEach((image, index) => {

        image.addEventListener("click", function () {

            openPhoto(index);

        });

    });


    /* BUTTONS */

    lightboxClose.addEventListener(
        "click",
        closePhoto
    );

    lightboxNext.addEventListener(
        "click",
        nextPhoto
    );

    lightboxPrev.addEventListener(
        "click",
        previousPhoto
    );


    /* CLICK OUTSIDE */

    lightbox.addEventListener(
        "click",
        function (event) {

            if (event.target === lightbox) {

                closePhoto();

            }

        }
    );


    /* KEYBOARD */

    document.addEventListener(
        "keydown",
        function (event) {

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

        }
    );

}


/* =========================================================
   MEMBER GALLERIES
========================================================= */


const memberGalleries = {

    leon: [
        "images/member.jpg",
        "images/members/leon-2.jpg",
        "images/members/leon-3.jpg",
        "images/members/leon-4.jpg",
        "images/members/leon-5.jpg"
    ],

    liam: [
        "images/member2.jpg",
        "images/members/liam-2.jpg",
        "images/members/liam-3.jpg",
        "images/members/liam-4.jpg",
        "images/members/liam-5.jpg"
    ],

    ola: [
        "images/member3.jpg",
        "images/members/ola-2.jpg",
        "images/members/ola-3.jpg",
        "images/members/ola-4.jpg",
        "images/members/ola-5.jpg"
    ],

    mathias: [
        "images/member4.jpg",
        "images/members/mathias-2.jpg",
        "images/members/mathias-3.jpg",
        "images/members/mathias-4.jpg",
        "images/members/mathias-5.jpg"
    ]

};


const memberCards =
    document.querySelectorAll(".band-member");

const memberLightbox =
    document.getElementById("memberLightbox");


if (memberLightbox && memberCards.length) {

    const memberLightboxImage =
        document.getElementById("memberLightboxImage");

    const memberLightboxName =
        document.getElementById("memberLightboxName");

    const memberLightboxRole =
        document.getElementById("memberLightboxRole");

    const memberLightboxCounter =
        document.getElementById("memberLightboxCounter");

    const memberLightboxClose =
        document.getElementById("memberLightboxClose");

    const memberLightboxPrev =
        document.getElementById("memberLightboxPrev");

    const memberLightboxNext =
        document.getElementById("memberLightboxNext");


    let currentMember = null;

    let currentMemberPhoto = 0;


    /* UPDATE IMAGE */

    function updateMemberPhoto() {

        const gallery =
            memberGalleries[currentMember];


        memberLightboxImage.src =
            gallery[currentMemberPhoto];


        memberLightboxImage.alt =
            memberLightboxName.textContent
            + " — photo "
            + (currentMemberPhoto + 1);


        memberLightboxCounter.textContent =
            (currentMemberPhoto + 1)
            + " / "
            + gallery.length;

    }


    /* OPEN MEMBER */

    function openMemberGallery(member) {

        currentMember =
            member.dataset.member;

        currentMemberPhoto = 0;


        memberLightboxName.textContent =
            member.dataset.name;


        memberLightboxRole.textContent =
            member.dataset.role;


        updateMemberPhoto();


        memberLightbox.classList.add("active");

        document.body.style.overflow = "hidden";

    }


    /* CLOSE */

    function closeMemberGallery() {

        memberLightbox.classList.remove("active");

        document.body.style.overflow = "";

    }


    /* NEXT */

    function nextMemberPhoto() {

        const gallery =
            memberGalleries[currentMember];


        currentMemberPhoto++;


        if (currentMemberPhoto >= gallery.length) {

            currentMemberPhoto = 0;

        }


        updateMemberPhoto();

    }


    /* PREVIOUS */

    function previousMemberPhoto() {

        const gallery =
            memberGalleries[currentMember];


        currentMemberPhoto--;


        if (currentMemberPhoto < 0) {

            currentMemberPhoto =
                gallery.length - 1;

        }


        updateMemberPhoto();

    }


    /* CLICK MEMBER */

    memberCards.forEach(member => {

        member.addEventListener(
            "click",
            function () {

                openMemberGallery(member);

            }
        );

    });


    /* BUTTONS */

    memberLightboxClose.addEventListener(
        "click",
        closeMemberGallery
    );


    memberLightboxNext.addEventListener(
        "click",
        nextMemberPhoto
    );


    memberLightboxPrev.addEventListener(
        "click",
        previousMemberPhoto
    );


    /* CLICK OUTSIDE */

    memberLightbox.addEventListener(
        "click",
        function (event) {

            if (event.target === memberLightbox) {

                closeMemberGallery();

            }

        }
    );


    /* KEYBOARD */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                !memberLightbox.classList.contains("active")
            ) {
                return;
            }


            if (event.key === "Escape") {

                closeMemberGallery();

            }


            if (event.key === "ArrowRight") {

                nextMemberPhoto();

            }


            if (event.key === "ArrowLeft") {

                previousMemberPhoto();

            }

        }
    );

}