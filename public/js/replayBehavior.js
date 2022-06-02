let zCounter = 9000;

let bool = true;
let toggle = true;

function imageBehavior() {
  let imageReplay = document.querySelector(".imageStyle");

  imageReplay.addEventListener("mouseenter", function (event) {
    // imageReplay.style.opacity = "0";
  });
  imageReplay.addEventListener("mouseleave", function (event) {
    // imageReplay.style.opacity = "1";
  });
  console.log("imageBheavior");
}
function disabled() {
  $(".cross").on("click", function (e) {
    console.log("click");
    $(this).siblings().remove();
    $(this).parent().remove();
  });
  // console.log("disabled");
}
function onHover() {
  $(".imageStyle").hover(
    function () {
      $(this).css("cursor", "pointer");
      $(this).find(".cross").css("opacity", "1");
      $(this).find(".info").css("opacity", "1");
      $(this).find(".grow").css("opacity", "1");
    },
    function () {
      console.log("mouseout");
      $(this).find(".cross").css("opacity", "0");
      $(this).find(".info").css("opacity", "0");
      $(this).find(".grow").css("opacity", "0");
    }
  );
}

function assetsCliked() {
  $(".imageStyle").on("click", function (e) {
    zCounter++;
    // console.log("click");
    $(this).css("z-index", "" + zCounter + "");
  });
}
function growAssets() {
  $(".grow").on("click", function (e) {
    if (bool === true) {
      // $(this).parent().css("width", "100%");
      // $(this).parent().css("top", "0%");
      // $(this).parent().css("left", "0%");
      let src = $(this).prevAll("img").first().attr("src");
      console.log(src);
      let fullImageWrapper = document.createElement("div");
      let fullImage = document.createElement("img");

      fullImage.src = src;
      fullImageWrapper.classList.add("fullImageWrapper");
      fullImageWrapper.appendChild(fullImage);
      previewContainer.appendChild(fullImageWrapper);
      removeGrowAssets();
      console.log("SHOTS");
      bool = false;
    }
    setTimeout(() => {
      bool = true;
    }, 50);
  });
}
function removeGrowAssets() {
  $(".fullImageWrapper").on("click", function (e) {
    $(this).remove();
  });
}
function showText() {
  if (bool === true) {
    // if (toggle === true) {
    //   $(".info").on("click", function (e) {
    //     console.log("clicktrue");
    //     let img = $(this).prevAll("img").first();
    //     $(img).css("opacity", "0");
    //     setTimeout(() => {
    //       toggle = false;
    //     }, 50);

    //     console.log(toggle);
    //   });
    // }
    // if (toggle === false) {
    //   $(".info").on("click", function (e) {
    //     console.log("clickfalse");

    //     let img = $(this).prevAll("img").first();
    //     $(img).css("opacity", "1");
    //     setTimeout(() => {
    //       toggle = true;
    //     }, 50);

    //     console.log(toggle);
    //   });
    // }
    $(".info").on("click", function (e) {
      console.log("clicktrue");
      let img = $(this).prevAll("img").first();
      $(img).toggleClass("disabled-opa");
      $(this).parent().find(".infoTextWrap").toggleClass("enabled-opa");

      console.log(toggle);
    });
    bool = false;
  }
  setTimeout(() => {
    bool = true;
  }, 50);
}
