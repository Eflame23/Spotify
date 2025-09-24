async function getsongs() {
    let a = await fetch("http://127.0.0.1:3000/songs/")
    let response = await a.text()
    let div = document.createElement("div");
    div.innerHTML = response;
    let as = div.getElementsByTagName("a");
    console.log(as);
    let songs = [];
    
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if(element.href.endsWith(".mp3")){
            songs.push(element.href)
        }
    }
    return songs;
}

// Helper function to extract clean song name from URL
function getSongName(url) {
    // Extract filename from URL
    let filename = url.split('/').pop();
    
    // Decode URL encoding
    filename = decodeURIComponent(filename);
    
    // Remove .mp3 extension
    filename = filename.replace('.mp3', '');
    
    // Clean up common patterns
    filename = filename
        .replace(/^\\songs\\/, '') // Remove \songs\ prefix
        .replace(/\[.*?\]/g, '') // Remove content in square brackets like [YouConvert.net]
        .replace(/_/g, ' ') // Replace underscores with spaces
        .replace(/\|/g, '-') // Replace | with - for readability
        .replace(/｜/g, '-') // Replace full-width | with - for readability
        .replace(/\s+/g, ' ') // Replace multiple spaces with single space
        .replace(/^[-\s]+|[-\s]+$/g, '') // Trim dashes and spaces from start/end
        .trim();
    
    sname = filename.split('-')[0];
    aname = filename.split('-')[1];
    return filename;
}
let audio = null;
const pauseBtn = document.querySelector(".play1")
pauseBtn.addEventListener("click", async()=>{
    let songs = await getsongs() // Fixed: renamed to 'songs' for clarity
    let songUL = document.querySelector(".songList").getElementsByTagName("ul")[0]
    
    // Clear existing songs first (optional - prevents duplicates)
    songUL.innerHTML = '';
    
    // Fixed: Loop through each song and display clean name
    for (const songUrl of songs) {
        let songName = getSongName(songUrl); // Extract clean name
        // songUL.innerHTML += `<li>${songName}</li>`; 
        songUL.innerHTML += `<li>
                            <img class="svg" src="svg/music.svg" alt="">
                            <div class="info">
                                <div style = "font-size:14px">${sname}</div>
                                <div style = "font-size:12px">${aname}</div>
                            </div>
                            <img class="svg play1" src="svg/play1.svg" alt="">
                        </li>`; 
    }
    console.log(songs)
    
    if (!audio){
        audio = new Audio(songs[0]); // Fixed: use songs[0] instead of song[0]
    }
    if (audio.paused){
        audio.play();
        pauseBtn.setAttribute("src","svg/resume.svg")
        pauseBtn.classList.remove("pause")
        pauseBtn.classList.add("resume")
    }
    else{
        audio.pause();
        pauseBtn.setAttribute("src","svg/play1.svg")
        pauseBtn.classList.remove("resume")
        pauseBtn.classList.add("play1")
    }
})