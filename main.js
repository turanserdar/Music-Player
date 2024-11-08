/* accessing elements and using them as objects */
const prevButton = document.getElementById('prev')
const nextButton = document.getElementById('next')
const repeatButton = document.getElementById('repeat')
const shuffleButton = document.getElementById('shuffle')
const pauseButton = document.getElementById('pause')
const playButton = document.getElementById('play')

const audio = document.getElementById('audio')
const songImage = document.getElementById('song-image')
const songName = document.getElementById('song-name')
const songArtist = document.getElementById('song-artist')

const playListButton = document.getElementById('playlist')


const maxDuration = document.getElementById('max-duration')
const currentTimeRef = document.getElementById('current-time')

const progressBar = document.getElementById('progress-bar')
const playListContainer = document.getElementById('playlist-container')
const closeButton= document.getElementById('close-button')
const playListSongs = document.getElementById('playlist-songs')

const currentProgress = document.getElementById('current-progress')

let index

let loop=true

//JSON song list
const songsList = [
    {
        name: "Gelo Ew Ki Bu",
        link: "./assets/gelo-ew-ki-bu.mp3",
        artist: "Aram Tigran",
        image: "assets/aram-tigran.jpeg"
    },
    {
        name: "Gitme Kal",
        link: "./assets/yara-bere-icindeyim.mp3",
        artist: "Hira-i Zerdust",
        image: "assets/hirai.jpeg"
    },
    {
        name: "Aramam",
        link: "./assets/aramam.mp3",
        artist: "Ibrahim Tatlises",
        image: "assets/ibrahim-tatlises.jpeg"
    },
    {
        name: "Ax Eman",
        link: "./assets/ax-eman.mp3",
        artist: "Rewsan Celiker",
        image: "assets/rewsan-celiker.jpeg"
    },
    {
        name: "Dinle",
        link: "./assets/dinle.mp3",
        artist: "Mahsun Kirmizigul",
        image: "assets/mahsun.jpeg"
    }
]


//time formatter
const timeFormatter=(timeInput)=>{
    let minute = Math.floor(timeInput/60)
    minute=minute<10 ? "0" + minute : minute
    let second = Math.floor(timeInput % 60)
    second = second < 10 ? "0" + second : second
    return `${minute}:${second}`
}


const setSong = (arrayIndex) => {
    let {name, link, artist, image} = songsList[arrayIndex]
  
    audio.src = link
    songName.innerHTML = name
    songArtist.innerHTML = artist
    songImage.src = image

    audio.onloadeddata = () =>{
        maxDuration.innerText = timeFormatter(audio.duration)
       
    }
    
    playListContainer.classList.add('hide')
    playAudio()
}

const playAudio =()=>{
    audio.play()
    pauseButton.classList.remove('hide')
    playAudio.classList.add('hide')
}

const pauseAudio =()=>{
    audio.pause()
    pauseButton.classList.add('hide')
    playButton.classList.remove('hide')
}

const nextSong = () => {
    if (!loop) {
        if (index == (songsList.length - 1)) {
            index = 0
        } else {
            index +=1
        }
        setSong(index)
        playAudio()
    } else {
        let randIndex = Math.floor(Math.random() * songsList.length)
        console.log(randIndex)
        setSong(randIndex)
        playAudio()
    }
}

const previousSong = () =>{
    if(index > 0){
        pauseAudio()
        index-=1
    } else {
        index = songsList.length - 1
    }
    setSong(index)
    playAudio()
}

audio.onended = () =>{
    nextSong()
}


progressBar.addEventListener("click", (event) =>{

    let coordStart = progressBar.getBoundingClientRect().left
    let coordEnd = event.clientX
    let progress = (coordEnd - coordStart) / progressBar.offsetWidth

    currentProgress.style.width = progress * 100 + "%"

    audio.currentTime = progress*audio.duration

    audio.play()
    pauseButton.classList.remove('hide')
    playButton.classList.add('hide')


})

//Shuffle button

shuffleButton.addEventListener('click', ()=>{

        if(shuffleButton.classList.contains('active')){
            shuffleButton.classList.remove('active')
            loop=true
            console.log('shuffle is closed')
        }
        else{
            shuffleButton.classList.add('active')
            loop=false
        }


})


// Repeat button

repeatButton.addEventListener('click', () =>{
    if(repeatButton.classList.contains('active')){
        repeatButton.classList.remove('active')
        loop=false
        console.log ('repeat is closed')
    }
    else{
        repeatButton.classList.add('active')
        loop=true
    }
})


const initializePlayList = () => {
    for (const i  in songsList){
        playListSongs.innerHTML += `<li class="playListSong"
        onclick="setSong(${i})">
        <div class="playlist-image-container">
        <img src="${songList[i].image}"/>
        </div>
        <div class="playlist-song-details">
        <span id="playlist-song-name">
        ${songsList[i].name}
        </span>
        <span id="playlist-song-artist-album">
        ${songsList[i].artist}
        </span>
        </div>
        </li>`
    }
}

playListButton.addEventListener('click',()=>{
    playListContainer.classList.remove('hide')
})

closeButton.addEventListener('click',()=>{
    playListButton.classList.add('hide')
})

//play button 

playButton.addEventListener('click', playAudio)

//pause button
pauseButton.addEventListener('click',pauseAudio)

//next
nextButton.addEventListener('click',nextSong)

//previous
prevButton.addEventListener('click',previousSong)

setInterval(()=>{
    currentTimeRef.innerHTML=timeFormatter(audio.currentTime)
    currentProgress.style.width=(audio.currentTime/audio.duration.toFixed(3))*100 + "%"},1000);

    ////catch time update   

    audio.addEventListener('timeupdate',()=>{
        currentTimeRef.innerText=timeFormatter(audio.currentTime)
    })

    ////when the screen is loaded

    window.onload = () =>{
        index = 0
        setSong(index)
        pauseAudio()
        initializePlayList()
    }



