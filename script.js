

// Initialize the Variables
let songIndex = 0; // first song to be played
let audioElement = new Audio('songs/1.mp3'); // audio element initialised to first audio
let masterPlay = document.getElementById('masterPlay'); // play button is the masterplay
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Cradles - Sub Urban", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Starboy - Weeknd", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "Sukun", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Tere Naina - Shreya Ghoshal", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "The Hills - The Weeknd", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "GooseBumps - Travis Scott", filePath: "songs/6.mp3", coverPath: "covers/6.jpg"},
    {songName: "Tu Ladki Kamaal - Yogi Baba", filePath: "songs/7.mp3", coverPath: "covers/7.jpg"},
    {songName: "Ye nain Matakaa tera - Dil Dhadakne Do", filePath: "songs/8.mp3", coverPath: "covers/8.jpg"},
    {songName: "Banking On Me - Gunna", filePath: "songs/9.mp3", coverPath: "covers/9.jpeg"},
    {songName: "Like A Tatoo - Sade", filePath: "songs/10.mp3", coverPath: "covers/10.jpg"},
]

songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
})
 

// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play(); // the song will get played
        // to convert our play icon to pause icon as we play the song
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1; // changing the opacity of gif
    }
    // if audio id playing we will pause the audio on click
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})
// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{ 
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); // basically we progress is the percentage of song completed
    // the value of progrees bar is initialised to zero in the html code
    myProgressBar.value = progress;
})
// we have to add the change the progress of the song as we change the lenght of the progress meter 
// hence we add the below functionality
myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

// to enable the click on the song and play functionality
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle'); // to add the pause functionality after playing it
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

// for next button functionality
document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName; // to change the songname beside the gif as we change our song
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})


// for previous button functionality
document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})