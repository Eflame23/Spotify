async function getsongs() {
    let a = await fetch("http://127.0.0.1:3000/songs/")
    let response = await a.text()
    // console.log(response)
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
let audio = null;

document.querySelector(".pause").addEventListener("click", async()=>{
    let song = await getsongs()
    console.log(song)
    if (!audio){
        audio = new Audio(song[0]);
    }
    if (audio.paused){
        audio.play();
    }
    else{
        audio.pause();
    }
})
