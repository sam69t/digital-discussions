let amount;
let amountTimer;
const getOriginal = true;
let shotProjet = true;

let subtitleContainer = document.querySelector(".sub-title-container");

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

    // const buttonElem = document.querySelector(".preview-start");
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

    // buttonElem.onclick = () => {
    //   buttonElem.style.opacity = "0";
    //   setTimeout(() => {
    //     buttonElem.style.display = "none";
    //     videoPlaying ? pauseVideo() : playVideo();
    //   }, 500);

    //   document.querySelector(".chat-wrapper").style.display = "block";
    //   document.querySelector(".playGround").style.display = "none";
    // };

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
    setTimeout(() => {
      playVideo();
    }, 150);

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

    vid.addEventListener("ended", myHandler, false);
    function myHandler(e) {
      document.body.style.opacity = 0;
      setTimeout(() => {
        document.location.href = homeUrl;
      }, 500);
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

    setupSubTitle(vid);
  }
}
function deepClone(obj) {
  // console.warn('deepClone() is deprecated, use structuredClone() instead')
  return JSON.parse(JSON.stringify(obj));
}

function setupSubTitle(vid) {
  for (
    var captionCues = [
        {
          time: 0,
          text: "",
        },
        {
          time: 2,
          text: "Hi, hi, hi!",
        },
        {
          time: 5,
          text: "Super glad to be here today",
        },
        {
          time: 8,
          text: "My name is Hugo Jauffret, I'm French,",
        },
        {
          time: 10.5,
          text: "I come from a small town, near Paris",
        },
        {
          time: 14,
          text: "and today I'm going to tell you a bit about my work",
        },
        {
          time: 16.5,
          text: "and my practice",
        },
        {
          time: 18,
          text: "I'm going to present you a particular project,",
        },
        {
          time: 20,
          text: "my practice, which is situated between CGI and graphic design,",
        },
        {
          time: 26,
          text: "particularly the visual identity which is inspired by",
        },
        {
          time: 29,
          text: "vernacular codes and urban space.",
        },

        {
          time: 31,
          text: "",
        },
        {
          time: 37,
          text: "So I'm going to tell you about a project called Archipelago.",
        },
        {
          time: 41.5,
          text: "A visual identity",
        },
        {
          time: 42.5,
          text: "that I used to make when I was a student.          ",
        },
        {
          time: 45,
          text: "I still am, but that I made          ",
        },
        {
          time: 47,
          text: "when I was a student in Geneva          ",
        },
        {
          time: 49,
          text: "which I made with my friend Léo Monnet",
        },
        {
          time: 52,
          text: "And in fact, the brief here          ",
        },
        {
          time: 56.5,
          text: "The visual identity          ",
        },
        {
          time: 57.5,
          text: "is made for a festival of architecture called Archipelago",
        },
        {
          time: 60.5,
          text: "In fact, the brief was really          ",
        },
        {
          time: 63,
          text: "to see this event signalled          ",
        },
        {
          time: 64.5,
          text: "that was to take place          ",
        },
        {
          time: 66.5,
          text: "in the centre of the City of Geneva.          ",
        },
        {
          time: 71,
          text: "So to point it out to people          ",
        },
        {
          time: 72,
          text: "who are not necessarily interested in architecture",
        },
        {
          time: 74.8,
          text: "to the design neophyte itself          ",
        },
        {
          time: 76.6,
          text: "And so          ",
        },
        {
          time: 77.5,
          text: "to point it out in a fairly minimal way          ",
        },
        {
          time: 80.5,
          text: "to find elements          ",
        },
        {
          time: 81.5,
          text: "that might be of interest          ",
        },
        {
          time: 82.3,
          text: "to communicate just already          ",
        },
        {
          time: 83.5,
          text: "about the event          ",
        },
        {
          time: 84.5,
          text: "before creating communication          ",
        },
        {
          time: 86.2,
          text: "more traditional communication.          ",
        },
        {
          time: 88.5,
          text: "So we looked for elements          ",
        },
        {
          time: 90,
          text: "and we came across this orange construction mesh         ",
        },
        {
          time: 93,
          text: "which is an element          ",
        },
        {
          time: 94.2,
          text: "that we all know          ",
        },
        {
          time: 95.2,
          text: "because it is an element          ",
        },
        {
          time: 97,
          text: "that allows you to signal          ",
        },
        {
          time: 98,
          text: "and which allows work to be supervised,          ",
        },

        {
          time: 100,
          text: "a building site and that we will find          ",
        },
        {
          time: 102,
          text: "very strong          ",
        },
        {
          time: 102.8,
          text: "because it has this colorimetry       ",
        },
        {
          time: 104.5,
          text: "almost fluorescent orange, which is an identifying feature.          ",
        },
        {
          time: 107.5,
          text: "And on top of that        ",
        },
        {
          time: 108.5,
          text: "it has this modular grid          ",
        },
        {
          time: 110.5,
          text: "that we found very beautiful          ",
        },
        {
          time: 113.5,
          text: "we will return to the grid after  ",
        },
        {
          time: 114.5,
          text: "But these modules a bit,          ",
        },
        {
          time: 115.7,
          text: "these square modules",
        },
        {
          time: 116.5,
          text: "that we thought were very beautiful.          ",
        },
        {
          time: 119,
          text: "And in addition to that          ",
        },
        {
          time: 119.9,
          text: "this net is in a          ",
        },
        {
          time: 121,
          text: "in a construction site          ",
        },
        {
          time: 124,
          text: "We found it very rich          ",
        },
        {
          time: 126,
          text: "in terms of visual codes          ",
        },
        {
          time: 128,
          text: "and in terms of the atmosphere to be taken up.",
        },
        {
          time: 129.8,
          text: "So we thought we'd do",
        },
        {
          time: 131,
          text: "a first referencing phase",
        },
        {
          time: 132.9,
          text: "So there, for example          ",
        },
        {
          time: 133.5,
          text: "people who work          ",
        },
        {
          time: 135.2,
          text: "and have these orange waistcoats          ",
        },
        {
          time: 137,
          text: "fluorescent vests with those phosphorescent stripes          ",
        },
        {
          time: 139,
          text: "that we thought were really beautiful          ",
        },
        {
          time: 140.7,
          text: "so we said OK          ",
        },
        {
          time: 141.6,
          text: "What other element with this mesh ",
        },
        {
          time: 143,
          text: "that we can reinterpret          ",
        },

        {
          time: 144.8,
          text: " and reuse in our communication          ",
        },
        {
          time: 148.5,
          text: "here, for example          ",
        },
        {
          time: 150.4,
          text: "these sort of big construction trucks          ",
        },
        {
          time: 154,
          text: " with these lights          ",
        },
        {
          time: 155,
          text: "and this light element          ",
        },
        {
          time: 156,
          text: "which comes up quite frequently          ",
        },
        {
          time: 157.8,
          text: "and is quite beautiful         ",
        },
        {
          time: 158.8,
          text: "But here we are on night photos          ",
        },
        {
          time: 160,
          text: "but these different elements          ",
        },
        {
          time: 160.8,
          text: "that we found quite interesting          ",
        },
        {
          time: 162,
          text: "to be able to reuse         ",
        },
        {
          time: 165.4,
          text: "here for example ",
        },
        {
          time: 168,
          text: "A kind of orange tent          ",
        },
        {
          time: 169.5,
          text: "which we think is quite beautiful          ",
        },
        {
          time: 170.7,
          text: "And always this orange that comes back          ",
        },
        {
          time: 172.3,
          text: "We have targeted our research          ",
        },
        {
          time: 173.5,
          text: "a bit on the orange elements          ",
        },
        {
          time: 175.5,
          text: "but we still had this idea          ",
        },
        {
          time: 177,
          text: "to find little things          ",
        },
        {
          time: 181,
          text: "that could be reused quite easily          ",
        },
        {
          time: 186,
          text: "For example, these bags that are almost          ",
        },
        {
          time: 188.6,
          text: "sandbags        ",
        },
        {
          time: 189.5,
          text: "that could have been reused      ",
        },
        {
          time: 190,
          text: "in totebag",
        },
        {
          time: 191.5,
          text: "This shows several elements          ",
        },
        {
          time: 196,
          text: "We said OK          ",
        },
        {
          time: 197,
          text: "we have these different elements          ",
        },
        {
          time: 199,
          text: "we've got our orange mesh.          ",
        },
        {
          time: 200.8,
          text: " I can still see in the pictures that I had set aside ",
        },
        {
          time: 206.8,
          text: "other types of orange bags          ",
        },
        {
          time: 211.5,
          text: "that there are a lot of elements          ",
        },
        {
          time: 213.5,
          text: "that we could use for communication          ",
        },
        {
          time: 215,
          text: "And so, okay, we have this orange mesh          ",
        },
        {
          time: 217.8,
          text: "we have these different elements          ",
        },
        {
          time: 219.3,
          text: " ",
        },
        {
          time: 220.3,
          text: "How we're now creating a communication          ",
        },
        {
          time: 222,
          text: "So",
        },

        {
          time: 223,
          text: " we really started from the form          ",
        },
        {
          time: 225,
          text: "a little bit rectangular of this mesh          ",
        },
        {
          time: 228.6,
          text: "to create a typography          ",
        },
        {
          time: 230.5,
          text: " So for example, i have sample of this mesh      ",
        },
        {
          time: 235,
          text: "I'm going to enlarge my window a little bit          ",
        },
        {
          time: 236.9,
          text: "so i can show you.          ",
        },
        {
          time: 238.5,
          text: "So I'm pushing it a bit",
        },
        {
          time: 239.6,
          text: "a few images          ",
        },
        {
          time: 240.4,
          text: "hop   ",
        },
        {
          time: 241.8,
          text: "And we've really got this mesh          ",
        },
        {
          time: 243.5,
          text: "In fact, which is quite beautiful          ",
        },
        {
          time: 244.5,
          text: "is that we really have this module          ",
        },
        {
          time: 247,
          text: "and also this mesh",
        },
        {
          time: 248,
          text: "It's quite flexible          ",
        },
        {
          time: 249.5,
          text: "it's very strong         ",
        },
        {
          time: 250.7,
          text: "but we really have this module.          ",
        },
        {
          time: 252.3,
          text: "And for us we saw it as a kind of typography.          ",
        },
        {
          time: 254.5,
          text: "I mean, there was this idea of building modules          ",
        },
        {
          time: 256.8,
          text: "        ",
        },
        {
          time: 257.5,
          text: "We thought it was quite right         ",
        },
        {
          time: 259,
          text: "in our purpose          ",
        },
        {
          time: 260,
          text: "so we said OK,          ",
        },
        {
          time: 260.8,
          text: "we're going to try to do, to create          ",
        },
        {
          time: 263.6,
          text: "to create a kind of typography          ",
        },
        {
          time: 265,
          text: "from this mesh          ",
        },
        {
          time: 267.3,
          text: "So we started          ",
        },
        {
          time: 268.8,
          text: "to do some sketches          ",
        },
        {
          time: 270.6,
          text: "So here are some first sketches    ",
        },
        {
          time: 271.7,
          text: "It's old images, but then          ",
        },
        {
          time: 272.7,
          text: "we've created this grid           ",
        },
        {
          time: 274.5,
          text: "We've rounded it off a bit in relation to          ",
        },
        {
          time: 275.8,
          text: "to our mesh",
        },
        {
          time: 277,
          text: "but really keeping the mindset of",
        },
        {
          time: 278.3,
          text: "and the spirit of that mesh         ",
        },
        {
          time: 280.3,
          text: "So we were at the beginning okay        ",
        },
        {
          time: 281.3,
          text: "we test with serifs          ",
        },
        {
          time: 282.3,
          text: "sans serif          ",
        },
        {
          time: 285,
          text: "there were lots of possible solutions          ",
        },
        {
          time: 287.8,
          text: "and in the end          ",
        },
        {
          time: 289.5,
          text: "we did something that took up       ",
        },
        {
          time: 292,
          text: "       ",
        },
        {
          time: 295.5,
          text: "quite proportional to that base mesh",
        },
        {
          time: 298.6,
          text: "I am looking for the image          ",
        },
        {
          time: 300,
          text: "I put the image with the typeface          ",
        },
        {
          time: 304,
          text: "So, something sans serif",
        },
        {
          time: 307,
          text: "Maybe a bit more, a bit more.          ",
        },
        {
          time: 309,
          text: "Sharp in the shape",
        },
        {
          time: 311.7,
          text: "With really this idea of construction          ",
        },
        {
          time: 313.2,
          text: "and module          ",
        },
        {
          time: 314,
          text: "And so, we found it very interesting",
        },
        {
          time: 315.7,
          text: "because we really in this spirit of architecture         ",
        },
        {
          time: 320,
          text: "there we really have it's layers a bit that come          ",
        },
        {
          time: 322.5,
          text: "which have just created levels          ",
        },

        {
          time: 324.5,
          text: "And so, OK, we thought          ",
        },
        {
          time: 326,
          text: "So we have this typeface         ",
        },
        {
          time: 328,
          text: "that takes up this site mesh          ",
        },
        {
          time: 329.3,
          text: "Now we have to create a global communication about this ",
        },
        {
          time: 335.5,
          text: "So the good thing is that this mesh is quite flexible          ",
        },
        {
          time: 338,
          text: "There was also this notion of flexibility          ",
        },
        {
          time: 342,
          text: "So we actually took this module          ",
        },
        {
          time: 346,
          text: "we adapted it to a more global communication.         ",
        },
        {
          time: 349,
          text: "So there, for example, a print test          ",
        },
        {
          time: 351.5,
          text: "where we really put the program          ",
        },
        {
          time: 354,
          text: "and we expand this module   ",
        },
        {
          time: 357.5,
          text: "So this shows that we have a system          ",
        },
        {
          time: 359,
          text: "that is starting to develop          ",
        },
        {
          time: 360.5,
          text: "and to be able to adapt          ",
        },
        {
          time: 361.8,
          text: "on a variety of media         ",
        },
        {
          time: 364,
          text: "another example          ",
        },
        {
          time: 365,
          text: "a different type of print test",
        },
        {
          time: 369.8,
          text: "so maybe less identity-based          ",
        },
        {
          time: 372,
          text: "than the other          ",
        },
        {
          time: 373,
          text: "But we still have          ",
        },
        {
          time: 374,
          text: "on this edge of the images          ",
        },
        {
          time: 375.1,
          text: "which takes up a little          ",
        },
        {
          time: 376.1,
          text: "the shape of our typography          ",
        },
        {
          time: 379.2,
          text: "So we bring back in a fairly minimal way          ",
        },
        {
          time: 383,
          text: "this mesh, in fact",
        },
        {
          time: 386,
          text: "on even a print adaptation.          ",
        },
        {
          time: 389,
          text: "Other elements, for example          ",
        },
        {
          time: 391,
          text: "We have for example the website, the website      ",
        },
        {
          time: 394.5,
          text: " So here i just have a mock up          ",
        },
        {
          time: 395.8,
          text: "we didn't animate it       ",
        },
        {
          time: 396.5,
          text: "But we really saw          ",
        },
        {
          time: 397.5,
          text: "that idea of movement with, for example          ",
        },
        {
          time: 399,
          text: "So here you have the letter O which takes 2 spaces",
        },
        {
          time: 404,
          text: "and you could really see it being sent          ",
        },
        {
          time: 405.5,
          text: "taking something in motion          ",
        },
        {
          time: 407,
          text: "that is gradually being built up          ",
        },
        {
          time: 410.2,
          text: "So there, for example          ",
        },

        {
          time: 411.2,
          text: " The poster         ",
        },
        {
          time: 415.4,
          text: "I have talked a lot about orange          ",
        },
        {
          time: 416.8,
          text: "but I haven't talked about this silver          ",
        },
        {
          time: 422.5,
          text: " that we had the chance in screen-print          ",
        },
        {
          time: 425,
          text: "But it's a colour that made us think          ",
        },
        {
          time: 427,
          text: "of raw concrete          ",
        },
        {
          time: 428.1,
          text: "and all this brutalist stuff, this building site atmosphere",
        },
        {
          time: 430,
          text: "the iron, metal that we find quite beautiful         ",
        },
        {
          time: 432.2,
          text: "and we found it fair enough to join it to this orange   ",
        },
        {
          time: 437.8,
          text: "So here we have quite a few elements of communication       ",
        },
        {
          time: 440,
          text: "Quite, I wouldn't say classic, but          ",
        },
        {
          time: 442,
          text: "The poster  ",
        },
        {
          time: 445,
          text: "The print",
        },
        {
          time: 446.5,
          text: "The typeface         ",
        },
        {
          time: 447.5,
          text: "We said OK with all the brainstorming          ",
        },
        {
          time: 449.3,
          text: "that we had done around the site          ",
        },
        {
          time: 451,
          text: "We said to each other          ",
        },
        {
          time: 452,
          text: "maybe we can look further ahead          ",
        },
        {
          time: 455.5,
          text: "  There was these containers",
        },
        {
          time: 457.2,
          text: "that come up quite frequently in this world of the construction site          ",
        },
        {
          time: 460,
          text: "We said with Leo",
        },
        {
          time: 461,
          text: "it could be crazy that       ",
        },
        {
          time: 462.2,
          text: "it could be the best communication possible         ",
        },
        {
          time: 466,
          text: "That containers are proposed in the city        ",
        },
        {
          time: 469,
          text: "In order to communicate the festival       ",
        },
        {
          time: 471,
          text: "that would be pretty crazy        ",
        },
        {
          time: 473,
          text: "So we had proposed that too          ",
        },
        {
          time: 476,
          text: "There was also an image          ",
        },
        {
          time: 477.5,
          text: "where in fact this mesh          ",
        },
        {
          time: 479.3,
          text: "That i mentioned that at the beginning         ",
        },
        {
          time: 480.7,
          text: "But this mesh, it comes to signal to indicate the space          ",
        },
        {
          time: 483,
          text: "But.. i see that i don't have right now     ",
        },
        {
          time: 488.5,
          text: "I'm just searching if i have it         ",
        },
        {
          time: 490,
          text: "(searching in his computer...)        ",
        },
        {
          time: 494,
          text: "I don't think I have it anymore        ",
        },
        {
          time: 496,
          text: "but the idea was that I could          ",
        },
        {
          time: 498.5,
          text: "it was really that mesh of the construction site ",
        },
        {
          time: 499.7,
          text: "would allow us, in addition to creating communication",
        },
        {
          time: 502,
          text: "to surround the whole event",
        },
        {
          time: 505,
          text: "And to make room for the signage",
        },
        {
          time: 509,
          text: "I think I've done a bit of a tour of the material on this          ",
        },
        {
          time: 516.7,
          text: "to make a brief conclusion          ",
        },
        {
          time: 519,
          text: "we really started from an element          ",
        },
        {
          time: 520.5,
          text: "that we found in the public space, in the urban space          ",
        },
        {
          time: 524.5,
          text: "to create a complete communication",
        },
        {
          time: 527.5,
          text: "There you go. Thank you very much         ",
        },
        {
          time: 529.1,
          text: "Thank you for listening to me          ",
        },
      ],
      _loop = function (e) {
        vid.addEventListener("timeupdate", function () {
          console.log(vid.currentTime);
          if (shotProjet === true) {
            if (vid.currentTime > 31.5 && vid.currentTime < 32.5) {
              let instruction = document.createElement("span");
              instruction.textContent = "Project";
              instruction.classList.add("instructions");
              instruction.classList.add("style-projet");
              videoContainerTwo.classList.add("resize-drag");
              document.body.appendChild(instruction);
              setTimeout(() => {
                instruction.style.opacity = 1;
                toolControllerP.style.setProperty(
                  "display",
                  "block",
                  "important"
                );
              }, 300);

              setTimeout(() => {
                videoContainerTwo.style.marginLeft = "-55vh";
              }, 700);
              console.log("spawn instruction");
              setTimeout(() => {
                instruction.style.opacity = 0;
              }, 2500);
              setTimeout(() => {
                document.body.removeChild(instruction);
              }, 3000);
              shotProjet = false;
            }
          }

          vid.currentTime > captionCues[e].time &&
            vid.currentTime < captionCues[e].time + 1 &&
            (subtitleContainer.textContent = captionCues[e].text);
        });
      },
      i = 0;
    i < captionCues.length;
    i++
  )
    _loop(i);
}
