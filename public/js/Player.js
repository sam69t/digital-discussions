class Player {
  constructor({ parent, csvSrc, leftVideoSrc, rightVideoSrc }) {
    this.emitter = new EventEmitter();

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
        results.data.forEach((element) => {
          if (!element.message) return;
          element.message = JSON.parse(element.message);
        });

        const firstTimestamp = new Date("2022-04-28T09:48:48.469Z");

        console.log(firstTimestamp.getTime());

        this.messages = results.data;
        this.startStamp = 0;

        this.emit("loaded", this.messages);
      },
    });
  }

  //! event emitter

  emit(type, ...message) {
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
    video.classList.add("redif-vid");
    parent.appendChild(video);
    video.src = src;
    video.controls = false;

    return video;
  }

  setupSlider({ sliderContainer }) {
    const buttonElem = sliderContainer.querySelector(".play");
    buttonElem.textContent = ">";
    const sliderElem = sliderContainer.querySelector(".custom-seekbar");

    const vid = this.leftVideo;
    const vid2 = this.rightVideo;
    const spanElem = sliderElem.querySelector("span");

    vid.ontimeupdate = () => {
      if (drag) return;

      var amount = vid.currentTime / vid.duration;

      //   this.rightVideo.currentTime = vid.currentTime;
      //   $("#custom-seekbar span").css("width", percentage + "%");
      updateSlider(amount);

      //   console.log(vid.currentTime);
    };

    let videoPlaying = false;
    let dragWhilePlaying = false;
    let drag = false;
    // var sliderCanMove = false;

    buttonElem.onclick = () => {
      videoPlaying ? pauseVideo() : playVideo();
    };

    window.addEventListener("mousemove", (event) => {
      if (drag) moveSlider(event.clientX);
    });
    window.addEventListener("mouseup", () => {
      if (dragWhilePlaying) playVideo();
      drag = false;
      dragWhilePlaying = false;
    });

    function moveSlider(clientX) {
      const { left, width, right } = sliderElem.getBoundingClientRect();
      //   console.log(right);
      const amount = map(clientX, left, right, 0, 1);
      const time = vid.duration * amount;
      vid.currentTime = time;
      vid2.currentTime = time;

      updateSlider(amount);
    }

    function updateSlider(normalizedAmount) {
      spanElem.style.width = `${normalizedAmount * 100}%`;
    }

    function pauseVideo() {
      vid.pause();
      vid2.pause();
      videoPlaying = false;
      buttonElem.textContent = ">";
    }
    function playVideo() {
      vid.play();
      vid2.play();
      videoPlaying = true;
      buttonElem.textContent = "II";
    }

    sliderElem.onmousedown = (event) => {
      if (videoPlaying) dragWhilePlaying = true;
      pauseVideo();
      moveSlider(event.clientX);
      drag = true;
    };
  }
}
