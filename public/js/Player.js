let amount;
let amountTimer;
const getOriginal = true;

class Player {
  constructor({ parent, csvSrc, liveVideoSrc, gridVideoSrc }) {
    this.emitter = new EventEmitter();
    this.startStamp = 0; //! in seconds
    this.oldTime = 0;
    this.messageIndex = 0;
    this.messages = [];
    this.csvSrc = csvSrc;

    this.leftVideo = this.createVideo({
      parent: parent.querySelector(".videoWrapper-two"),
      src: liveVideoSrc,
    });

    this.rightVideo = this.createVideo({
      parent: parent.querySelector(".cam-grid-wrap"),
      src: gridVideoSrc,
    });

    this.exportBtn = document.querySelector("#exportBtn");

    this.exportBtn.onclick = () => {
      const csvString = this.saveInLocal(csvSrc, this.messages);
      this.downloadCSV(csvSrc, csvString);
    };

    //! load csv

    const csvString = localStorage.getItem(csvSrc);

    if (getOriginal || !csvString) {
      console.log("loaded csv file", csvSrc);
      Papa.parse(csvSrc, {
        download: true,
        delimiter: "	",
        header: true,
        complete: (results) => {
          this.start(results.data);
          this.saveInLocal(csvSrc, this.messages);
        },
      });
    } else {
      // papa.parse from string
      const results = Papa.parse(csvString, {
        delimiter: "	",
        header: true,
      });
      this.start(results.data);
    }
  }

  downloadCSV(name, csv) {
    var csvData = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    var csvURL = null;
    if (navigator.msSaveBlob) {
      csvURL = navigator.msSaveBlob(csvData, `${name}.csv`);
    } else {
      csvURL = window.URL.createObjectURL(csvData);
    }

    var tempLink = document.createElement("a");
    tempLink.href = csvURL;
    tempLink.setAttribute("download", "download.csv");
    tempLink.click();
  }

  insertMessage({ peerName }, data) {
    const time = this.toRecordTime(this.leftVideo.currentTime);
    const pendingMessage =
      this.messages[Math.min(this.messageIndex, this.messages.length - 1)];

    if (!pendingMessage) {
      console.error("cant insert message: no messages found");
      return;
    }

    const entry = deepClone(pendingMessage);
    entry.timestamp = new Date(time).toISOString();
    entry.peerName = peerName;
    entry.message = data;

    // const index = this.messages.findIndex((prevEntry, index) => {
    //   return time < new Date(prevEntry.timestamp).getTime();
    // });
    this.messages.splice(this.messageIndex, 0, entry);

    this.saveInLocal(this.csvSrc, this.messages);
  }

  saveInLocal(name, messages) {
    console.log("SAVED");

    //! stringify entries
    messages = messages.map((element) => {
      const cloned = deepClone(element);

      if (element.message) cloned.message = JSON.stringify(element.message);

      return cloned;
    });

    // papa.unparse
    const csv = Papa.unparse(messages, {
      delimiter: "	",
      header: true,
      quotes: true,
    });

    //! convert to csv if too big
    localStorage.setItem(name, csv);

    return csv;
  }

  start(messages) {
    this.messages = messages;
    this.messages.forEach((element) => {
      if (!element.message) return;
      element.message = JSON.parse(element.message);
    });

    const startRecordingMessage = this.messages.find((element) => {
      return element?.message?.type === "launch-presentation";
    });

    const firstTimestamp = new Date(startRecordingMessage.timestamp);

    this.startStamp = firstTimestamp.getTime();

    this.emit("loaded", this.messages);
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
    const time = this.toRecordTime(currentTime);
    const deltaTime = time - this.oldTime;

    this.triggerMessages(time, deltaTime);

    this.oldTime = time;
  }

  toRecordTime(currentTime) {
    return currentTime * 1000 + this.startStamp;
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

    vid2.muted = true;
    const spanElem = sliderElem.querySelector("span");

    const moveSlider = (clientX) => {
      const { left, width, right } = sliderElem.getBoundingClientRect();
      //   console.log(right);
      const amount = mapClamped(clientX, left, right, 0, 1);
      const time = vid.duration * amount;
      vid.currentTime = time;
      // vid2.currentTime = time;

      updateSlider(amount);
      this.updateMessages(vid.currentTime);
      // console.log(vid.currentTime);

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
      amountTimer = vid.currentTime;

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
      // console.log(timer);
      var minutes = Math.floor(timer / 60);
      var seconds = Math.floor(timer - minutes * 60);

      // console.log(minutes + ":" + seconds);

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

      document.querySelector(".chat-wrapper").style.display = "block";
      document.querySelector(".playGround").style.display = "none";
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
      vid2.pause();
      videoPlaying = false;
      pauseElem.textContent = "Play";
    }
    function playVideo() {
      vid.play();
      vid2.play();
      videoPlaying = true;
      pauseElem.textContent = "Pause";
      hoverPublicImage();
    }

    sliderElem.onmousedown = (event) => {
      if (videoPlaying) dragWhilePlaying = true;
      pauseVideo();
      moveSlider(event.clientX);
      drag = true;
      pauseElem.textContent = "Pause";
    };

    function hoverPublicImage() {
      $(".moving-banner-h").mouseenter(function () {
        console.log("HOVER");
        vid.muted = true;
        $(this).find("video").prop("muted", false);
      });
      $(".moving-banner-h").mouseleave(function () {
        console.log("HOVER");
        vid.muted = false;
        $(this).find("video").prop("muted", true);
      });
    }

    // $(".moving-banner-v").on("hover", function (e) {
    //   console.log("hover");
    // });
    // $(".moving-banner-v").on("mouseout", function (e) {});

    // animate();
    $(".grid").on("click", function (e) {
      $(".previewContainer").css("opacity", "0");
      $(".previewContainerGrid").css("opacity", "1");
      videoContainer.classList.toggle("movinggg");

      console.log("grid");
    });
    $(".live").on("click", function (e) {
      videoContainer.classList.toggle("movinggg");
      $(".previewContainer").css("opacity", "1");
      $(".previewContainerGrid").css("opacity", "0");
      console.log("grid");
    });
  }
}

function deepClone(obj) {
  // console.warn('deepClone() is deprecated, use structuredClone() instead')
  return JSON.parse(JSON.stringify(obj));
}
