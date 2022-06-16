const getPlaylist = document.getElementsByClassName("playlist")[0];
const getAudio = document.getElementsByTagName("audio")[0];
const getcurrentTimeAndDuration = document.getElementsByClassName(
  "currentTimeAndDuration"
)[0];
const getcurrentProgress = document.getElementById("currentProgress");
const getPlayBtn = document.getElementsByClassName("play")[0];
const getPauseBtn = document.getElementsByClassName("pause")[0];
const getForwardBtn = document.getElementsByClassName("forward")[0];
const getPreviousBtn = document.getElementsByClassName("previous")[0];

const tracks = [
  {
    trackId: "music/track1.m4a",
    title: "Min Kyaung Ma Tat Tae Nae - Zaw Paing",
  },
  {
    trackId: "music/track2.mp3",
    title: "Loser - Chan Myae Mg Cho",
  },
  {
    trackId: "music/track3.aac",
    title: "Kyo Nay Sae Chin Tal - G Latt",
  },
  {
    trackId: "music/track4.mp3",
    title: "Ta Ba Wa Lone Chit Mae Thu - Saung Oo Hlaing",
  },
  {
    trackId: "music/track5.aac",
    title: "Hnit Patt Lae - Bunny Phyo",
  },
  {
    trackId: "music/track6.aac",
    title: "Koe A Narr - Unknown Artist",
  },
];

for (let i = 0; i < tracks.length; i++) {
  const trackTag = document.createElement("div");
  trackTag.classList.add("trackItem");
  const title = (i + 1).toString() + ". " + tracks[i].title;
  trackTag.textContent = title;
  getPlaylist.append(trackTag);
  trackTag.addEventListener("click", function () {
    currentPlayingIndex = i;
    playTrack();
  });
}
var duration = 0;
var durationText = "00:00";
getAudio.addEventListener("loadeddata", function () {
  duration = Math.floor(getAudio.duration);
  durationText = createMinuteAndSecond(duration);
});

getAudio.addEventListener("timeupdate", function () {
  const currentTime = Math.floor(getAudio.currentTime);
  const currentTimeText = createMinuteAndSecond(currentTime);
  const currentandDurationTimeText = currentTimeText + " / " + durationText;
  getcurrentTimeAndDuration.textContent = currentandDurationTimeText;
  updateCurrentProgress(currentTime);
});
const updateCurrentProgress = (currentTime) => {
  const currentProgressWidth = (500 / duration) * currentTime;
  getcurrentProgress.style.width = currentProgressWidth.toString() + "px";
};

const createMinuteAndSecond = (totalsecond) => {
  const minutes = Math.floor(totalsecond / 60);
  const seconds = Math.floor(totalsecond % 60);

  const minuteText = minutes < 10 ? "0" + minutes.toString() : minutes;
  const secondText = seconds < 10 ? "0" + seconds.toString() : seconds;
  return minuteText + ":" + secondText;
};

let currentPlayingIndex = 0;
let isPlaying = false;
getPlayBtn.addEventListener("click", () => {
  const currentTime = Math.floor(getAudio.currentTime);
  isPlaying = true;
  if (currentTime === 0) {
    playTrack();
  } else {
    getAudio.play();
    playAndPause();
  }
});
getPauseBtn.addEventListener("click", () => {
  isPlaying = false;
  getAudio.pause();
  playAndPause();
});

getForwardBtn.addEventListener("click", () => {
  if (currentPlayingIndex === tracks.length) {
    return;
  }
  currentPlayingIndex += 1;
  playTrack();
});
getPreviousBtn.addEventListener("click", () => {
  if (currentPlayingIndex === 0) {
    return;
  }
  currentPlayingIndex -= 1;
  playTrack();
});
const playAndPause = () => {
  if (isPlaying) {
    getPlayBtn.style.display = "none";
    getPauseBtn.style.display = "inline";
  } else {
    getPlayBtn.style.display = "inline";
    getPauseBtn.style.display = "none";
  }
};
const playTrack = () => {
  const songsIdToPlay = tracks[currentPlayingIndex].trackId;
  getAudio.src = songsIdToPlay;
  getAudio.play();
  isPlaying = true;
  playAndPause();
};
