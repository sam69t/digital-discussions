let amount;
class Player {
  constructor({ parent, csvSrc, leftVideoSrc, rightVideoSrc }) {
    this.emitter = new EventEmitter();
    this.startStamp = 0; //! in seconds
    this.oldTime = 0;
    this.messageIndex = 0;
    this.messages = [];

    this.leftVideo = this.createVideo({
      parent: parent.querySelector(".videoWrapper-one"),
      src: leftVideoSrc,
    });

    this.rightVideo = this.createVideo({
      parent: parent.querySelector(".videoWrapper-two"),
      src: rightVideoSrc,
    });

    //! load csv
    Papa.parse(csvSrc, {
      download: true,
      delimiter: "	",
      header: true,
      complete: (results) => {
        this.messages = results.data;
        this.messages.forEach((element) => {
          if (!element.message) return;
          element.message = JSON.parse(element.message);
        });

        const startRecordingMessage = this.messages.find((element) => {
          return element?.message?.type === "start-interview";
        });

        const firstTimestamp = new Date(startRecordingMessage.timestamp);
        this.startStamp = firstTimestamp.getTime();

        this.emit("loaded", this.messages);
      },
    });
  }

  //! event emitter

  emit(type, ...message) {
    // console.log(type, message);

    return this.emitter.emitEvent(type, message);
  }

  on() {
    return this.emitter.on.apply(this.emitter, arguments);
  }

  off() {
    return this.emitter.off.apply(this.emitter, arguments);
  }

  //! videos

  createVideo({ parent, src }) {
    const video = document.createElement("video");
    video.classList.add("video-frame");
    parent.appendChild(video);
    video.src = src;
    video.controls = false;

    return video;
  }

  updateMessages(currentTime) {
    const time = currentTime * 1000 + this.startStamp;
    const deltaTime = time - this.oldTime;

    this.triggerMessages(time, deltaTime);

    this.oldTime = time;
  }

  triggerMessages(time, deltaTime) {
    const pendingMessage = this.messages[this.messageIndex];

    if (pendingMessage === undefined) return;

    const messageTime = new Date(pendingMessage.timestamp).getTime();
    // console.log(this.messageIndex);

    // seek to future

    if (deltaTime >= 0 && messageTime <= time) {
      this.emit("chat-message", pendingMessage);
      this.messageIndex++;
      // console.log(time, deltaTime);
      // console.trace(time, deltaTime);
      this.triggerMessages(time, deltaTime);
    }

    // seek to past

    if (deltaTime < 0 && messageTime >= time) {
      this.emit("revert-chat-message", pendingMessage);
      this.messageIndex--;
      this.triggerMessages(time, deltaTime);
    }
  }

  update() {}

  setupSlider({ sliderContainer }) {
    let videoPlaying = false;
    let dragWhilePlaying = false;
    let drag = false;

    const buttonElem = document.querySelector(".preview-start");
    const pauseElem = document.querySelector(".pause");

    // buttonElem.textContent = "Play";
    const sliderElem = sliderContainer.querySelector(".custom-seekbar");

    const vid = this.leftVideo;
    const vid2 = this.rightVideo;
    const spanElem = sliderElem.querySelector("span");

    const moveSlider = (clientX) => {
      const { left, width, right } = sliderElem.getBoundingClientRect();
      //   console.log(right);
      const amount = mapClamped(clientX, left, right, 0, 1);
      const time = vid.duration * amount;
      vid.currentTime = time;
      vid2.currentTime = time;

      updateSlider(amount);
      this.updateMessages(vid.currentTime);
      console.log(vid.currentTime);

      // var timer = vid.currentTime;
      // var minutes = Math.floor(timer / 60);
      // var seconds = timer - minutes * 60;
      // console.log(minutes, seconds);
      // document.querySelector(".minutes").textContent = minutes;
      // document.querySelector(".seconds").textContent = seconds;

      // console.log(vid.currentTime);
      // if (vid.currentTime > 10 && vid.currentTime < 10.2) {
      //   console.log("trigger");
      //   chatContainer.classList.toggle("addColorBackGround");
      // }
    };

    this.update = () => {
      if (drag) return;
      amount = vid.currentTime / vid.duration;
      this.updateMessages(vid.currentTime);
      // // console.log(vid.currentTime);
      // //   this.rightVideo.currentTime = vid.currentTime;
      // //   $("#custom-seekbar span").css("width", percentage + "%");
      updateSlider(amount);

      // console.log(amount * 100);
    };

    vid.ontimeupdate = () => {
      // if (drag) return;
      // var amount = vid.currentTime / vid.duration;
      // this.updateMessages(vid.currentTime);
      // // console.log(vid.currentTime);
      // //   this.rightVideo.currentTime = vid.currentTime;
      // //   $("#custom-seekbar span").css("width", percentage + "%");
      // updateSlider(amount);
      var timer = vid.currentTime;
      var minutes = Math.floor(timer / 60);
      var seconds = Math.floor(timer - minutes * 60);

      // var seconds = Math.floor(timer);
      // console.log(seconds);

      document.querySelector(".minutes").textContent = minutes;

      if (seconds < 10) {
        document.querySelector(".seconds").textContent = "0" + seconds;
      } else if (seconds >= 10)
        document.querySelector(".seconds").textContent = seconds;
      if (seconds === 60) {
        document.querySelector(".seconds").textContent = "00";
      }
    };

    // var sliderCanMove = false;
    pauseElem.onclick = () => {
      videoPlaying ? pauseVideo() : playVideo();
    };

    buttonElem.onclick = () => {
      buttonElem.style.opacity = "0";
      setTimeout(() => {
        buttonElem.style.display = "none";
        videoPlaying ? pauseVideo() : playVideo();
      }, 500);
    };

    window.addEventListener("mousemove", (event) => {
      if (drag) moveSlider(event.clientX);
    });
    window.addEventListener("mouseup", () => {
      if (dragWhilePlaying) playVideo();
      drag = false;
      dragWhilePlaying = false;
    });

    function updateSlider(normalizedAmount) {
      spanElem.style.width = `${normalizedAmount * 100}%`;
      // console.log(normalizedAmount * 100);
    }

    function pauseVideo() {
      vid.pause();
      // vid2.pause();
      videoPlaying = false;
      pauseElem.textContent = "Play";
    }
    function playVideo() {
      vid.play();
      // vid2.play();
      videoPlaying = true;
      pauseElem.textContent = "Pause";
    }

    sliderElem.onmousedown = (event) => {
      if (videoPlaying) dragWhilePlaying = true;
      pauseVideo();
      moveSlider(event.clientX);
      drag = true;
      pauseElem.textContent = "Pause";
    };

    // animate();
  }
}
