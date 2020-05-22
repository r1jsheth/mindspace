const app = () => {
  const song = document.querySelector(".song");
  const play = document.querySelector(".play");
  const outline = document.querySelector(".moving-outline circle");
  const video = document.querySelector(".vid-container video");

  const soundSelect = document.querySelectorAll(".sound-picker button");
  const timeDisplay = document.querySelector(".time-display");
  const outlineLength = outline.getTotalLength();
  const timeSelect = document.querySelectorAll(".time-select button");

  let fakeDuration = 600;
  outline.style.strokeDasharray = outlineLength;
  outline.style.strokeDashoffset = outlineLength;

  document.body.onkeyup = function (e) {
    if (e.keyCode == 32) {
      togglePlay(song, video);
    }
  };

  play.addEventListener("click", () => {
    togglePlay(song, video);
  });

  //select time
  timeSelect.forEach((timeOption) => {
    timeOption.addEventListener("click", () => {
      fakeDuration = timeOption.getAttribute("data-time");
      timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(
        fakeDuration % 60
      )}`;
    });
  });

  // select sound
  soundSelect.forEach((soundOption) => {
    soundOption.addEventListener("click", () => {
      let previousSound = song.getAttribute("src");
      let newSound = soundOption.getAttribute("data-sound");
      if (previousSound !== newSound) {
        let newVideo = soundOption.getAttribute("data-video");
        let timeLeft = fakeDuration - song.currentTime;
        let wasPlaying = !song.paused;
        video.src = newVideo;
        song.src = newSound;
        if (wasPlaying) {
          song.play();
          video.play();
          fakeDuration = timeLeft;
        }
      }
    });
  });

  // change play and pause
  const togglePlay = (song, video) => {
    if (song.paused) {
      song.play();
      video.play();
      play.src = "./svg/pause.svg";
    } else {
      song.pause();
      video.pause();
      play.src = "./svg/play.svg";
    }
  };

  // animate circle
  song.ontimeupdate = () => {
    let currentTime = song.currentTime;
    let timeLeft = fakeDuration - currentTime;
    if (timeLeft > 0) {
      let seconds = Math.floor(timeLeft % 60);
      let minutes = Math.floor(timeLeft / 60);

      // animate the progress bar
      let progress =
        outlineLength - (currentTime / fakeDuration) * outlineLength;
      outline.style.strokeDashoffset = progress;
      timeDisplay.textContent = `${minutes}:${seconds}`;
    } else {
      song.pause();
      video.pause();
      song.currentTime = 0;
      fakeDuration = 120;
      play.src = "./svg/play.svg";
    }
  };
};

app();
