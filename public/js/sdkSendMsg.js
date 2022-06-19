let imgNumber = 0;
let imgNumberHost = 0;
console.log();
let vidNumber = 0;
let vidNumberHost = 0;

function onMessage(chatEvent) {
  const { senderId, text, timestamp, senderName } = chatEvent;
  const parsedText = JSON.parse(text);
  let chatData = [];
  // console.log(parsedText, senderId, senderName);

  if (
    //! ALL USER READY, INTERVIEW CAN START
    parsedText?.type == "all-user-ready"
    //remove this for both parties
  ) {
    const videosContainer = document.querySelector(".videos-container");
    videosContainer.style.setProperty("z-index", "999000", "important");
    fond.style.setProperty("background-color", "transparent", "important");
    playGround.style.setProperty("display", "none", "important");
    $(".videoWrapper-two").css("position", "absolute");
    // gridLiveContainer.style.setProperty("display", "none", "important");
    // overViewButtonBottom.style.setProperty("display", "none", "important");
    console.log("start");

    if (mode === "toolP") {
      console.log("start Participant Rec");
      // camMicControls.style.setProperty("display", "flex", "important");
      overViewButtonBottom.style.setProperty("display", "none", "important");
      sumAssets.style.setProperty("display", "none", "important");
      gridLiveContainer.style.setProperty("display", "none", "important");
      colorControls.style.setProperty("display", "flex", "important");
      videoContainerTwo.classList.add("resize-drag");
    }
    if (mode === "toolH") {
      toolControllerH.style.setProperty("display", "block", "important");
      overViewButtonBottom.style.setProperty("display", "none", "important");
      sumAssets.style.setProperty("display", "none", "important");
      chapterCrontrols.style.setProperty("display", "flex", "important");
      gridLiveContainer.style.setProperty("display", "none", "important");

      console.log("start");
    }
  }

  if (
    //! USER 1 IS READY

    parsedText?.type == "user1-ready" //remove this for both parties
  ) {
    if (meeting.localParticipant.id) {
      startButton.textContent = `En attente du participant`;
    }
    if (senderId != meeting.localParticipant.id) {
      startButton.style.setProperty("display", "none", "important");
      startOtherButton.style.setProperty("display", "block", "important");
      console.log("WOW");
      // );
      // $(".videoWrapper-two").css("transform", "translateX(-1250px)");

      startOtherButton.textContent = `${senderName} t'attend`;
    }
  }
  if (
    //! FLIP CAMERA FOR USER 2
    parsedText?.type == "mirror-webcam"
    //remove this for both parties
  ) {
    if (senderId != meeting.localParticipant.id) {
      // fond.style.setProperty("background-color", "violet", "important");
      console.log("change");
    }
  }
  //! PUBLIC CHAT MESSAGE

  if (parsedText?.type == "public-send-chat") {
    if (parsedText.message.length <= 35) {
      let horizBanner = document.createElement("div");
      let horizBannerText = document.createElement("span");
      let textAuthor = document.createElement("span");

      horizBanner.classList.add("moving-banner-h");
      textAuthor.classList.add("credit-banner");

      horizBannerText.textContent = `${parsedText.message}`;
      textAuthor.textContent = `${senderName}`;
      horizBanner.appendChild(horizBannerText);
      horizBanner.appendChild(textAuthor);
      previewContainer.appendChild(horizBanner);
    }
    if (parsedText.message.length > 35) {
      let verticalBanner = document.createElement("div");
      let verticalBannerText = document.createElement("span");
      let textAuthor = document.createElement("span");

      verticalBanner.classList.add("moving-banner-v");
      textAuthor.classList.add("credit-banner");

      verticalBannerText.textContent = `${parsedText.message}`;
      textAuthor.textContent = `${senderName}`;
      verticalBanner.appendChild(verticalBannerText);
      verticalBanner.appendChild(textAuthor);
      previewContainer.appendChild(verticalBanner);
    }
    // console.log(`${senderName + " a dit " + parsedText.message}`);
    console.log(parsedText.message.length);
    if (senderId != meeting.localParticipant.id) {
    }
  }

  if (parsedText?.type == "chatMessageCreated") {
    //! CHAT MESSAGE
    CHAT.addTextToLastMsg(parsedText.message);
    CHAT.lockLastMsg();
  }
  if (
    //! ON TAP CHAT
    parsedText?.type == "ontap-chat"
  ) {
    CHAT.addTextToLastMsg(parsedText.message);
    fond.style.zIndex = "99999";
    console.log("type");
  }
  // if (
  //   //! WEBCAM MOVEMENT
  //   parsedText?.type == "moving-webcam" &&
  //   senderId != meeting.localParticipant.id
  // ) {
  //   // console.log(parsedText.movingWebcam.x, parsedText.movingWebcam.x);
  //   if (senderId != meeting.localParticipant.id) {
  //     console.log("rows");

  //     var $webcam = $(".videoWrapper-two");
  //     // VIDEO.moveVideo(
  //     //   $webcam,
  //     //   -parsedText.movingWebcam.x,
  //     //   parsedText.movingWebcam.y
  //     // );

  //     $webcam.css(
  //       `${meeting.localParticipant.id == senderId ? "right" : "left"}`,
  //       parsedText.movingWebcam.x
  //     );
  //     $webcam.css("top", parsedText.movingWebcam.y);
  //     console.log(parsedText.movingWerbc);
  //   }
  // }
  if (
    //! WEBCAM RESIZE - PARTICIPANT
    parsedText?.type == "resize-webcam-participant" &&
    senderId != meeting.localParticipant.id
  ) {
    // console.log(parsedText.resizeWebcam.w, parsedText.resizeWebcam.h);

    if (senderId != meeting.localParticipant.id) {
      console.log("Participant is resizing webcam");

      if (mode === "toolH") {
        var $webcam = $(".videoWrapper-two");

        $webcam.css("width", parsedText.resizeWebcam.w);
        $webcam.css("height", parsedText.resizeWebcam.h);
      }
      if (mode === "public") {
        var $webcam = $(".videoWrapper-one");

        $webcam.css("width", parsedText.resizeWebcam.w);
        $webcam.css("height", parsedText.resizeWebcam.h);
      }
    }
  }
  if (
    //! WEBCAM RESIZE - HOST
    parsedText?.type == "resize-webcam-host" &&
    senderId != meeting.localParticipant.id
  ) {
    // console.log(parsedText.resizeWebcam.w, parsedText.resizeWebcam.h);

    if (senderId != meeting.localParticipant.id) {
      console.log("Host is resizing webcam");

      if (mode === "toolP") {
        var $webcam = $(".videoWrapper-one");

        $webcam.css("width", parsedText.resizeWebcam.w);
        $webcam.css("height", parsedText.resizeWebcam.h);
      }
      if (mode === "public") {
        var $webcam = $(".videoWrapper-one");

        $webcam.css("width", parsedText.resizeWebcam.w);
        $webcam.css("height", parsedText.resizeWebcam.h);
      }
    }
  }

  if (
    //! WEBCAM MOVEMENT - PARTICIPANT
    parsedText?.type == "moving-webcam-participant" &&
    senderId != meeting.localParticipant.id
  ) {
    // console.log(parsedText.movingWebcam.x, parsedText.movingWebcam.x);
    if (senderId != meeting.localParticipant.id) {
      console.log("Participant is moving webcam");
      if (mode === "toolH") {
        var $webcam = $(".videoWrapper-two");
        $webcam.css("left", "calc(50% - 20vh");
        $webcam.css(
          "-webkit-transform",
          "translate(" +
            parsedText.movingWebcam.x +
            "px," +
            parsedText.movingWebcam.y +
            "px )"
        );

        // $webcam.css(
        //   `${meeting.localParticipant.id == senderId ? "right" : "left"}`,
        //   parsedText.movingWebcam.x
        // );
        // $webcam.css("top", parsedText.movingWebcam.y);
        console.log(parsedText.movingWerbc);
      }
      if (mode === "public") {
        var $webcam = $(".videoWrapper-one");
        $webcam.css(
          `${meeting.localParticipant.id == senderId ? "right" : "left"}`,
          parsedText.movingWebcam.x
        );
        $webcam.css("top", parsedText.movingWebcam.y);
        console.log(parsedText.movingWerbc);
      }
    }
  }
  if (
    //! WEBCAM MOVEMENT - HOST
    parsedText?.type == "moving-webcam-host" &&
    senderId != meeting.localParticipant.id
  ) {
    // console.log(parsedText.movingWebcam.x, parsedText.movingWebcam.x);
    if (senderId != meeting.localParticipant.id) {
      console.log("Host is moving webcam");
      if (mode === "toolP") {
        var $webcam = $(".videoWrapper-one");
        // $webcam.css(
        //   `${meeting.localParticipant.id == senderId ? "right" : "left"}`,
        //   parsedText.movingWebcam.x
        // );
        // $webcam.css("top", parsedText.movingWebcam.y);
        $webcam.css(
          "-webkit-transform",
          "translate(" +
            parsedText.movingWebcam.x +
            "px," +
            parsedText.movingWebcam.y +
            "px )"
        );
        console.log(parsedText.movingWerbc);
      }
      if (mode === "public") {
        var $webcam = $(".videoWrapper-two");
        $webcam.css(
          `${meeting.localParticipant.id == senderId ? "right" : "left"}`,
          parsedText.movingWebcam.x
        );
        $webcam.css("top", parsedText.movingWebcam.y);
        console.log(parsedText.movingWerbc);
      }
    }
  }

  if (
    //! IMG DISPLAY
    parsedText?.type == "img-url"
  ) {
    console.log(parsedText.srcImgUrl);
    // imgNumber++;
    console.log(imgNumber);
    // imgNumber++;
    imgNumberHost++;

    if (meeting.localParticipant.id != senderId) {
      console.log(parsedText.srcImgUrl);
      let imageWrapper = document.createElement("div");
      let image = document.createElement("img");
      image.src = parsedText.srcImgUrl;
      imageWrapper.classList.add(`${"imageBlock" + imgNumberHost}`);
      imageWrapper.classList.add(`${"imageStyle"}`);
      imageWrapper.classList.add("assets");

      // image.classList.add("resize-ref");

      // imageWrapper.classList.add("imageBlockwrapper");
      // imageWrapper.classList.add("resize-ref");

      // image.classList.add("resize-drag");
      imageWrapper.appendChild(image);
      previewContainer.appendChild(imageWrapper);
    }
  }
  if (
    //! VIDEO DISPLAY
    parsedText?.type == "vid-url"
  ) {
    if (meeting.localParticipant.id != senderId) {
      console.log(parsedText.srcVidUrl);

      let videoWrapper = document.createElement("vid");
      videoWrapper.classList.add("video-testWrapper");

      vidNumberHost++;
      const video = document.createElement("video");
      video.src = parsedText.srcVidUrl;

      video.classList.add("vid-s");
      video.classList.add(`${"video-test" + vidNumberHost}`);
      video.classList.add("assets");

      // video.classList.add("resize-ref");

      previewContainer.appendChild(video);
      // previewContainer.appendChild(videoWrapper);
      video.autoplay = true;
      video.muted = true;
      video.loop = true;
      console.log("video-created");
    }
  }
  if (
    //! BLUR CAM
    parsedText?.type == "blur-cam"
  ) {
    if (meeting.localParticipant.id != senderId) {
      $(".video-frame:last").toggleClass("blur");
      console.log("toggle");
    }
  }
  if (
    //! PRESENTATION
    parsedText?.type == "launch-presentation"
  ) {
    let instruction = document.createElement("span");
    instruction.textContent = "Présentation";
    instruction.classList.add("instructions");
    instruction.classList.add("style-presentation");
    videoContainerTwo.classList.add("resize-drag");
    previewContainer.appendChild(instruction);
    instruction.style.opacity = 1;
    chapterCrontrols.style.setProperty("display", "none", "important");

    setTimeout(() => {
      instruction.style.opacity = 0;
    }, 2000);
    setTimeout(() => {
      previewContainer.removeChild(instruction);
    }, 2500);
    if (meeting.localParticipant.id != senderId) {
      setTimeout(() => {
        toolControllerP.style.setProperty("display", "block", "important");
        chapterCrontrolsParticipant.style.setProperty(
          "display",
          "flex",
          "important"
        );
      }, 300);

      console.log("spawn instruction");
    }

    setTimeout(() => {
      // previewContainer.style.backgroundColor = parsedText.dataColor;
    }, 300);
  }
  if (
    //! PROJET
    parsedText?.type == "launch-projet"
  ) {
    let instruction = document.createElement("span");
    instruction.textContent = "Projets";
    instruction.classList.add("instructions");
    instruction.classList.add("style-projet");

    previewContainer.appendChild(instruction);
    setTimeout(() => {
      instruction.style.opacity = 1;
    }, 300);

    console.log("spawn instruction");

    setTimeout(() => {
      instruction.style.opacity = 0;
      chapterCrontrolsParticipant.style.setProperty(
        "display",
        "none",
        "important"
      );
    }, 2000);
    setTimeout(() => {
      previewContainer.removeChild(instruction);
    }, 2500);
    setTimeout(() => {
      previewContainer.style.backgroundColor = parsedText.dataColor;
      let assets = document.querySelectorAll(".assets");
      assets.forEach((assets) => {
        assets.remove();
      });
    }, 700);
    if (meeting.localParticipant.id != senderId) {
    } else {
      endButton.style.setProperty("display", "flex", "important");
    }
  }
  if (
    //! REFERENCE
    parsedText?.type == "end"
  ) {
    let instruction = document.createElement("span");
    instruction.textContent = "Fin";
    instruction.classList.add("instructions");
    instruction.classList.add("style-ref");

    previewContainer.appendChild(instruction);
    setTimeout(() => {
      instruction.style.opacity = 1;
    }, 300);

    console.log("spawn instruction");
    setTimeout(() => {
      instruction.style.opacity = 0;
    }, 2000);
    setTimeout(() => {
      previewContainer.removeChild(instruction);
    }, 2500);
    if (meeting.localParticipant.id != senderId) {
    } else {
      setTimeout(() => {
        toolControllerP.style.setProperty("display", "none", "important");
      }, 400);
    }

    setTimeout(() => {
      previewContainer.style.backgroundColor = parsedText.dataColor;
      let assets = document.querySelectorAll(".assets");
      assets.forEach((assets) => {
        assets.remove();
      });
    }, 700);
  }
  if (
    //! REFERENCE
    parsedText?.type == "couleur-fond"
  ) {
    previewContainer.style.backgroundColor = parsedText.dataColor;
  }
  if (
    //! MOVING IMAGE PARTICIPANt
    parsedText?.type == "moving-img-participant" &&
    senderId != meeting.localParticipant.id
  ) {
    if (senderId != meeting.localParticipant.id) {
      if (mode === "toolH") {
        console.log("img1recu");
        var $webcam = $(".imageBlock1");
        $webcam.css(
          "-webkit-transform",
          "translate(" +
            parsedText.movingWebcam.x +
            "px," +
            parsedText.movingWebcam.y +
            "px )"
        );
      }
    }
  } else if (
    parsedText?.type == "moving-img-participant-2" &&
    senderId != meeting.localParticipant.id
  ) {
    if (mode === "toolH") {
      console.log("imgrecu2");

      var $webcam = $(".imageBlock2");
      $webcam.css(
        "-webkit-transform",
        "translate(" +
          parsedText.movingWebcam.x +
          "px," +
          parsedText.movingWebcam.y +
          "px )"
      );
    }
  } else if (
    parsedText?.type == "moving-img-participant-3" &&
    senderId != meeting.localParticipant.id
  ) {
    if (mode === "toolH") {
      var $webcam = $(".imageBlock3");
      $webcam.css(
        "-webkit-transform",
        "translate(" +
          parsedText.movingWebcam.x +
          "px," +
          parsedText.movingWebcam.y +
          "px )"
      );
    }
  } else if (
    parsedText?.type == "moving-img-participant-4" &&
    senderId != meeting.localParticipant.id
  ) {
    if (mode === "toolH") {
      var $webcam = $(".imageBlock4");
      $webcam.css(
        "-webkit-transform",
        "translate(" +
          parsedText.movingWebcam.x +
          "px," +
          parsedText.movingWebcam.y +
          "px )"
      );
    }
  } else if (
    parsedText?.type == "moving-img-participant-5" &&
    senderId != meeting.localParticipant.id
  ) {
    if (mode === "toolH") {
      var $webcam = $(".imageBlock5");
      $webcam.css(
        "-webkit-transform",
        "translate(" +
          parsedText.movingWebcam.x +
          "px," +
          parsedText.movingWebcam.y +
          "px )"
      );
    }
  } else if (
    parsedText?.type == "moving-img-participant-6" &&
    senderId != meeting.localParticipant.id
  ) {
    if (mode === "toolH") {
      var $webcam = $(".imageBlock6");
      $webcam.css(
        "-webkit-transform",
        "translate(" +
          parsedText.movingWebcam.x +
          "px," +
          parsedText.movingWebcam.y +
          "px )"
      );
    }
  } else if (
    parsedText?.type == "moving-img-participant-7" &&
    senderId != meeting.localParticipant.id
  ) {
    if (mode === "toolH") {
      var $webcam = $(".imageBlock7");
      $webcam.css(
        "-webkit-transform",
        "translate(" +
          parsedText.movingWebcam.x +
          "px," +
          parsedText.movingWebcam.y +
          "px )"
      );
    }
  } else if (
    parsedText?.type == "moving-img-participant-8" &&
    senderId != meeting.localParticipant.id
  ) {
    if (mode === "toolH") {
      var $webcam = $(".imageBlock8");
      $webcam.css(
        "-webkit-transform",
        "translate(" +
          parsedText.movingWebcam.x +
          "px," +
          parsedText.movingWebcam.y +
          "px )"
      );
    }
  } else if (
    parsedText?.type == "moving-img-participant-9" &&
    senderId != meeting.localParticipant.id
  ) {
    if (mode === "toolH") {
      var $webcam = $(".imageBlock9");
      $webcam.css(
        "-webkit-transform",
        "translate(" +
          parsedText.movingWebcam.x +
          "px," +
          parsedText.movingWebcam.y +
          "px )"
      );
    }
  } else if (
    parsedText?.type == "moving-img-participant-10" &&
    senderId != meeting.localParticipant.id
  ) {
    if (mode === "toolH") {
      var $webcam = $(".imageBlock10");
      $webcam.css(
        "-webkit-transform",
        "translate(" +
          parsedText.movingWebcam.x +
          "px," +
          parsedText.movingWebcam.y +
          "px )"
      );
    }
  } else if (
    parsedText?.type == "moving-img-participant-11" &&
    senderId != meeting.localParticipant.id
  ) {
    if (mode === "toolH") {
      var $webcam = $(".imageBlock11");
      $webcam.css(
        "-webkit-transform",
        "translate(" +
          parsedText.movingWebcam.x +
          "px," +
          parsedText.movingWebcam.y +
          "px )"
      );
    }
  } else if (
    parsedText?.type == "moving-img-participant-12" &&
    senderId != meeting.localParticipant.id
  ) {
    if (mode === "toolH") {
      var $webcam = $(".imageBlock12");
      $webcam.css(
        "-webkit-transform",
        "translate(" +
          parsedText.movingWebcam.x +
          "px," +
          parsedText.movingWebcam.y +
          "px )"
      );
    }
  } else if (
    parsedText?.type == "moving-img-participant-13" &&
    senderId != meeting.localParticipant.id
  ) {
    if (mode === "toolH") {
      var $webcam = $(".imageBlock13");
      $webcam.css(
        "-webkit-transform",
        "translate(" +
          parsedText.movingWebcam.x +
          "px," +
          parsedText.movingWebcam.y +
          "px )"
      );
    }
  } else if (
    parsedText?.type == "moving-img-participant-14" &&
    senderId != meeting.localParticipant.id
  ) {
    if (mode === "toolH") {
      var $webcam = $(".imageBlock14");
      $webcam.css(
        "-webkit-transform",
        "translate(" +
          parsedText.movingWebcam.x +
          "px," +
          parsedText.movingWebcam.y +
          "px )"
      );
    }
  } else if (
    parsedText?.type == "moving-img-participant-15" &&
    senderId != meeting.localParticipant.id
  ) {
    if (mode === "toolH") {
      var $webcam = $(".imageBlock15");
      $webcam.css(
        "-webkit-transform",
        "translate(" +
          parsedText.movingWebcam.x +
          "px," +
          parsedText.movingWebcam.y +
          "px )"
      );
    }
  } else if (
    parsedText?.type == "moving-img-participant-16" &&
    senderId != meeting.localParticipant.id
  ) {
    if (mode === "toolH") {
      var $webcam = $(".imageBlock16");
      $webcam.css(
        "-webkit-transform",
        "translate(" +
          parsedText.movingWebcam.x +
          "px," +
          parsedText.movingWebcam.y +
          "px )"
      );
    }
  } else if (
    parsedText?.type == "moving-img-participant-17" &&
    senderId != meeting.localParticipant.id
  ) {
    if (mode === "toolH") {
      var $webcam = $(".imageBlock17");
      $webcam.css(
        "-webkit-transform",
        "translate(" +
          parsedText.movingWebcam.x +
          "px," +
          parsedText.movingWebcam.y +
          "px )"
      );
    }
  } else if (
    parsedText?.type == "moving-img-participant-18" &&
    senderId != meeting.localParticipant.id
  ) {
    if (mode === "toolH") {
      var $webcam = $(".imageBlock18");
      $webcam.css(
        "-webkit-transform",
        "translate(" +
          parsedText.movingWebcam.x +
          "px," +
          parsedText.movingWebcam.y +
          "px )"
      );
    }
  } else if (
    parsedText?.type == "moving-img-participant-19" &&
    senderId != meeting.localParticipant.id
  ) {
    if (mode === "toolH") {
      var $webcam = $(".imageBlock19");
      $webcam.css(
        "-webkit-transform",
        "translate(" +
          parsedText.movingWebcam.x +
          "px," +
          parsedText.movingWebcam.y +
          "px )"
      );
    }
  } else if (
    parsedText?.type == "moving-img-participant-20" &&
    senderId != meeting.localParticipant.id
  ) {
    if (mode === "toolH") {
      var $webcam = $(".imageBlock20");
      $webcam.css(
        "-webkit-transform",
        "translate(" +
          parsedText.movingWebcam.x +
          "px," +
          parsedText.movingWebcam.y +
          "px )"
      );
    }
  }
  if (
    //! RESIZE IMAGE PARTICIPANT
    parsedText?.type == "resize-img-participant" &&
    senderId != meeting.localParticipant.id
  ) {
    // console.log(parsedText.movingWebcam.x, parsedText.movingWebcam.x);
    if (senderId != meeting.localParticipant.id) {
      if (mode === "toolH") {
        var $webcam = $(".imageBlock1");

        $webcam.css("width", parsedText.resizeWebcam.w);
        $webcam.css("height", parsedText.resizeWebcam.h);
      }
    }
  } else if (
    parsedText?.type == "resize-img-participant-2" &&
    senderId != meeting.localParticipant.id
  ) {
    if (senderId != meeting.localParticipant.id) {
      if (mode === "toolH") {
        var $webcam = $(".imageBlock2");

        $webcam.css("width", parsedText.resizeWebcam.w);
        $webcam.css("height", parsedText.resizeWebcam.h);
      }
    }
  } else if (
    parsedText?.type == "resize-img-participant-3" &&
    senderId != meeting.localParticipant.id
  ) {
    if (senderId != meeting.localParticipant.id) {
      if (mode === "toolH") {
        var $webcam = $(".imageBlock3");

        $webcam.css("width", parsedText.resizeWebcam.w);
        $webcam.css("height", parsedText.resizeWebcam.h);
      }
    }
  } else if (
    parsedText?.type == "resize-img-participant-4" &&
    senderId != meeting.localParticipant.id
  ) {
    if (senderId != meeting.localParticipant.id) {
      if (mode === "toolH") {
        var $webcam = $(".imageBlock4");

        $webcam.css("width", parsedText.resizeWebcam.w);
        $webcam.css("height", parsedText.resizeWebcam.h);
      }
    }
  } else if (
    parsedText?.type == "resize-img-participant-5" &&
    senderId != meeting.localParticipant.id
  ) {
    if (senderId != meeting.localParticipant.id) {
      if (mode === "toolH") {
        var $webcam = $(".imageBlock5");

        $webcam.css("width", parsedText.resizeWebcam.w);
        $webcam.css("height", parsedText.resizeWebcam.h);
      }
    }
  } else if (
    parsedText?.type == "resize-img-participant-6" &&
    senderId != meeting.localParticipant.id
  ) {
    if (senderId != meeting.localParticipant.id) {
      if (mode === "toolH") {
        var $webcam = $(".imageBlock6");

        $webcam.css("width", parsedText.resizeWebcam.w);
        $webcam.css("height", parsedText.resizeWebcam.h);
      }
    }
  } else if (
    parsedText?.type == "resize-img-participant-7" &&
    senderId != meeting.localParticipant.id
  ) {
    if (senderId != meeting.localParticipant.id) {
      if (mode === "toolH") {
        var $webcam = $(".imageBlock7");

        $webcam.css("width", parsedText.resizeWebcam.w);
        $webcam.css("height", parsedText.resizeWebcam.h);
      }
    }
  } else if (
    parsedText?.type == "resize-img-participant-8" &&
    senderId != meeting.localParticipant.id
  ) {
    if (senderId != meeting.localParticipant.id) {
      if (mode === "toolH") {
        var $webcam = $(".imageBlock8");

        $webcam.css("width", parsedText.resizeWebcam.w);
        $webcam.css("height", parsedText.resizeWebcam.h);
      }
    }
  } else if (
    parsedText?.type == "resize-img-participant-9" &&
    senderId != meeting.localParticipant.id
  ) {
    if (senderId != meeting.localParticipant.id) {
      if (mode === "toolH") {
        var $webcam = $(".imageBlock9");

        $webcam.css("width", parsedText.resizeWebcam.w);
        $webcam.css("height", parsedText.resizeWebcam.h);
      }
    }
  } else if (
    parsedText?.type == "resize-img-participant-10" &&
    senderId != meeting.localParticipant.id
  ) {
    if (senderId != meeting.localParticipant.id) {
      if (mode === "toolH") {
        var $webcam = $(".imageBlock10");

        $webcam.css("width", parsedText.resizeWebcam.w);
        $webcam.css("height", parsedText.resizeWebcam.h);
      }
    }
  } else if (
    parsedText?.type == "resize-img-participant-11" &&
    senderId != meeting.localParticipant.id
  ) {
    if (senderId != meeting.localParticipant.id) {
      if (mode === "toolH") {
        var $webcam = $(".imageBlock11");

        $webcam.css("width", parsedText.resizeWebcam.w);
        $webcam.css("height", parsedText.resizeWebcam.h);
      }
    }
  } else if (
    parsedText?.type == "resize-img-participant-12" &&
    senderId != meeting.localParticipant.id
  ) {
    if (senderId != meeting.localParticipant.id) {
      if (mode === "toolH") {
        var $webcam = $(".imageBlock12");

        $webcam.css("width", parsedText.resizeWebcam.w);
        $webcam.css("height", parsedText.resizeWebcam.h);
      }
    }
  } else if (
    parsedText?.type == "resize-img-participant-13" &&
    senderId != meeting.localParticipant.id
  ) {
    if (senderId != meeting.localParticipant.id) {
      if (mode === "toolH") {
        var $webcam = $(".imageBlock13");

        $webcam.css("width", parsedText.resizeWebcam.w);
        $webcam.css("height", parsedText.resizeWebcam.h);
      }
    }
  } else if (
    parsedText?.type == "resize-img-participant-14" &&
    senderId != meeting.localParticipant.id
  ) {
    if (senderId != meeting.localParticipant.id) {
      if (mode === "toolH") {
        var $webcam = $(".imageBlock14");

        $webcam.css("width", parsedText.resizeWebcam.w);
        $webcam.css("height", parsedText.resizeWebcam.h);
      }
    }
  } else if (
    parsedText?.type == "resize-img-participant-15" &&
    senderId != meeting.localParticipant.id
  ) {
    if (senderId != meeting.localParticipant.id) {
      if (mode === "toolH") {
        var $webcam = $(".imageBlock15");

        $webcam.css("width", parsedText.resizeWebcam.w);
        $webcam.css("height", parsedText.resizeWebcam.h);
      }
    }
  } else if (
    parsedText?.type == "resize-img-participant-16" &&
    senderId != meeting.localParticipant.id
  ) {
    if (senderId != meeting.localParticipant.id) {
      if (mode === "toolH") {
        var $webcam = $(".imageBlock16");

        $webcam.css("width", parsedText.resizeWebcam.w);
        $webcam.css("height", parsedText.resizeWebcam.h);
      }
    }
  } else if (
    parsedText?.type == "resize-img-participant-17" &&
    senderId != meeting.localParticipant.id
  ) {
    if (senderId != meeting.localParticipant.id) {
      if (mode === "toolH") {
        var $webcam = $(".imageBlock17");

        $webcam.css("width", parsedText.resizeWebcam.w);
        $webcam.css("height", parsedText.resizeWebcam.h);
      }
    }
  } else if (
    parsedText?.type == "resize-img-participant-18" &&
    senderId != meeting.localParticipant.id
  ) {
    if (senderId != meeting.localParticipant.id) {
      if (mode === "toolH") {
        var $webcam = $(".imageBlock18");

        $webcam.css("width", parsedText.resizeWebcam.w);
        $webcam.css("height", parsedText.resizeWebcam.h);
      }
    }
  } else if (
    parsedText?.type == "resize-img-participant-19" &&
    senderId != meeting.localParticipant.id
  ) {
    if (senderId != meeting.localParticipant.id) {
      if (mode === "toolH") {
        var $webcam = $(".imageBlock19");

        $webcam.css("width", parsedText.resizeWebcam.w);
        $webcam.css("height", parsedText.resizeWebcam.h);
      }
    }
  } else if (
    parsedText?.type == "resize-img-participant-20" &&
    senderId != meeting.localParticipant.id
  ) {
    if (senderId != meeting.localParticipant.id) {
      if (mode === "toolH") {
        var $webcam = $(".imageBlock20");

        $webcam.css("width", parsedText.resizeWebcam.w);
        $webcam.css("height", parsedText.resizeWebcam.h);
      }
    }
  }

  if (
    //! MOVING VIDEo PARTICIPANT
    parsedText?.type == "moving-vid-participant" &&
    senderId != meeting.localParticipant.id
  ) {
    if (senderId != meeting.localParticipant.id) {
      if (mode === "toolH") {
        var $webcam = $(".video-test1");
        $webcam.css(
          "-webkit-transform",
          "translate(" +
            parsedText.movingWebcam.x +
            "px," +
            parsedText.movingWebcam.y +
            "px )"
        );
      }
    }
  } else if (
    parsedText?.type == "moving-vid-participant-2" &&
    senderId != meeting.localParticipant.id
  ) {
    if (senderId != meeting.localParticipant.id) {
      if (mode === "toolH") {
        var $webcam = $(".video-test2");
        $webcam.css(
          "-webkit-transform",
          "translate(" +
            parsedText.movingWebcam.x +
            "px," +
            parsedText.movingWebcam.y +
            "px )"
        );
      }
    }
  } else if (
    parsedText?.type == "moving-vid-participant-3" &&
    senderId != meeting.localParticipant.id
  ) {
    if (senderId != meeting.localParticipant.id) {
      if (mode === "toolH") {
        var $webcam = $(".video-test3");
        $webcam.css(
          "-webkit-transform",
          "translate(" +
            parsedText.movingWebcam.x +
            "px," +
            parsedText.movingWebcam.y +
            "px )"
        );
      }
    }
  } else if (
    parsedText?.type == "moving-vid-participant-4" &&
    senderId != meeting.localParticipant.id
  ) {
    if (senderId != meeting.localParticipant.id) {
      if (mode === "toolH") {
        var $webcam = $(".video-test4");
        $webcam.css(
          "-webkit-transform",
          "translate(" +
            parsedText.movingWebcam.x +
            "px," +
            parsedText.movingWebcam.y +
            "px )"
        );
      }
    }
  } else if (
    parsedText?.type == "moving-vid-participant-5" &&
    senderId != meeting.localParticipant.id
  ) {
    if (senderId != meeting.localParticipant.id) {
      if (mode === "toolH") {
        var $webcam = $(".video-test5");
        $webcam.css(
          "-webkit-transform",
          "translate(" +
            parsedText.movingWebcam.x +
            "px," +
            parsedText.movingWebcam.y +
            "px )"
        );
      }
    }
  }
  if (
    //! RESIZE VID PARTICIPANT
    parsedText?.type == "resize-vid-participant" &&
    senderId != meeting.localParticipant.id
  ) {
    // console.log(parsedText.movingWebcam.x, parsedText.movingWebcam.x);
    if (senderId != meeting.localParticipant.id) {
      console.log("invité is moving image");
      if (mode === "toolH") {
        var $webcam = $(".video-test1");

        $webcam.css("width", parsedText.resizeWebcam.w);
        $webcam.css("height", parsedText.resizeWebcam.h);
      }
    }
  } else if (
    //! RESIZE VID PARTICIPANT
    parsedText?.type == "resize-vid-participant-2" &&
    senderId != meeting.localParticipant.id
  ) {
    // console.log(parsedText.movingWebcam.x, parsedText.movingWebcam.x);
    if (senderId != meeting.localParticipant.id) {
      if (mode === "toolH") {
        var $webcam = $(".video-test2");

        $webcam.css("width", parsedText.resizeWebcam.w);
        $webcam.css("height", parsedText.resizeWebcam.h);
      }
    }
  } else if (
    //! RESIZE VID PARTICIPANT
    parsedText?.type == "resize-vid-participant-3" &&
    senderId != meeting.localParticipant.id
  ) {
    // console.log(parsedText.movingWebcam.x, parsedText.movingWebcam.x);
    if (senderId != meeting.localParticipant.id) {
      if (mode === "toolH") {
        var $webcam = $(".video-test3");

        $webcam.css("width", parsedText.resizeWebcam.w);
        $webcam.css("height", parsedText.resizeWebcam.h);
      }
    }
  } else if (
    //! RESIZE VID PARTICIPANT
    parsedText?.type == "resize-vid-participant-4" &&
    senderId != meeting.localParticipant.id
  ) {
    // console.log(parsedText.movingWebcam.x, parsedText.movingWebcam.x);
    if (senderId != meeting.localParticipant.id) {
      if (mode === "toolH") {
        var $webcam = $(".video-test4");

        $webcam.css("width", parsedText.resizeWebcam.w);
        $webcam.css("height", parsedText.resizeWebcam.h);
      }
    }
  } else if (
    //! RESIZE VID PARTICIPANT
    parsedText?.type == "resize-vid-participant-5" &&
    senderId != meeting.localParticipant.id
  ) {
    // console.log(parsedText.movingWebcam.x, parsedText.movingWebcam.x);
    if (senderId != meeting.localParticipant.id) {
      if (mode === "toolH") {
        var $webcam = $(".video-test5");

        $webcam.css("width", parsedText.resizeWebcam.w);
        $webcam.css("height", parsedText.resizeWebcam.h);
      }
    }
  }
}
