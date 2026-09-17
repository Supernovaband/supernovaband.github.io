function selectSong(song) {
    document.querySelectorAll(".song").forEach(item => {
        item.style.background = "";
    });

    song.style.background = "#252525";
}