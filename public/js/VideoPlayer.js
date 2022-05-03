const VIDEOCONTROL = {
  videoInit() {
    const container = document.querySelector(".playerMode");
    const videoContaineOne = document.querySelector(".videoWrapper-one");
    const videoContaineTwo = document.querySelector(".videoWrapper-two");

    container.classList.remove("hidden");

    const videoSrcOne = "./assets/videos/626a51ca29fb565fd094ed6d.mp4";
    const videoSrcTwo = "./assets/videos/626a51ca29fb565fd094ed6d.mp4";

    const videoPlayerOne = document.createElement("video");
    const videoPlayerTwo = document.createElement("video");

    videoPlayerOne.classList.add("redif-vid");
    videoPlayerTwo.classList.add("redif-vid");

    //   previewContainer.appendChild(videoPlayer);
    videoContaineOne.appendChild(videoPlayerOne);
    videoContaineTwo.appendChild(videoPlayerTwo);

    videoPlayerOne.src = videoSrcOne;
    videoPlayerOne.controls = false;

    videoPlayerTwo.src = videoSrcTwo;
    videoPlayerTwo.controls = false;
  },
  videoPlayerControls() {
    var vid = document.querySelector(".redif-vid");
    vid.ontimeupdate = function () {
      var percentage = (vid.currentTime / vid.duration) * 100;
      $("#custom-seekbar span").css("width", percentage + "%");
      console.log(vid.currentTime);
    };

    $("#custom-seekbar").hover(
      function () {
        $(this).find("span").addClass("hover");
      },
      function () {
        $(this).find("span").removeClass("hover");
      }
    );

    var sliderCanMove = false;

    $("#custom-seekbar").on("mousedown", function () {
      sliderCanMove = true;
    });

    $(window).on("mousemove", function (e) {
      if (sliderCanMove) {
        var offset = $("#custom-seekbar").offset();
        var left = e.clientX + offset.left;
        var totalWidth = $("#custom-seekbar").width();
        var percentage = left / totalWidth;
        var vidTime = vid.duration * percentage;
        vid.currentTime = vidTime;
      }
    });

    $(window).on("mouseup", function () {
      sliderCanMove = false;
    });

    $("#custom-seekbar").on("click", function (e) {
      var offset = $(this).offset();
      var left = e.pageX - offset.left;
      var totalWidth = $("#custom-seekbar").width();
      var percentage = left / totalWidth;
      var vidTime = vid.duration * percentage;
      vid.currentTime = vidTime;
      //   console.log(vidTime, totalWidth);
    }); //click()

    let toggle = true;
    // $(".pause").on("click", function (e) {
    //   vid.pause();
    //   //   console.log(vid.duration);
    // });

    // $(".play").on("click", function (e) {
    //   vid.play();
    //   //   vid.currentTime = "3.0";
    // });
    $(".play").on("click", function (e) {
      if (toggle === true) {
        vid.play();
        $(".play").text("Stop");
        toggle = false;
        console.log("Play");
      } else if (toggle === false) {
        vid.pause();
        $(".play").text("Play");
        toggle = true;
      }
    });
  },
};
