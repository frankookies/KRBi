/**
 * WEB222 – Assignment 05
 *
 * I declare that this assignment is my own work in accordance with
 * Seneca Academic Policy. No part of this assignment has been
 * copied manually or electronically from any other source
 * (including web sites) or distributed to other students.
 *
 * Please update the following with your information:
 *
 *      Name:       Francesca Ysabelle Galang
 *      Student ID: 101257236
 *      Date:       March 30, 2024
 */ // All of our data is available on the global `window` object.
// Create local variables to work with it in this file.
let { artists, songs } = window;
// For debugging, display all of our data in the console. You can remove this later.
console.log({
    artists,
    songs
}, "App Data");
//1.Event handler to run when the page is loaded
window.onload = function() {
    let menu = document.getElementById("menu");
    //Creates all the Artists buttons
    for(let i = 0; i < artists.length; i++){
        let artistButton = document.createElement("button");
        artistButton.innerHTML = artists[i].name;
        menu.appendChild(artistButton);
        artistButton.addEventListener("click", function() {
            let title = document.getElementById("selected-artist");
            title.innerHTML = "";
            artistBio(artists[i]);
            showSongs(artists[i].artistId);
        });
    }
    //display default info - first artist
    artistBio(artists[0]);
    showSongs(artists[0].artistId);
};
function artistBio(a) {
    let title = document.getElementById("selected-artist");
    // Create an <h2> element for the artist's name
    title.appendChild(document.createTextNode(a.name));
    title.appendChild(document.createTextNode(" ("));
    // Create <a> elements for each URL
    for(let i = 0; i < a.urls.length; i++){
        let link = a.urls[i];
        let urlLink = document.createElement("a");
        urlLink.href = link.url;
        urlLink.target = "_blank";
        urlLink.textContent = link.type;
        title.appendChild(urlLink);
        if (i !== a.urls.length - 1) title.appendChild(document.createTextNode(", "));
    }
    title.appendChild(document.createTextNode(")"));
}
//Function that shows a list of songs based on the chosen Artist
function showSongs(AID) {
    let tb = document.getElementById("songs");
    tb.innerHTML = ""; //clears the current tbody
    //filters the song list - songs that are NOT flagged
    let displaySong = songs.filter((song)=>{
        return song.artistId === AID && song.explicit === false;
    });
    //Creates a Song Card for each filtered song
    displaySong.forEach(function(songs) {
        tb.appendChild(createSongCard(songs));
    });
}
function createSongCard(song) {
    // Create a <div> to hold the cards
    const cardContainer = document.createElement("div");
    // Add the .card-container class to the <div>
    cardContainer.classList.add("card-container");
    //Create a <div> for each card
    const card = document.createElement("div");
    card.classList.add("card");
    // Create a song image, use the .card-image class
    const songImg = document.createElement("img");
    songImg.src = song.imageURL;
    songImg.classList.add("card-image");
    card.appendChild(songImg);
    /*   songImg.addEventListener("click", function () {
    let title = document.getElementById("selected-artist");
    title.innerHTML = "";
    artistBio(artists[i]);
    showSongs(artists[i].artistId);
  }); */ //Create title of the song with link to YT video
    const nameLink = document.createElement("a");
    nameLink.href = song.url;
    nameLink.target = "_blank"; //open link in a new tab
    card.appendChild(nameLink);
    nameLink.appendChild(songImg);
    const songName = document.createElement("h3");
    songName.textContent = song.title;
    card.appendChild(songName);
    //Create a <div> for the song's info
    const songInfo = document.createElement("div");
    songInfo.classList.add("song-info");
    //Create a time element for the song year
    const year = document.createElement("time");
    year.appendChild(document.createTextNode(song.year));
    songInfo.appendChild(year);
    //Formatting the song duration
    let time = parseInt(song.duration);
    let min = Math.floor(time / 60);
    let sec = time % 60;
    let songDuration = `${min < 10 ? "0" : ""}${min}:${sec < 10 ? "0" : ""}${sec}`;
    //Create a span element for the song duration
    const duration = document.createElement("span");
    duration.appendChild(document.createTextNode(songDuration));
    songInfo.appendChild(duration);
    //append the songInfo div to the card div
    card.appendChild(songInfo);
    cardContainer.appendChild(card);
    //return the cardContainer div
    return cardContainer;
}

//# sourceMappingURL=index.8f0c9192.js.map
