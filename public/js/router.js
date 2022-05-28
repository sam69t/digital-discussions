// http://127.0.0.1:5500/public/room.html?mode=player

const previewContainer = document.querySelector(".previewContainer");
const previewContainerGrid = document.querySelector(".previewContainerGrid");
const videoContainer = document.querySelector(".videos-container");

let gridColRight = document.querySelector(".container-right");
let gridColLeft = document.querySelector(".container-left");
let body = document.querySelector("body");
let SumAssets = document.querySelector(".sum-assets");
let cross = document.querySelector(".cross");
let widthTimeStamp = amount * 100;

const params = new URLSearchParams(window.location.search);
const mode = params.get("mode");
const animator = new Animator();

let imgCounter = 0;
let vidCounter = 0;

// const meeting = params.get("meetingID");
function playerSetup() {
  const container = document.querySelector(".playerMode");
  container.classList.remove("hidden");
  const toolMode = document.querySelector(".toolMode");
  toolMode.classList.add("hidden");

  const player = new Player({
    parent: body,
    csvSrc:
      "./assets/chats/6j1x-8g2h-9ioc-6290cf054c186c0474bf939e-625280f2a457cf8bc28d7648.csv",
    leftVideoSrc: "./assets/videos/6290cf12f5cc40fcdf9d02c9.mp4",
    rightVideoSrc: "",
  });

  animator.on("frame", () => {
    player.update();
  });

  player.on("loaded", (messages) => {
    // init();
  });

  player.setupSlider({
    sliderContainer: document.querySelector(".slider-container"),
  });

  player.on("chat-message", (data) => {
    // console.log(data.message);
    // console.log(data.message.type.message);
    $(".videoWrapper-two").css("left", "calc(50% - 20vh");
    $(".videoWrapper-two").css("height", "20vh");

    if (data.message.type == "moving-webcam-participant") {
      // console.log(data.message.movingWebcam);
      var $webcam = $(".videoWrapper-two");
      // console.log(data.message.movingWebcam);

      $webcam.css("left", -data.message.movingWebcam.x);
      $webcam.css("top", data.message.movingWebcam.y);
    }
    if (data.message.type == "resize-webcam-participant") {
      // console.log(data.message.movingWebcam);
      var $webcam = $(".videoWrapper-two");

      $webcam.css("width", data.message.resizeWebcam.w);
      $webcam.css("height", data.message.resizeWebcam.h);
    }
    if (data.message.type == "ontap-chat") {
      // console.log(data.message.message);
      CHAT.addTextToLastMsg(data.message.message);
    }
    if (data.message.type == "img-url") {
      let widthTimeStamp = amount * 100;

      console.log(widthTimeStamp);
      imgCounter++;

      if (imgCounter >= 3) {
        gridColRight.removeChild(gridColRight.lastChild);
      }

      let imageGrid = document.createElement("img");
      imageGrid.src = data.message.srcImgUrl;
      gridColRight.appendChild(imageGrid);

      let imageThumbWrap = document.createElement("div");
      let imageGridThumb = document.createElement("img");
      let imageNumber = document.createElement("span");

      imageGridThumb.src = data.message.srcImgUrl;
      imageNumber.textContent = imgCounter;
      imageNumber.classList.add("thumb-numb");
      imageThumbWrap.classList.add("thumb-img");
      imageThumbWrap.classList.add(`${"grid-assets" + imgCounter}`);
      imageThumbWrap.appendChild(imageNumber);
      imageThumbWrap.appendChild(imageGridThumb);

      gridColLeft.appendChild(imageThumbWrap);

      let imageThumbNail = document.createElement("img");
      imageThumbNail.src = data.message.srcImgUrl;
      imageThumbNail.style.marginLeft = widthTimeStamp + "%";
      imageThumbNail.classList.add(`${"assets" + imgCounter}`);
      SumAssets.appendChild(imageThumbNail);
      let imageWrap = document.createElement("div");
      let cross = document.createElement("div");
      let crossBar = document.createElement("div");

      let infoTextWrap = document.createElement("div");
      let infoText = document.createElement("span");

      let grow = document.createElement("div");
      let growSymb = document.createElement("div");

      let info = document.createElement("div");
      let infoSymb = document.createElement("span");

      imageWrap.classList.add(`${"imageBlock" + imgCounter}`);
      imageWrap.classList.add(`${"imageStyle"}`);
      imageWrap.style.zIndex = zCounter;

      cross.classList.add("cross");
      crossBar.classList.add("crossBar");
      info.classList.add("info");
      infoSymb.textContent = "i";
      infoSymb.classList.add("infoSymb");
      grow.classList.add("grow");
      growSymb.classList.add("growSymb");
      infoTextWrap.classList.add("infoTextWrap");
      infoText.classList.add("infoText");
      infoText.textContent =
        "Ceci est un texte de substitution, il servira d'exemples pour ce projet";

      let image = document.createElement("img");
      image.src = data.message.srcImgUrl;
      grow.appendChild(growSymb);
      info.appendChild(infoSymb);
      cross.appendChild(crossBar);
      infoTextWrap.appendChild(infoText);
      imageWrap.appendChild(infoTextWrap);
      imageWrap.appendChild(image);
      imageWrap.appendChild(cross);
      imageWrap.appendChild(info);
      imageWrap.appendChild(grow);

      previewContainer.appendChild(imageWrap);
      disabled();
      onHover();
      assetsCliked();
      growAssets();
      showText();
    }
    if (data.message.type == "vid-url") {
      let widthTimeStamp = amount * 100;

      let vidThumbNail = document.createElement("video");
      vidThumbNail.src = data.message.srcVidUrl;
      vidThumbNail.style.marginLeft = widthTimeStamp + "%";
      vidThumbNail.classList.add(`${"assets" + vidCounter}`);
      SumAssets.appendChild(vidThumbNail);

      vidCounter++;
      const video = document.createElement("video");
      video.src = data.message.srcVidUrl;
      video.classList.add(`${"video-test" + vidCounter}`);
      video.classList.add("vid-s");
      video.autoplay = true;
      video.muted = true;
      video.loop = true;
      previewContainer.appendChild(video);
    }

    if (data.message.type == "moving-img-participant") {
      var $webcam = $(".imageBlock1");

      $webcam.css(
        "-webkit-transform",
        "translate(" +
          data.message.movingWebcam.x +
          "px," +
          data.message.movingWebcam.y +
          "px )"
      );
    }
    if (data.message.type == "moving-img-participant-2") {
      var $webcam = $(".imageBlock2");
      $webcam.css(
        "-webkit-transform",
        "translate(" +
          data.message.movingWebcam.x +
          "px," +
          data.message.movingWebcam.y +
          "px )"
      );
    }

    if (data.message.type == "moving-img-participant-3") {
      var $webcam = $(".imageBlock3");
      $webcam.css(
        "-webkit-transform",
        "translate(" +
          data.message.movingWebcam.x +
          "px," +
          data.message.movingWebcam.y +
          "px )"
      );
    }
    if (data.message.type == "moving-img-participant-4") {
      var $webcam = $(".imageBlock4");
      $webcam.css(
        "-webkit-transform",
        "translate(" +
          data.message.movingWebcam.x +
          "px," +
          data.message.movingWebcam.y +
          "px )"
      );
    }
    if (data.message.type == "moving-img-participant-5") {
      var $webcam = $(".imageBlock5");
      $webcam.css(
        "-webkit-transform",
        "translate(" +
          data.message.movingWebcam.x +
          "px," +
          data.message.movingWebcam.y +
          "px )"
      );
    }
    if (data.message.type == "moving-img-participant-6") {
      var $webcam = $(".imageBlock6");
      $webcam.css(
        "-webkit-transform",
        "translate(" +
          data.message.movingWebcam.x +
          "px," +
          data.message.movingWebcam.y +
          "px )"
      );
    }
    if (data.message.type == "moving-img-participant-7") {
      var $webcam = $(".imageBlock7");
      $webcam.css(
        "-webkit-transform",
        "translate(" +
          data.message.movingWebcam.x +
          "px," +
          data.message.movingWebcam.y +
          "px )"
      );
    }
    if (data.message.type == "moving-img-participant-8") {
      var $webcam = $(".imageBlock8");
      $webcam.css(
        "-webkit-transform",
        "translate(" +
          data.message.movingWebcam.x +
          "px," +
          data.message.movingWebcam.y +
          "px )"
      );
    }
    if (data.message.type == "moving-img-participant-9") {
      var $webcam = $(".imageBlock9");
      $webcam.css(
        "-webkit-transform",
        "translate(" +
          data.message.movingWebcam.x +
          "px," +
          data.message.movingWebcam.y +
          "px )"
      );
    }
    if (data.message.type == "moving-img-participant-10") {
      var $webcam = $(".imageBlock10");
      $webcam.css(
        "-webkit-transform",
        "translate(" +
          data.message.movingWebcam.x +
          "px," +
          data.message.movingWebcam.y +
          "px )"
      );
    }
    if (data.message.type == "moving-img-participant-11") {
      var $webcam = $(".imageBlock11");
      $webcam.css(
        "-webkit-transform",
        "translate(" +
          data.message.movingWebcam.x +
          "px," +
          data.message.movingWebcam.y +
          "px )"
      );
    }
    if (data.message.type == "moving-img-participant-12") {
      var $webcam = $(".imageBlock12");
      $webcam.css(
        "-webkit-transform",
        "translate(" +
          data.message.movingWebcam.x +
          "px," +
          data.message.movingWebcam.y +
          "px )"
      );
    }
    if (data.message.type == "moving-img-participant-13") {
      var $webcam = $(".imageBlock13");
      $webcam.css(
        "-webkit-transform",
        "translate(" +
          data.message.movingWebcam.x +
          "px," +
          data.message.movingWebcam.y +
          "px )"
      );
    }
    if (data.message.type == "moving-img-participant-14") {
      var $webcam = $(".imageBlock14");
      $webcam.css(
        "-webkit-transform",
        "translate(" +
          data.message.movingWebcam.x +
          "px," +
          data.message.movingWebcam.y +
          "px )"
      );
    }
    if (data.message.type == "moving-img-participant-15") {
      var $webcam = $(".imageBlock15");
      $webcam.css(
        "-webkit-transform",
        "translate(" +
          data.message.movingWebcam.x +
          "px," +
          data.message.movingWebcam.y +
          "px )"
      );
    }

    if (data.message.type == "moving-vid-participant") {
      var $webcam = $(".video-test1");
      $webcam.css(
        "-webkit-transform",
        "translate(" +
          data.message.movingWebcam.x +
          "px," +
          data.message.movingWebcam.y +
          "px )"
      );
    }
    if (data.message.type == "moving-vid-participant-2") {
      var $webcam = $(".video-test2");
      $webcam.css(
        "-webkit-transform",
        "translate(" +
          data.message.movingWebcam.x +
          "px," +
          data.message.movingWebcam.y +
          "px )"
      );
    }
    if (data.message.type == "resize-vid-participant") {
      var $webcam = $(".video-test1");

      $webcam.css("width", data.message.resizeWebcam.w);
      $webcam.css("height", data.message.resizeWebcam.h);
    }
    if (data.message.type == "resize-vid-participant-2") {
      var $webcam = $(".video-test2");

      $webcam.css("width", data.message.resizeWebcam.w);
      $webcam.css("height", data.message.resizeWebcam.h);
    }
    if (data.message.type == "resize-img-participant-3") {
      var $webcam = $(".imageBlock3");
      $webcam.css("width", data.message.resizeWebcam.w);
      $webcam.css("height", data.message.resizeWebcam.h);
    }
    if (data.message.type == "resize-img-participant-4") {
      var $webcam = $(".imageBlock4");
      $webcam.css("width", data.message.resizeWebcam.w);
      $webcam.css("height", data.message.resizeWebcam.h);
    }
    if (data.message.type == "resize-img-participant-5") {
      var $webcam = $(".imageBlock5");
      $webcam.css("width", data.message.resizeWebcam.w);
      $webcam.css("height", data.message.resizeWebcam.h);
    }
    if (data.message.type == "resize-img-participant-6") {
      var $webcam = $(".imageBlock6");
      $webcam.css("width", data.message.resizeWebcam.w);
      $webcam.css("height", data.message.resizeWebcam.h);
    }
    if (data.message.type == "resize-img-participant-7") {
      var $webcam = $(".imageBlock7");
      $webcam.css("width", data.message.resizeWebcam.w);
      $webcam.css("height", data.message.resizeWebcam.h);
    }
    if (data.message.type == "resize-img-participant-8") {
      var $webcam = $(".imageBlock8");
      $webcam.css("width", data.message.resizeWebcam.w);
      $webcam.css("height", data.message.resizeWebcam.h);
    }
    if (data.message.type == "resize-img-participant-9") {
      var $webcam = $(".imageBlock9");
      $webcam.css("width", data.message.resizeWebcam.w);
      $webcam.css("height", data.message.resizeWebcam.h);
    }
    if (data.message.type == "resize-img-participant-10") {
      var $webcam = $(".imageBlock10");
      $webcam.css("width", data.message.resizeWebcam.w);
      $webcam.css("height", data.message.resizeWebcam.h);
    }
    if (data.message.type == "resize-img-participant-11") {
      var $webcam = $(".imageBlock11");
      $webcam.css("width", data.message.resizeWebcam.w);
      $webcam.css("height", data.message.resizeWebcam.h);
    }
    if (data.message.type == "resize-img-participant-12") {
      var $webcam = $(".imageBlock12");
      $webcam.css("width", data.message.resizeWebcam.w);
      $webcam.css("height", data.message.resizeWebcam.h);
    }
    if (data.message.type == "resize-img-participant-13") {
      var $webcam = $(".imageBlock13");
      $webcam.css("width", data.message.resizeWebcam.w);
      $webcam.css("height", data.message.resizeWebcam.h);
    }
    if (data.message.type == "resize-img-participant-14") {
      var $webcam = $(".imageBlock14");
      $webcam.css("width", data.message.resizeWebcam.w);
      $webcam.css("height", data.message.resizeWebcam.h);
    }
    if (data.message.type == "resize-img-participant-15") {
      var $webcam = $(".imageBlock15");
      $webcam.css("width", data.message.resizeWebcam.w);
      $webcam.css("height", data.message.resizeWebcam.h);
    }
  });

  //! REVERT
  player.on("revert-chat-message", (data) => {
    // console.log(data.message.type + "revert");
    if (data.message.type == "moving-webcam-participant") {
      // console.log(data.message.movingWebcam);
      var $webcam = $(".videoWrapper-one");

      $webcam.css("left", data.message.movingWebcam.x);
      $webcam.css("top", data.message.movingWebcam.y);
    }
    if (data.message.type == "resize-webcam-participant") {
      // console.log(data.message.movingWebcam);
      var $webcam = $(".videoWrapper-one");

      $webcam.css("width", data.message.resizeWebcam.w);
      $webcam.css("height", data.message.resizeWebcam.h);
    }
    if (data.message.type == "ontap-chat") {
      // console.log(data.message.message);
      CHAT.addTextToLastMsg(data.message.message);
    }
    if (data.message.type == "img-url") {
      previewContainer.removeChild(previewContainer.lastChild);
      SumAssets.removeChild(SumAssets.lastChild);
      gridColRight.removeChild(gridColRight.lastChild);
      gridColLeft.removeChild(gridColLeft.lastChild);
      // if (gridColRight.childNodes.length === 0) {
      // } else {
      //   gridColRight.removeChild(gridColRight.lastChild);
      // }

      imgCounter = 0;

      if (data.message.type == "moving-img-participant") {
        var $webcam = $(".imageBlock1");
        $webcam.css(
          "-webkit-transform",
          "translate(" +
            data.message.movingWebcam.x +
            "px," +
            data.message.movingWebcam.y +
            "px )"
        );
      }
      if (data.message.type == "moving-img-participant-2") {
        var $webcam = $(".imageBlock2");
        $webcam.css(
          "-webkit-transform",
          "translate(" +
            data.message.movingWebcam.x +
            "px," +
            data.message.movingWebcam.y +
            "px )"
        );
      }
      if (data.message.type == "moving-img-participant-3") {
        var $webcam = $(".imageBlock3");
        $webcam.css(
          "-webkit-transform",
          "translate(" +
            data.message.movingWebcam.x +
            "px," +
            data.message.movingWebcam.y +
            "px )"
        );
      }
      if (data.message.type == "moving-img-participant-4") {
        var $webcam = $(".imageBlock4");
        $webcam.css(
          "-webkit-transform",
          "translate(" +
            data.message.movingWebcam.x +
            "px," +
            data.message.movingWebcam.y +
            "px )"
        );
      }
      if (data.message.type == "moving-img-participant-5") {
        var $webcam = $(".imageBlock5");
        $webcam.css(
          "-webkit-transform",
          "translate(" +
            data.message.movingWebcam.x +
            "px," +
            data.message.movingWebcam.y +
            "px )"
        );
      }
      if (data.message.type == "moving-img-participant-6") {
        var $webcam = $(".imageBlock6");
        $webcam.css(
          "-webkit-transform",
          "translate(" +
            data.message.movingWebcam.x +
            "px," +
            data.message.movingWebcam.y +
            "px )"
        );
      }
      if (data.message.type == "moving-img-participant-7") {
        var $webcam = $(".imageBlock7");
        $webcam.css(
          "-webkit-transform",
          "translate(" +
            data.message.movingWebcam.x +
            "px," +
            data.message.movingWebcam.y +
            "px )"
        );
      }
      if (data.message.type == "moving-img-participant-8") {
        var $webcam = $(".imageBlock8");
        $webcam.css(
          "-webkit-transform",
          "translate(" +
            data.message.movingWebcam.x +
            "px," +
            data.message.movingWebcam.y +
            "px )"
        );
      }
      if (data.message.type == "moving-img-participant-9") {
        var $webcam = $(".imageBlock9");
        $webcam.css(
          "-webkit-transform",
          "translate(" +
            data.message.movingWebcam.x +
            "px," +
            data.message.movingWebcam.y +
            "px )"
        );
      }
      if (data.message.type == "moving-img-participant-10") {
        var $webcam = $(".imageBlock10");
        $webcam.css(
          "-webkit-transform",
          "translate(" +
            data.message.movingWebcam.x +
            "px," +
            data.message.movingWebcam.y +
            "px )"
        );
      }
      if (data.message.type == "moving-img-participant-11") {
        var $webcam = $(".imageBlock11");
        $webcam.css(
          "-webkit-transform",
          "translate(" +
            data.message.movingWebcam.x +
            "px," +
            data.message.movingWebcam.y +
            "px )"
        );
      }
      if (data.message.type == "moving-img-participant-12") {
        var $webcam = $(".imageBlock12");
        $webcam.css(
          "-webkit-transform",
          "translate(" +
            data.message.movingWebcam.x +
            "px," +
            data.message.movingWebcam.y +
            "px )"
        );
      }
      if (data.message.type == "moving-img-participant-13") {
        var $webcam = $(".imageBlock13");
        $webcam.css(
          "-webkit-transform",
          "translate(" +
            data.message.movingWebcam.x +
            "px," +
            data.message.movingWebcam.y +
            "px )"
        );
      }
      if (data.message.type == "moving-img-participant-14") {
        var $webcam = $(".imageBlock14");
        $webcam.css(
          "-webkit-transform",
          "translate(" +
            data.message.movingWebcam.x +
            "px," +
            data.message.movingWebcam.y +
            "px )"
        );
      }
      if (data.message.type == "moving-img-participant-15") {
        var $webcam = $(".imageBlock15");
        $webcam.css(
          "-webkit-transform",
          "translate(" +
            data.message.movingWebcam.x +
            "px," +
            data.message.movingWebcam.y +
            "px )"
        );
      }

      if (data.message.type == "resize-img-participant") {
        var $webcam = $(".imageBlock1");
        $webcam.css("width", data.message.resizeWebcam.w);
        $webcam.css("height", data.message.resizeWebcam.h);
      }
      if (data.message.type == "resize-img-participant-2") {
        var $webcam = $(".imageBlock2");
        $webcam.css("width", data.message.resizeWebcam.w);
        $webcam.css("height", data.message.resizeWebcam.h);
      }
      if (data.message.type == "resize-img-participant-3") {
        var $webcam = $(".imageBlock3");
        $webcam.css("width", data.message.resizeWebcam.w);
        $webcam.css("height", data.message.resizeWebcam.h);
      }
      if (data.message.type == "resize-img-participant-4") {
        var $webcam = $(".imageBlock4");
        $webcam.css("width", data.message.resizeWebcam.w);
        $webcam.css("height", data.message.resizeWebcam.h);
      }
      if (data.message.type == "resize-img-participant-5") {
        var $webcam = $(".imageBlock5");
        $webcam.css("width", data.message.resizeWebcam.w);
        $webcam.css("height", data.message.resizeWebcam.h);
      }
      if (data.message.type == "resize-img-participant-6") {
        var $webcam = $(".imageBlock6");
        $webcam.css("width", data.message.resizeWebcam.w);
        $webcam.css("height", data.message.resizeWebcam.h);
      }
      if (data.message.type == "resize-img-participant-7") {
        var $webcam = $(".imageBlock7");
        $webcam.css("width", data.message.resizeWebcam.w);
        $webcam.css("height", data.message.resizeWebcam.h);
      }
      if (data.message.type == "resize-img-participant-8") {
        var $webcam = $(".imageBlock8");
        $webcam.css("width", data.message.resizeWebcam.w);
        $webcam.css("height", data.message.resizeWebcam.h);
      }
      if (data.message.type == "resize-img-participant-9") {
        var $webcam = $(".imageBlock9");
        $webcam.css("width", data.message.resizeWebcam.w);
        $webcam.css("height", data.message.resizeWebcam.h);
      }
      if (data.message.type == "resize-img-participant-10") {
        var $webcam = $(".imageBlock10");
        $webcam.css("width", data.message.resizeWebcam.w);
        $webcam.css("height", data.message.resizeWebcam.h);
      }
      if (data.message.type == "resize-img-participant-11") {
        var $webcam = $(".imageBlock11");
        $webcam.css("width", data.message.resizeWebcam.w);
        $webcam.css("height", data.message.resizeWebcam.h);
      }
      if (data.message.type == "resize-img-participant-12") {
        var $webcam = $(".imageBlock12");
        $webcam.css("width", data.message.resizeWebcam.w);
        $webcam.css("height", data.message.resizeWebcam.h);
      }
      if (data.message.type == "resize-img-participant-13") {
        var $webcam = $(".imageBlock13");
        $webcam.css("width", data.message.resizeWebcam.w);
        $webcam.css("height", data.message.resizeWebcam.h);
      }
      if (data.message.type == "resize-img-participant-14") {
        var $webcam = $(".imageBlock14");
        $webcam.css("width", data.message.resizeWebcam.w);
        $webcam.css("height", data.message.resizeWebcam.h);
      }
      if (data.message.type == "resize-img-participant-15") {
        var $webcam = $(".imageBlock15");
        $webcam.css("width", data.message.resizeWebcam.w);
        $webcam.css("height", data.message.resizeWebcam.h);
      }
    }
  });
}
// console.log(meeting);

if (mode === "player") {
  playerSetup();
}
if (mode === "player-2") {
  // playerSetup();
} else if (mode === "toolH") {
  const container = document.querySelector(".toolMode");
  container.classList.remove("hidden");
  const JoinMeeting = document.querySelector("#meetingJoinButton");
  JoinMeeting.style.display = "none";
  const idMeet = document.querySelector(".id-meet");
  idMeet.style.display = "none";
} else if (mode === "toolP") {
  const container = document.querySelector(".toolMode");
  container.classList.remove("hidden");
  const createMeeting = document.querySelector("#meetingCreateButton");
  createMeeting.style.display = "none";
} else if (mode === "public") {
  console.log("public");
  const container = document.querySelector(".toolMode");
  container.classList.remove("hidden");
  // const JoinMeeting = document.querySelector("#joinPage");
  // JoinMeeting.style.display = "none";
  const createMeeting = document.querySelector("#meetingCreateButton");
  createMeeting.style.display = "none";
  const joinVid = document.querySelector(".joinvid-wrap");
  joinVid.style.display = "none";
  const firstInput = document.querySelector(".first-input");
  const joinTitle = document.querySelector(".join-title");
  joinTitle.textContent = "Rejoindre un live";
  joinTitle.style.marginTop = "5em";
}

const surfooter = document.querySelector(".sur-footer");
const surfooterPublic = document.querySelector("#public-sur-footer");

function showButton() {
  surfooter.style.opacity = "1";
  surfooterPublic.style.opacity = "1";
}
function hideButton() {
  surfooter.style.opacity = "0";
  surfooterPublic.style.opacity = "0";
}

animator.start();

function zoomIn() {
  previewContainer.style.transform = "scale(2)";
}
function zoomOut() {
  previewContainer.classList.toggle("scale");
  previewContainerGrid.classList.toggle("scale");
  videoContainer.classList.toggle("scale");

  console.log("Grid");
}
function zoomBack() {
  previewContainer.style.transform = "scale(1)";
}

// console.log(elem === document.activeElement);
// if (elem === document.activeElement) {
//   console.log("Element has focus!");
//   elem.style.backgroundColor = "pink";
// } else {
//   console.log(`Element is not focused.`);
// }
