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
    startButtonWrapper.style.setProperty("display", "none", "important");
    $(".videoWrapper-two").css("position", "absolute");

    if (mode === "toolP") {
      console.log("start Participant Rec");
      toolControllerP.style.setProperty("display", "block", "important");
    }
    if (mode === "toolH") {
      toolControllerH.style.setProperty("display", "block", "important");
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

      // );
      $(".videos-container").css("flex-direction", "row-reverse");
      $(".videoWrapper-two").css("transform", "translateX(-390%)");
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
  if (
    //! WEBCAM SIZE
    parsedText?.type == "resize-webcam" &&
    senderId != meeting.localParticipant.id
  ) {
    // console.log(parsedText.resizeWebcam.w, parsedText.resizeWebcam.h);

    if (senderId != meeting.localParticipant.id) {
      var $webcam = $(".videoWrapper-two");

      $webcam.css("width", parsedText.resizeWebcam.w);
      $webcam.css("height", parsedText.resizeWebcam.h);
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
  if (
    //! WEBCAM MOVEMENT
    parsedText?.type == "moving-webcam" &&
    senderId != meeting.localParticipant.id
  ) {
    // console.log(parsedText.movingWebcam.x, parsedText.movingWebcam.x);
    if (senderId != meeting.localParticipant.id) {
      console.log("rows");

      var $webcam = $(".videoWrapper-two");
      // VIDEO.moveVideo(
      //   $webcam,
      //   -parsedText.movingWebcam.x,
      //   parsedText.movingWebcam.y
      // );

      $webcam.css(
        `${meeting.localParticipant.id == senderId ? "left" : "right"}`,
        -parsedText.movingWebcam.x
      );
      $webcam.css("top", parsedText.movingWebcam.y);
    }
  }

  if (
    //! IMG DISPLAY
    parsedText?.type == "image-url"
  ) {
    console.log(parsedText.urlImage);

    if (meeting.localParticipant.id != senderId) {
      console.log(parsedText.urlImage);
      let divImage = document.createElement("div");
      divImage.style.backgroundImage = `url(${parsedText.urlImage})`;
      divImage.classList.add("imageBlock");
      // divImage.classList.add("resize-drag");
      playGround.appendChild(divImage);
    }
  }
}
