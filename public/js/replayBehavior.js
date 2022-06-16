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
    // $(this).siblings().remove();
    // $(this).parent().remove();
    // $(this).siblings().css("opacity", "0");
    $(this).parent().css("opacity", "0");

    setTimeout(() => {
      $(this).parent().css("display", "none");
    }, 500);
  });
  // console.log("disabled");
}

function reEnabled() {
  const imgNumber = document.querySelectorAll("[number]");
  imgNumber.forEach((img) => {
    img.addEventListener("click", () => {
      console.log(img.getAttribute("number"));
      let number = img.getAttribute("number");
      setTimeout(() => {
        $(`${".imageBlock" + number}`).css("display", "block");
      }, 500);
      $(`${".imageBlock" + number}`).css("opacity", "1");
    });
    // img.addEventListener("mouseenter", () => {
    //   console.log(img.getAttribute("number"));
    //   let number = img.getAttribute("number");
    //   $(`${".desc" + number}`).css("opacity", "1");
    // });
    // img.addEventListener("mouseleave", () => {
    //   console.log(img.getAttribute("number"));
    //   let number = img.getAttribute("number");
    //   $(`${".desc" + number}`).css("opacity", "0");
    // });
  });
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
      // console.log("mouseout");
      $(this).find(".cross").css("opacity", "0");
      $(this).find(".info").css("opacity", "0");
      $(this).find(".grow").css("opacity", "0");
    }
  );
}
function onHoverPublic() {
  $(".imageBlockWrapper").hover(
    function () {
      $(this).find(".grow-p").css("opacity", "1");
    },
    function () {
      $(this).find(".grow-p").css("opacity", "0");
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
      let fullImageDesc = document.createElement("span");
      fullImageDesc.textContent =
        "Ceci est un texte de description d'une possible références, 1972";
      fullImageDesc.classList.add("fullImageDesc");
      fullImage.src = src;
      fullImageWrapper.classList.add("fullImageWrapper");
      fullImageWrapper.appendChild(fullImage);
      fullImageWrapper.appendChild(fullImageDesc);

      document.body.appendChild(fullImageWrapper);
      removeGrowAssets();
      console.log("SHOTS");
      bool = false;
    }
    setTimeout(() => {
      bool = true;
    }, 50);
  });
}
function growAssetsPublic() {
  $(".grow-p").on("click", function (e) {
    if (bool === true) {
      // $(this).parent().css("width", "100%");
      // $(this).parent().css("top", "0%");
      // $(this).parent().css("left", "0%");
      let src = $(this).prevAll("img").first().attr("src");
      console.log(src);
      let fullImageWrapper = document.createElement("div");
      let fullImage = document.createElement("img");
      let fullImageDesc = document.createElement("span");

      // console.log($(this).find(".public-assets-desc").val());l
      let captions = $(this).prevAll("span").first().text();
      console.log(captions);

      fullImageDesc.textContent = captions;

      fullImageDesc.classList.add("fullImageDesc");
      fullImageDesc.style.color = "black";
      fullImage.src = src;
      fullImageWrapper.classList.add("fullImageWrapper");
      fullImageWrapper.appendChild(fullImage);
      fullImageWrapper.appendChild(fullImageDesc);

      document.body.appendChild(fullImageWrapper);
      removeGrowAssets();
      console.log("SHOTS");
      bool = false;
    }
    setTimeout(() => {
      bool = true;
    }, 50);
  });
}
function growAssetsPublicVid() {
  $(".grow-p").on("click", function (e) {
    if (bool === true) {
      // $(this).parent().css("width", "100%");
      // $(this).parent().css("top", "0%");
      // $(this).parent().css("left", "0%");
      let src = $(this).prevAll("video").first().attr("src");
      console.log(src);
      let fullVidWrapper = document.createElement("div");
      let fullVid = document.createElement("video");
      let fullImageDesc = document.createElement("span");

      fullVid.autoplay = true;
      fullVid.loop = true;
      let captions = $(this).prevAll("span").first().text();
      console.log(captions);

      fullImageDesc.textContent = captions;

      fullImageDesc.classList.add("fullImageDesc");
      fullImageDesc.style.color = "black";
      fullVid.src = src;
      fullVidWrapper.classList.add("fullImageWrapper-vid");
      fullVidWrapper.appendChild(fullVid);
      fullVidWrapper.appendChild(fullImageDesc);

      document.body.appendChild(fullVidWrapper);
      removeGrowAssetsPublic();
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

function removeGrowAssetsPublic() {
  $(".fullImageWrapper-vid").on("click", function (e) {
    console.log("fullViDclique");
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
let comIn = document.querySelector(".comment-interface");

function comInterface() {
  comIn.classList.toggle("enabled-flex");
}

function hideInterface() {
  comIn.classList.toggle("enabled-flex");
}

$(".name-lecture").on("mouseenter", function (e) {
  $(this).text("Back");
});
$(".name-lecture").on("mouseleave", function (e) {
  $(this).text("Hugo Jauffret");
});
$(".name-project").on("mouseenter", function (e) {
  $(this).text("Next");
});
$(".name-project").on("mouseleave", function (e) {
  $(this).text("Archipelago");
});

let togSubtitle = document.querySelector(".toggle-subtitle");
let subtitles = document.querySelector(".sub-titles-wrapper");

let subOn = true;
console.log();

togSubtitle.addEventListener("click", function (event) {
  if (togSubtitle.textContent === "Subtitle off") {
    subtitles.style.display = "none";
    console.log("off");
    togSubtitle.textContent = "Subtitle on";
  } else if (togSubtitle.textContent === "Subtitle on") {
    console.log("on");
    subtitles.style.display = "flex";
    togSubtitle.textContent = "Subtitle off";
  }
});
