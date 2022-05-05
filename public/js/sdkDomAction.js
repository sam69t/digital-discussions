function domAction() {
  //! CHAT MESSAGE SAVER

  // sendMessageBtn.addEventListener("click", async () => {
  //   const message = inputUser.value;
  //   meeting.sendChatMessage(
  //     JSON.stringify({ type: "chatMessageCreated", message })
  //   );
  //   console.log(message);
  //   document.getElementById("inputMessage").value = "";
  // });

  //! MOUSE ACTIVITY SENDER

  $(document).on("mousemove", function (event) {
    const mouseActivity = {
      x: event.pageX,
      y: event.pageY,
    };
    // meeting.sendChatMessage(
    //   JSON.stringify({ type: "mouse-move", mouseActivity })
    // );
  });

  //! VIDEO DRAG & SIZE SENDER

  // //! START RECORDING

  startButton.addEventListener("click", async () => {
    console.log("sendUser1");
    let localUser = true;
    // let localUser = { user1: true, user2: false };

    meeting.sendChatMessage(JSON.stringify({ type: "user1-ready", localUser }));
  });
  startOtherButton.addEventListener("click", async () => {
    console.log("sendUser1");
    const allUsersReady = true;
    meeting.sendChatMessage(
      JSON.stringify({ type: "all-user-ready", allUsersReady })
    );
  });

  // //! STOP RECORDING
  startRecordingBtn.addEventListener("click", async () => {
    meeting.startRecording();
  });
  stopRecordingBtn.addEventListener("click", async () => {
    meeting.stopRecording();
  });

  //! HIDE OR SHOW CAM
  camButton.addEventListener("click", () => {
    if (camButton.innerText == "Hide Cam") {
      console.log("WOW");
      // meeting.disableWebcam();
      console.log(meeting.localParticipant.id, participant);
      $(".video-frame").addClass("blur");
      camButton.innerText = "Enable Cam";
      console.log("hide");
    } else {
      // meeting.enableWebcam();
      $(".video-frame").removeClass("blur");

      camButton.innerText = "Hide Cam";
      console.log("show");
    }
  });

  //! MUTE OR UNMUTE MIC
  micButton.addEventListener("click", () => {
    if (micButton.innerText == "Unmute Mic") {
      meeting.unmuteMic();
      micButton.innerText = "Mute Mic";
    } else {
      meeting.muteMic();
      micButton.innerText = "Unmute Mic";
    }
  });
}
