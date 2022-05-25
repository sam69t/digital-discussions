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

    if (mode === "toolP") {
      console.log("start Participant Rec");
      toolControllerP.style.setProperty("display", "block", "important");
      camMicControls.style.setProperty("display", "flex", "important");
    }
    if (mode === "toolH") {
      toolControllerH.style.setProperty("display", "block", "important");
      // toolControllerP.style.setProperty("display", "block", "important");
      camMicControls.style.setProperty("display", "flex", "important");
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
        var $webcam = $(".videoWrapper-two");

        $webcam.css("width", parsedText.resizeWebcam.w);
        $webcam.css("height", parsedText.resizeWebcam.h);
      }
      if (mode === "public") {
        var $webcam = $(".videoWrapper-two");

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
        $webcam.css(
          `${meeting.localParticipant.id == senderId ? "right" : "left"}`,
          parsedText.movingWebcam.x
        );
        $webcam.css("top", parsedText.movingWebcam.y);
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
        var $webcam = $(".videoWrapper-two");
        $webcam.css(
          `${meeting.localParticipant.id == senderId ? "right" : "left"}`,
          parsedText.movingWebcam.x
        );
        $webcam.css("top", parsedText.movingWebcam.y);
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
      // let imageWrapper = document.createElement("div");
      let image = document.createElement("img");
      image.src = parsedText.srcImgUrl;
      image.classList.add(`${"imageBlock" + imgNumberHost}`);
      image.classList.add(`${"imageStyle"}`);

      // image.classList.add("resize-ref");

      // imageWrapper.classList.add("imageBlockwrapper");
      // imageWrapper.classList.add("resize-ref");

      // image.classList.add("resize-drag");
      // imageWrapper.appendChild(image);
      previewContainer.appendChild(image);
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
    //! COULEUR DU FOND
    parsedText?.type == "couleur-fond"
  ) {
    if (meeting.localParticipant.id != senderId) {
      previewContainer.style.backgroundColor = parsedText.dataColor;
    }
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
  }
  if (
    //! RESIZE IMAGE PARTICIPANT
    parsedText?.type == "resize-img-participant" &&
    senderId != meeting.localParticipant.id
  ) {
    // console.log(parsedText.movingWebcam.x, parsedText.movingWebcam.x);
    if (senderId != meeting.localParticipant.id) {
      console.log("invité is moving image");
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
      console.log("invité is moving image");
      if (mode === "toolH") {
        var $webcam = $(".imageBlock2");

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
  }
}
