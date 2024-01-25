/*async function playSongs() {
  const btn = document.getElementById("play");
  const btn1 = document.getElementById("previous");
  const btn2 = document.getElementById("next");
  songs = await getSongs()
  let currSong = songs[1]
  var audio = new Audio(currSong);
  btn.addEventListener("click", () => {
    if (audio.paused) {
      audio.play();
      btn.src = "pause.svg";
    } else {
      audio.pause();
      btn.src = "playbtn.svg";
    }
  });


  btn1.addEventListener("click", ()=>{
    let songIndex = songs.indexOf(currSong)
    console.log(songIndex)
    if (songIndex!=0){
        var audio = new Audio(songs[songIndex-1])
        audio.play();
        btn.src="pause.svg"

    }
  })
}
*/

async function getSongs() {
  let a = await fetch("http://127.0.0.1:5500/songs/");
  let response = await a.text();
  let div = document.createElement("div");
  div.innerHTML = response;
  let at = div.getElementsByTagName("a");
  let songs = [];
  for (let index = 0; index < at.length; index++) {
    const element = at[index];
    if (element.href.endsWith(".mp3")) {
      songs.push(element.href.split("/songs/")[1]);
    }
  }
  return songs;
}


async function main(){
  let songs = await getSongs();
  console.log(songs)

  let songUL =  document.querySelector(".songContainer").getElementsByTagName("ul")[0]
  for (const song of songs) {
    songUL.innerHTML = songUL.innerHTML + `<li> ${song.replaceAll("%20"," ")} </li>`;
    
  }
}

main()