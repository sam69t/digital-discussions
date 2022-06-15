// http://127.0.0.1:5500/public/room.html?mode=player

const previewContainer = document.querySelector(".previewContainer");
const previewContainerGrid = document.querySelector(".previewContainerGrid");
const videoContainer = document.querySelector(".videos-container");
const gridVideo = document.querySelector(".cam-grid");

let publicCounter = 0;
const homeUrl = "http://localhost:3000";
const UrlConf = "http://localhost:3000/room.html?mode=player";

const playerContainer = document.querySelector(".playerMode");
let gridColRight = document.querySelector(".container-right");
let gridColLeft = document.querySelector(".container-left");
let gridThumbWrapper = document.querySelector(".grid-assets");

let body = document.querySelector("body");
let SumAssets = document.querySelector(".sum-assets");
let cross = document.querySelector(".cross");
let widthTimeStamp = amount * 100;
let switchMode = true;

const params = new URLSearchParams(window.location.search);
const mode = params.get("mode");
const animator = new Animator();

let imgCounter = 0;
let vidCounter = 0;
let player;
let step1 = true;
let step2 = false;
let step3 = false;
let step4 = false;

// const meeting = params.get("meetingID");
function playerSetup() {
  const container = document.querySelector(".playerMode");
  container.classList.remove("hidden");
  const toolMode = document.querySelector(".toolMode");
  toolMode.classList.add("hidden");

  player = new Player({
    parent: body,
    csvSrc: "./assets/chats/HUGO_J2.csv",
    liveVideoSrc: "./assets/videos/HUGO_J2(CUT).mp4",
    gridVideoSrc: "./assets/videos/HUGO_J2(CUT).mp4",
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
    // $(".videoWrapper-two").css("height", "20vh");

    if (data.message.type == "launch-presentation") {
      // chatContainer.style.backgroundColor = data.message.dataColor;
      // document.body.style.backgroundColor = data.message.dataColor;
    }

    if (data.message.type == "launch-projet") {
      // chatContainer.style.backgroundColor = data.message.dataColor;
      // document.body.style.backgroundColor = data.message.dataColor;
      // let instruction = document.createElement("span");
      // instruction.textContent = "Projet";
      // instruction.classList.add("instructions");
      // instruction.classList.add("style-projet");
      // videoContainerTwo.classList.add("resize-drag");
      // document.body.appendChild(instruction);
      // setTimeout(() => {
      //   instruction.style.opacity = 1;
      //   toolControllerP.style.setProperty("display", "block", "important");
      //   videoContainerTwo.style.marginLeft = "-30vh";
      // }, 300);
      // console.log("spawn instruction");
      // setTimeout(() => {
      //   instruction.style.opacity = 0;
      // }, 2000);
      // setTimeout(() => {
      //   document.body.removeChild(instruction);
      // }, 2500);
    }

    if (data.message.type == "upload-public-img") {
      publicCounter++;
      console.log(publicCounter);

      //! APPEND PUBLIC COMMENTAIRES

      let publicImg = document.createElement("div");
      let image = document.createElement("img");
      image.src = data.message.srcUrl;
      image.classList.add("public-img");
      publicImg.classList.add("imageBlockwrapper");
      publicImg.classList.add("assets-public");
      publicImg.appendChild(image);
      publicAssetsWrapperTopFirst.appendChild(publicImg);

      if (publicCounter >= 1 && publicCounter <= 3) {
        publicAssetsWrapperTopFirst.appendChild(publicImg);
      } else if (publicCounter >= 4 && publicCounter <= 5) {
        publicAssetsWrapperRight.appendChild(publicImg);
      } else if (publicCounter >= 6 && publicCounter <= 10) {
        publicAssetsWrapperBottom.appendChild(publicImg);
      } else if (publicCounter >= 11 && publicCounter <= 12) {
        publicAssetsWrapperLeft.appendChild(publicImg);
      } else if (publicCounter >= 13 && publicCounter <= 15) {
        publicAssetsWrapperTopLast.appendChild(publicImg);
      } else if (publicCounter >= 16 && publicCounter <= 20) {
        publicAssetsWrapperTopFirst2.appendChild(publicImg);
      } else if (publicCounter >= 21 && publicCounter <= 22) {
        publicAssetsWrapperRight2.appendChild(publicImg);
      }

      //! APPEND PUBLIC NOTIF

      let notifwrap = document.createElement("div");
      let notifImg = document.createElement("img");
      notifImg.src = data.message.srcUrl;
      notifImg.style.width = "100%";
      notifwrap.classList.add("public-notification");
      if (publicCounter <= 1 && publicCounter < 2) {
        notifwrap.classList.add("animated-right");
        notifwrap.classList.add("public-notif-wrap-right");
      } else if (publicCounter >= 2 && publicCounter < 3) {
        notifwrap.classList.add("animated-left");
        notifwrap.classList.add("public-notif-wrap-left");
      } else if (publicCounter >= 3 && publicCounter < 4) {
        notifwrap.classList.add("animated-bottom");
        notifwrap.classList.add("public-notif-wrap-bottom");
      } else if (publicCounter >= 4 && publicCounter < 5) {
        notifwrap.classList.add("animated-top");
        notifwrap.classList.add("public-notif-wrap-top");
      }

      notifwrap.appendChild(notifImg);
      previewContainer.appendChild(notifwrap);
      //! APPEND SCROLLING PUBLIC COM

      // let imgSlide = document.createElement("div");
      // let imgofSlide = document.createElement("img");
      // imgSlide.classList.add("moving-banner-v");
      // imgSlide.classList.add("moving-img");

      // imgofSlide.src = data.message.srcUrl;
      // imgSlide.appendChild(imgofSlide);
      // document.body.appendChild(imgSlide);
      // imgSlide.addEventListener(
      //   "animationend",
      //   function () {
      //     document.body.removeChild(imgSlide);
      //   },
      //   false
      // );
    }
    if (data.message.type == "upload-public-vid") {
      let publicVid = document.createElement("div");
      let vid = document.createElement("video");
      vid.src = data.message.srcUrl;
      publicVid.classList.add("public-vid");
      publicVid.classList.add("vid");
      publicVid.appendChild(vid);
      publicAssetsWrapperTopFirst.appendChild(publicVid);

      let vidSlide = document.createElement("div");
      let vidofSlide = document.createElement("video");
      vidSlide.classList.add("moving-banner-h");
      vidSlide.classList.add("moving-vid");

      vidofSlide.src = data.message.srcUrl;
      vidSlide.appendChild(vidofSlide);
      document.body.appendChild(vidSlide);
      vidofSlide.autoplay = true;
      vidofSlide.muted = true;
      vidofSlide.loop = true;
      vidSlide.addEventListener(
        "animationend",
        function () {
          document.body.removeChild(vidSlide);
        },
        false
      );
    }

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

      // console.log(widthTimeStamp);
      imgCounter++;

      //! SHOW UX

      if (imgCounter <= 1) {
        SumAssets.style.opacity = "1";
        overViewButtonBottom.style.opacity = 1;
        gridLiveContainer.style.opacity = 1;

        // gridColRight.removeChild(gridColRight.lastChild);
      }

      document.querySelector(".chat-wrapper").style.display = "none";
      document.querySelector(".chats__message").style.color =
        "rgb(230,230,230)";

      //! APPEND MAIN CAROUSEL

      let imageGrid = document.createElement("img");
      let mainCell = document.createElement("div");
      mainCell.classList.add("keen-slider__slide");
      imageGrid.classList.add("main-carousel-img");
      imageGrid.src = data.message.srcImgUrl;
      mainCell.appendChild(imageGrid);
      mainCarousel.appendChild(mainCell);
      slider.update();
      // slider.next();

      let imageThumbWrap = document.createElement("div");
      let imageGridThumb = document.createElement("img");
      let imageNumber = document.createElement("span");
      let imageNumberMin = document.createElement("span");
      let space = document.createElement("span");
      let wrapImageTime = document.createElement("div");

      console.log(amountTimer);
      var m = Math.floor(amountTimer / 60);
      var s = Math.round(amountTimer - m * 60);
      // console.log(s);

      imageNumberMin.textContent = m;
      if (s < 10) {
        imageNumber.textContent = "0" + s;
      } else if (s >= 10) {
        imageNumber.textContent = s;
      }
      if (s === 60) {
        imageNumber.textContent = "00";
      }

      //! APPEND NAV CAROUSEL

      space.textContent = ":";
      space.classList.add("thumb-numb");
      imageGridThumb.src = data.message.srcImgUrl;
      imageNumber.classList.add("thumb-numb");
      imageNumberMin.classList.add("thumb-numb");
      wrapImageTime.classList.add("flex-time");
      imageThumbWrap.classList.add("thumb-grid-img");
      imageThumbWrap.classList.add("keen-slider__slide");
      imageThumbWrap.classList.add(`${"grid-assets" + imgCounter}`);
      wrapImageTime.appendChild(imageNumberMin);
      wrapImageTime.appendChild(space);
      wrapImageTime.appendChild(imageNumber);

      imageThumbWrap.appendChild(wrapImageTime);
      imageThumbWrap.appendChild(imageGridThumb);
      navCarousel.appendChild(imageThumbWrap);

      thumbnails.update();

      //! APPEND TOP TIMELINE IMAGE

      let imageThumbNail = document.createElement("img");
      imageThumbNail.src = data.message.srcImgUrl;
      imageThumbNail.setAttribute("number", imgCounter);
      imageThumbNail.classList.add(`${"assets"}`);
      SumAssets.appendChild(imageThumbNail);

      //! APPEND LIVE  IMAGE

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
      // imageWrap.setAttribute("number", imgCounter);
      imageWrap.classList.add(`${"imageStyle"}`);
      imageWrap.classList.add(`${"move-public"}`);
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
      // imageWrap.appendChild(info);
      imageWrap.appendChild(grow);

      previewContainer.appendChild(imageWrap);
      disabled();
      onHover();
      assetsCliked();
      growAssets();
      showText();
      reEnabled();
      setTimeout(() => {
        imageThumbNail.style.opacity = 1;
        imageThumbNail.style.marginLeft = widthTimeStamp + "%";
        if (imgCounter <= 1) {
          // previewContainerGrid.style.display = "none";
        }
      }, 300);
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

    // if (
    //   data.message.type == "moving-img-participant" ||
    //   data.message.type == "resize-img-participant"
    // ) {
    // }
    if (data.message.type == "moving-img-participant") {
      var $webcam = $(".imageBlock1");
      $webcam.addClass("isMoving-b");
      $webcam.removeClass("move-public");

      $webcam.css(
        "-webkit-transform",
        "translate(" +
          data.message.movingWebcam.x +
          "px," +
          data.message.movingWebcam.y +
          "px )"
      );
    } else {
      var $webcam = $(".imageBlock1");
      $webcam.removeClass("isMoving-b");
      $webcam.addClass("move-public");
    }
    if (data.message.type == "moving-img-participant-2") {
      var $webcam = $(".imageBlock2");
      $webcam.addClass("isMoving-w");
      $webcam.removeClass("move-public");
      $webcam.css(
        "-webkit-transform",
        "translate(" +
          data.message.movingWebcam.x +
          "px," +
          data.message.movingWebcam.y +
          "px )"
      );
    } else {
      var $webcam = $(".imageBlock2");
      $webcam.removeClass("isMoving-w");
      $webcam.addClass("move-public");
    }

    if (data.message.type == "moving-img-participant-3") {
      var $webcam = $(".imageBlock3");
      $webcam.addClass("isMoving-w");
      $webcam.removeClass("move-public");
      $webcam.css(
        "-webkit-transform",
        "translate(" +
          data.message.movingWebcam.x +
          "px," +
          data.message.movingWebcam.y +
          "px )"
      );
    } else {
      var $webcam = $(".imageBlock3");
      $webcam.removeClass("isMoving-w");
      $webcam.addClass("move-public");
    }
    if (data.message.type == "moving-img-participant-4") {
      var $webcam = $(".imageBlock4");
      $webcam.addClass("isMoving-w");
      $webcam.removeClass("move-public");
      $webcam.css(
        "-webkit-transform",
        "translate(" +
          data.message.movingWebcam.x +
          "px," +
          data.message.movingWebcam.y +
          "px )"
      );
    } else {
      var $webcam = $(".imageBlock4");
      $webcam.removeClass("isMoving-w");
      $webcam.addClass("move-public");
    }
    if (data.message.type == "moving-img-participant-5") {
      var $webcam = $(".imageBlock5");
      $webcam.addClass("isMoving-b");
      $webcam.removeClass("move-public");
      $webcam.css(
        "-webkit-transform",
        "translate(" +
          data.message.movingWebcam.x +
          "px," +
          data.message.movingWebcam.y +
          "px )"
      );
    } else {
      var $webcam = $(".imageBlock5");
      $webcam.removeClass("isMoving-b");
      $webcam.addClass("move-public");
    }
    if (data.message.type == "moving-img-participant-6") {
      var $webcam = $(".imageBlock6");
      $webcam.addClass("isMoving-w");
      $webcam.removeClass("move-public");
      $webcam.css(
        "-webkit-transform",
        "translate(" +
          data.message.movingWebcam.x +
          "px," +
          data.message.movingWebcam.y +
          "px )"
      );
    } else {
      var $webcam = $(".imageBlock6");
      $webcam.removeClass("isMoving-w");
      $webcam.addClass("move-public");
    }
    if (data.message.type == "moving-img-participant-7") {
      var $webcam = $(".imageBlock7");
      $webcam.addClass("isMoving-b");
      $webcam.removeClass("move-public");
      $webcam.css(
        "-webkit-transform",
        "translate(" +
          data.message.movingWebcam.x +
          "px," +
          data.message.movingWebcam.y +
          "px )"
      );
    } else {
      var $webcam = $(".imageBlock7");
      $webcam.removeClass("isMoving-b");
      $webcam.addClass("move-public");
    }
    if (data.message.type == "moving-img-participant-8") {
      var $webcam = $(".imageBlock8");
      $webcam.addClass("isMoving-b");
      $webcam.removeClass("move-public");
      $webcam.css(
        "-webkit-transform",
        "translate(" +
          data.message.movingWebcam.x +
          "px," +
          data.message.movingWebcam.y +
          "px )"
      );
    } else {
      var $webcam = $(".imageBlock8");
      $webcam.removeClass("isMoving-b");
      $webcam.addClass("move-public");
    }
    if (data.message.type == "moving-img-participant-9") {
      var $webcam = $(".imageBlock9");
      $webcam.addClass("isMoving-w");
      $webcam.removeClass("move-public");
      $webcam.css(
        "-webkit-transform",
        "translate(" +
          data.message.movingWebcam.x +
          "px," +
          data.message.movingWebcam.y +
          "px )"
      );
    } else {
      var $webcam = $(".imageBlock9");
      $webcam.removeClass("isMoving-w");
      $webcam.addClass("move-public");
    }
    if (data.message.type == "moving-img-participant-10") {
      var $webcam = $(".imageBlock10");
      $webcam.addClass("isMoving-w");
      $webcam.removeClass("move-public");
      $webcam.css(
        "-webkit-transform",
        "translate(" +
          data.message.movingWebcam.x +
          "px," +
          data.message.movingWebcam.y +
          "px )"
      );
    } else {
      var $webcam = $(".imageBlock10");
      $webcam.removeClass("isMoving-w");
      $webcam.addClass("move-public");
    }
    if (data.message.type == "moving-img-participant-11") {
      var $webcam = $(".imageBlock11");
      $webcam.addClass("isMoving-w");
      $webcam.removeClass("move-public");
      $webcam.css(
        "-webkit-transform",
        "translate(" +
          data.message.movingWebcam.x +
          "px," +
          data.message.movingWebcam.y +
          "px )"
      );
    } else {
      var $webcam = $(".imageBlock11");
      $webcam.removeClass("isMoving-w");
      $webcam.addClass("move-public");
    }
    if (data.message.type == "moving-img-participant-12") {
      var $webcam = $(".imageBlock12");
      $webcam.addClass("isMoving-w");
      $webcam.removeClass("move-public");
      $webcam.css(
        "-webkit-transform",
        "translate(" +
          data.message.movingWebcam.x +
          "px," +
          data.message.movingWebcam.y +
          "px )"
      );
    } else {
      var $webcam = $(".imageBlock12");
      $webcam.removeClass("isMoving-w");
      $webcam.addClass("move-public");
    }
    if (data.message.type == "moving-img-participant-13") {
      var $webcam = $(".imageBlock13");
      $webcam.addClass("isMoving-w");
      $webcam.removeClass("move-public");
      $webcam.css(
        "-webkit-transform",
        "translate(" +
          data.message.movingWebcam.x +
          "px," +
          data.message.movingWebcam.y +
          "px )"
      );
    } else {
      var $webcam = $(".imageBlock13");
      $webcam.removeClass("isMoving-w");
      $webcam.addClass("move-public");
    }
    if (data.message.type == "moving-img-participant-14") {
      var $webcam = $(".imageBlock14");
      $webcam.addClass("isMoving-w");
      $webcam.removeClass("move-public");
      $webcam.css(
        "-webkit-transform",
        "translate(" +
          data.message.movingWebcam.x +
          "px," +
          data.message.movingWebcam.y +
          "px )"
      );
    } else {
      var $webcam = $(".imageBlock14");
      $webcam.removeClass("isMoving-w");
      $webcam.addClass("move-public");
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
      // $webcam.css("height", data.message.resizeWebcam.h);
    }
    if (data.message.type == "resize-img-participant-3") {
      var $webcam = $(".imageBlock3");
      $webcam.css("width", data.message.resizeWebcam.w);
      // $webcam.css("height", data.message.resizeWebcam.h);
    }

    if (data.message.type == "resize-img-participant") {
      var $webcam = $(".imageBlock1");

      $webcam.addClass("isMoving-b");
      $webcam.removeClass("move-public");
      $webcam.css("width", data.message.resizeWebcam.w);
      // $webcam.css("opacity", "0.7");

      // $webcam.css("height", data.message.resizeWebcam.h);
    } else {
      // var $webcam = $(".imageBlock1");
      // $webcam.css("opacity", "1");
    }

    if (data.message.type == "resize-img-participant-2") {
      var $webcam = $(".imageBlock2");

      $webcam.addClass("isMoving-w");
      $webcam.removeClass("move-public");
      $webcam.css("width", data.message.resizeWebcam.w);
      // $webcam.css("height", data.message.resizeWebcam.h);
    }

    if (data.message.type == "resize-img-participant-3") {
      var $webcam = $(".imageBlock3");

      $webcam.addClass("isMoving-w");
      $webcam.removeClass("move-public");
      $webcam.css("width", data.message.resizeWebcam.w);
      // $webcam.css("height", data.message.resizeWebcam.h);
    }

    if (data.message.type == "resize-img-participant-4") {
      var $webcam = $(".imageBlock4");
      $webcam.css("width", data.message.resizeWebcam.w);
      // $webcam.css("height", data.message.resizeWebcam.h);
    }
    if (data.message.type == "resize-img-participant-5") {
      var $webcam = $(".imageBlock5");

      $webcam.addClass("isMoving-b");
      $webcam.removeClass("move-public");
      $webcam.css("width", data.message.resizeWebcam.w);
      // $webcam.css("height", data.message.resizeWebcam.h);
    }
    if (data.message.type == "resize-img-participant-6") {
      $webcam.addClass("isMoving-w");
      $webcam.removeClass("move-public");
      var $webcam = $(".imageBlock6");
      $webcam.css("width", data.message.resizeWebcam.w);
      // $webcam.css("height", data.message.resizeWebcam.h);
    }
    if (data.message.type == "resize-img-participant-7") {
      var $webcam = $(".imageBlock7");

      $webcam.addClass("isMoving-b");
      $webcam.removeClass("move-public");
      $webcam.css("width", data.message.resizeWebcam.w);
      // $webcam.css("height", data.message.resizeWebcam.h);
    }
    if (data.message.type == "resize-img-participant-8") {
      var $webcam = $(".imageBlock8");

      $webcam.addClass("isMoving-b");
      $webcam.removeClass("move-public");
      $webcam.css("width", data.message.resizeWebcam.w);
      // $webcam.css("height", data.message.resizeWebcam.h);
    }
    if (data.message.type == "resize-img-participant-9") {
      var $webcam = $(".imageBlock9");
      $webcam.addClass("isMoving-b");
      $webcam.removeClass("move-public");
      $webcam.css("width", data.message.resizeWebcam.w);
      // $webcam.css("height", data.message.resizeWebcam.h);
    }
    if (data.message.type == "resize-img-participant-10") {
      var $webcam = $(".imageBlock10");
      $webcam.addClass("isMoving-w");
      $webcam.removeClass("move-public");
      $webcam.css("width", data.message.resizeWebcam.w);
      // $webcam.css("height", data.message.resizeWebcam.h);
    }
    if (data.message.type == "resize-img-participant-11") {
      var $webcam = $(".imageBlock11");
      $webcam.addClass("isMoving-w");
      $webcam.removeClass("move-public");
      $webcam.css("width", data.message.resizeWebcam.w);
      // $webcam.css("height", data.message.resizeWebcam.h);
    }
    if (data.message.type == "resize-img-participant-12") {
      var $webcam = $(".imageBlock12");
      $webcam.addClass("isMoving-w");
      $webcam.removeClass("move-public");
      $webcam.css("width", data.message.resizeWebcam.w);
      // $webcam.css("height", data.message.resizeWebcam.h);
    }
    if (data.message.type == "resize-img-participant-13") {
      var $webcam = $(".imageBlock13");
      $webcam.addClass("isMoving-w");
      $webcam.removeClass("move-public");
      $webcam.css("width", data.message.resizeWebcam.w);
      // $webcam.css("height", data.message.resizeWebcam.h);
    }
    if (data.message.type == "resize-img-participant-14") {
      var $webcam = $(".imageBlock14");
      $webcam.addClass("isMoving-w");
      $webcam.removeClass("move-public");
      $webcam.css("width", data.message.resizeWebcam.w);
      // $webcam.css("height", data.message.resizeWebcam.h);
    }
    if (data.message.type == "resize-img-participant-15") {
      var $webcam = $(".imageBlock15");
      $webcam.css("width", data.message.resizeWebcam.w);
      // $webcam.css("height", data.message.resizeWebcam.h);
    }
  });

  //! REVERT
  player.on("revert-chat-message", (data) => {
    if (data.message.type == "launch-presentation") {
      // fond.style.backgroundColor = data.message.dataColor;
    }

    if (data.message.type == "launch-projet") {
      // fond.style.backgroundColor = data.message.dataColor;
    }
    if (data.message.type == "upload-public-vid") {
      let vidSlide = document.createElement("div");
      let vidofSlide = document.createElement("video");
      vidSlide.classList.add("moving-banner-h-invert");
      vidSlide.classList.add("moving-vid");

      vidofSlide.src = data.message.srcUrl;
      vidSlide.appendChild(vidofSlide);
      document.body.appendChild(vidSlide);
      vidofSlide.autoplay = true;
      vidofSlide.muted = true;
      vidofSlide.loop = true;
      vidSlide.addEventListener(
        "animationend",
        function () {
          document.body.removeChild(vidSlide);
        },
        false
      );
    }

    // console.log(data.message.type + "revert");
    if (data.message.type == "moving-webcam-participant") {
      // console.log(data.message.movingWebcam);
      var $webcam = $(".videoWrapper-two");

      $webcam.css("left", data.message.movingWebcam.x);
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
      try {
        previewContainer.removeChild(previewContainer.lastChild);
        SumAssets.removeChild(SumAssets.lastChild);
        navCarousel.removeChild(navCarousel.lastChild);
        mainCarousel.removeChild(mainCarousel.lastChild);
      } catch (e) {
        console.warn("could not remove img-url", data.message);
      }
      // gridColRight.removeChild(gridColRight.lastChild);
      // gridColLeft.removeChild(gridColLeft.lastChild);
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
        // $webcam.css("height", data.message.resizeWebcam.h);
      }
      if (data.message.type == "resize-img-participant-2") {
        var $webcam = $(".imageBlock2");
        $webcam.css("width", data.message.resizeWebcam.w);
        // $webcam.css("height", data.message.resizeWebcam.h);
      }
      if (data.message.type == "resize-img-participant-3") {
        var $webcam = $(".imageBlock3");
        $webcam.css("width", data.message.resizeWebcam.w);
        // $webcam.css("height", data.message.resizeWebcam.h);
      }
      if (data.message.type == "resize-img-participant-4") {
        var $webcam = $(".imageBlock4");
        $webcam.css("width", data.message.resizeWebcam.w);
        // $webcam.css("height", data.message.resizeWebcam.h);
      }
      if (data.message.type == "resize-img-participant-5") {
        var $webcam = $(".imageBlock5");
        $webcam.css("width", data.message.resizeWebcam.w);
        // $webcam.css("height", data.message.resizeWebcam.h);
      }
      if (data.message.type == "resize-img-participant-6") {
        var $webcam = $(".imageBlock6");
        $webcam.css("width", data.message.resizeWebcam.w);
        // $webcam.css("height", data.message.resizeWebcam.h);
      }
      if (data.message.type == "resize-img-participant-7") {
        var $webcam = $(".imageBlock7");
        $webcam.css("width", data.message.resizeWebcam.w);
        // $webcam.css("height", data.message.resizeWebcam.h);
      }
      if (data.message.type == "resize-img-participant-8") {
        var $webcam = $(".imageBlock8");
        $webcam.css("width", data.message.resizeWebcam.w);
        // $webcam.css("height", data.message.resizeWebcam.h);
      }
      if (data.message.type == "resize-img-participant-9") {
        var $webcam = $(".imageBlock9");
        $webcam.css("width", data.message.resizeWebcam.w);
        // $webcam.css("height", data.message.resizeWebcam.h);
      }
      if (data.message.type == "resize-img-participant-10") {
        var $webcam = $(".imageBlock10");
        $webcam.css("width", data.message.resizeWebcam.w);
        // $webcam.css("height", data.message.resizeWebcam.h);
      }
      if (data.message.type == "resize-img-participant-11") {
        var $webcam = $(".imageBlock11");
        $webcam.css("width", data.message.resizeWebcam.w);
        // $webcam.css("height", data.message.resizeWebcam.h);
      }
      if (data.message.type == "resize-img-participant-12") {
        var $webcam = $(".imageBlock12");
        $webcam.css("width", data.message.resizeWebcam.w);
        // $webcam.css("height", data.message.resizeWebcam.h);
      }
      if (data.message.type == "resize-img-participant-13") {
        var $webcam = $(".imageBlock13");
        $webcam.css("width", data.message.resizeWebcam.w);
        // $webcam.css("height", data.message.resizeWebcam.h);
      }
      if (data.message.type == "resize-img-participant-14") {
        var $webcam = $(".imageBlock14");
        $webcam.css("width", data.message.resizeWebcam.w);
        // $webcam.css("height", data.message.resizeWebcam.h);
      }
      if (data.message.type == "resize-img-participant-15") {
        var $webcam = $(".imageBlock15");
        $webcam.css("width", data.message.resizeWebcam.w);
        // $webcam.css("height", data.message.resizeWebcam.h);
      }
    }
  });
}
// console.log(meeting);

if (mode === "player") {
  // let other = document.querySelector(".playerMode");
  // other.style.display = "none";
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
  // console.log("public");
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

function zoomOut() {
  publicButton.classList.toggle("enabled-flex");
  firstR.classList.toggle("enabled-flex");

  setTimeout(() => {
    previewContainer.classList.toggle("scale");
    previewContainerGrid.classList.toggle("scale");
    videoContainer.classList.toggle("scale");
    gridLiveContainer.classList.toggle("scale");
    gridLiveContainer.classList.toggle("top-live-button");
    // publicButton.classList.toggle("enabled-flex");

    sumAssets.classList.toggle("disabled-opa");

    document.querySelector(".macroView").classList.toggle("dodgeColor");
    document.querySelector(".chats__message").classList.toggle("fontScale");
    publicButton.classList.toggle("enabled-opa");
    firstR.classList.toggle("enabled-opa");
    publicAssetsWrapperTopFirst.classList.toggle("enabled-opa");
  }, 100);
}
function zoomIn() {
  publicButton.classList.toggle("enabled-opa");
  firstR.classList.toggle("enabled-opa");

  previewContainer.classList.toggle("scale");
  previewContainerGrid.classList.toggle("scale");
  videoContainer.classList.toggle("scale");
  gridLiveContainer.classList.toggle("scale");
  gridLiveContainer.classList.toggle("top-live-button");
  setTimeout(() => {
    sumAssets.classList.toggle("disabled-opa");

    document.querySelector(".macroView").classList.toggle("dodgeColor");
    document.querySelector(".chats__message").classList.toggle("fontScale");
    publicButton.classList.toggle("enabled-opa");
    publicAssetsWrapperTopFirst.classList.toggle("enabled-opa");
  }, 100);
  setTimeout(() => {
    $("body").css("background-color", "dodgerblue");
    publicButton.classList.toggle("enabled-flex");
    firstR.classList.toggle("enabled-flex");
  }, 400);
}
function rangeScaling() {
  if (step1 === true) {
    firstRange.classList.toggle("range-1");
    previewContainer.classList.toggle("range-1-lecture");
    previewContainerGrid.classList.toggle("range-1-lecture");
    videoContainer.classList.toggle("range-1-lecture");
    videoContainer.classList.toggle("top-cam-live");
    gridLiveContainer.classList.toggle("range-1-lecture");
    gridLiveContainer.classList.toggle("top-live-button-2");

    publicAssetsWrapperTopFirst2.classList.toggle("enabled-flex");
    publicAssetsWrapperRight2.classList.toggle("enabled-flex");

    secondRange.classList.toggle("enabled-flex");
    secondR.classList.toggle("enabled-flex");
    secondR.classList.toggle("enabled-opa");

    step1 = false;
    step2 = true;
    console.log("step1");
    $(".descaling-range").css("opacity", "1");
  } else if (step2 === true) {
    console.log("step2");
    firstRange.classList.toggle("range-2");
    secondRange.classList.toggle("range-1");

    previewContainer.classList.toggle("range-2-lecture");
    previewContainerGrid.classList.toggle("range-2-lecture");
    videoContainer.classList.toggle("range-2-lecture");
    videoContainer.classList.toggle("top-cam-live-2");

    gridLiveContainer.classList.toggle("range-2-lecture");
    gridLiveContainer.classList.toggle("top-live-button-3");

    // $(".scaling-range").css("opacity", "0");
    step2 = false;
    step3 = true;
  } else if (step3 === true) {
    console.log("step3");
    firstRange.classList.toggle("range-2");
    secondRange.classList.toggle("range-1");
    previewContainer.classList.toggle("range-2-lecture");
    previewContainerGrid.classList.toggle("range-2-lecture");
    videoContainer.classList.toggle("range-2-lecture");
    videoContainer.classList.toggle("top-cam-live-2");
    gridLiveContainer.classList.toggle("range-2-lecture");
    gridLiveContainer.classList.toggle("top-live-button-3");

    // $(".scaling-range").css("opacity", "0");
    step3 = false;
    step4 = true;
  } else if (step4 === true) {
    console.log("step4");
    firstRange.classList.toggle("range-1");
    previewContainer.classList.toggle("range-1-lecture");
    previewContainerGrid.classList.toggle("range-1-lecture");
    videoContainer.classList.toggle("range-1-lecture");
    videoContainer.classList.toggle("top-cam-live");
    gridLiveContainer.classList.toggle("range-1-lecture");
    gridLiveContainer.classList.toggle("top-live-button-2");

    publicAssetsWrapperTopFirst2.classList.toggle("enabled-flex");
    publicAssetsWrapperRight2.classList.toggle("enabled-flex");

    secondR.classList.toggle("enabled-opa");
    secondR.classList.toggle("enabled-flex");
    secondRange.classList.toggle("enabled-flex");

    step4 = false;
    step1 = true;
  }
  // videoContainer.classList.toggle("scale");
  // gridLiveContainer.classList.toggle("scale");
  // gridLiveContainer.classList.toggle("top-live-button");
}

// console.log(elem === document.activeElement);
// if (elem === document.activeElement) {
//   console.log("Element has focus!");
//   elem.style.backgroundColor = "pink";
// } else {
//   console.log(`Element is not focused.`);
// }

onInactive(3000, function () {
  console.log("incative");

  // SumAssets.style.opacity = 0;
  // playerContainer.style.opacity = 0;
  // gridLiveContainer.style.opacity = 0;
  // overViewButtonBottom.style.opacity = 0;
  // nav.style.opacity = 0;
});

function onInactive(ms, cb) {
  var wait = setTimeout(cb, ms);

  document.onmousemove =
    document.mousedown =
    document.mouseup =
    document.onkeydown =
    document.onkeyup =
    document.focus =
      function () {
        // console.log("incative");
        // overViewButtonBottom.style.opacity = 1;
        // gridLiveContainer.style.opacity = 1;
        // SumAssets.style.opacity = 1;
        // playerContainer.style.opacity = 1;
        // nav.style.opacity = 1;

        // isPaused = false;

        clearTimeout(wait);
        wait = setTimeout(cb, ms);
      };
}

$(".toggle-layout").on("click", function (e) {
  // $(this).toggleClass("switch");
  if (switchMode === true) {
    slider.next();
    console.log("slider-upd");
    $(this).css("left", "48%");
    $(".gridMode").css("opacity", "1");
    $(".liveMode").css("opacity", "0");
    $(this).toggleClass("shadowLeft");

    $(".previewContainer").css("opacity", "0");

    $(".previewContainerGrid").css("display", "flex");
    sumAssets.classList.toggle("disabled-opa");
    videoContainer.classList.toggle("hide-live");
    gridVideo.classList.toggle("show-grid");
    setTimeout(() => {
      $(".previewContainerGrid").css("opacity", "1");
    }, 200);
    setTimeout(() => {
      $(".previewContainer").css("display", "none");
    }, 500);

    switchMode = false;
  } else if (switchMode === false) {
    $(this).css("left", "0%");
    $(".gridMode").css("opacity", "0");
    $(".liveMode").css("opacity", "1");
    $(this).toggleClass("shadowLeft");
    sumAssets.classList.toggle("disabled-opa");
    videoContainer.classList.toggle("hide-live");
    gridVideo.classList.toggle("show-grid");
    $(".previewContainer").css("display", "block");
    $(".previewContainerGrid").css("opacity", "0");

    setTimeout(() => {
      $(".previewContainer").css("opacity", "1");
    }, 200);

    setTimeout(() => {
      $(".previewContainerGrid").css("display", "none");
    }, 500);

    switchMode = true;
  }
});
$(".toggle-view").on("click", function (e) {
  // $(this).toggleClass("switch");
  if (switchMode === true) {
    $(this).css("left", "65%");
    $(".microView").css("opacity", "0");
    $(".macroView").css("opacity", "1");
    $(this).toggleClass("shadowLeft");
    $("body").css("background-color", "white");
    $(".scaling-range").css("opacity", "1");

    zoomOut();
    console.log("one");

    switchMode = false;
  } else if (switchMode === false) {
    $(".scaling-range").css("opacity", "0");

    $(this).css("left", "0%");
    $(".microView").css("opacity", "1");
    $(".macroView").css("opacity", "0");
    $(this).toggleClass("shadowLeft");
    zoomIn();
    console.log("two");

    switchMode = true;
  }
});
