const VIDEOCONTROL = {
  videoInit() {
    const container = document.querySelector(".playerMode");
    const Videocontainer = document.querySelector(".videoWrapper-one");

    container.classList.remove("hidden");

    const videoSrc = "./assets/videos/626a51ca29fb565fd094ed6d.mp4";
    const videoPlayer = document.createElement("video");
    videoPlayer.classList.add("redif-vid");

    //   previewContainer.appendChild(videoPlayer);
    Videocontainer.appendChild(videoPlayer);
    videoPlayer.src = videoSrc;
    videoPlayer.controls = true;
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
