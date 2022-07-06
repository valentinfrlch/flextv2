var scaling = 1.50;
//count
var currentSliderCount = 0;
var videoCount = 5//$(".slider-container").children().length;
var showCount = 4;
var sliderCount = videoCount / showCount;
var controlsWidth = 40;
var scollWidth = 0;


// elements
var win = $(window);
var sliderFrame = $(".slider");
var sliderContainer = $(".slider-container");
var slide = $(".slider-card");

//counts
var scollWidth = 0;

var windowWidth = win.width();
console.log(windowWidth);
var frameWidth = win.width() - 80;
if (windowWidth >= 0 && windowWidth <= 414) {
    showCount = 2;
} else if (windowWidth >= 414 && windowWidth <= 768) {
    showCount = 3;
} else {
    showCount = 4;
}
console.log(showCount)
var videoWidth = ((windowWidth - controlsWidth * 2) / showCount);
var videoHeight = Math.round(videoWidth / (16 / 9));
console.log(videoHeight)

var videoWidthDiff = (videoWidth * scaling) - videoWidth;
var videoHeightDiff = (videoHeight * scaling) - videoHeight;




window.addEventListener('load', function () {
    init()
    populate()
    lazyLoad()
})


function populate() {
    // get all divs with class "slider"
    var sliders = document.getElementsByClassName("slider-container");
    //for sliders
    for (var i = 0; i < sliders.length; i++) {
        var slider = sliders[i];
        // get the h3 element from the slider
        //var context = slider.getElementsByTagName("h3")[0].textContent;
        // do 10 times
        for (var j = 0; j < 10; j++) {
            slider.appendChild(sliderPoulate(j));
        }
    }



    function sliderPoulate(id) {
        //create a card in the slider
        var card = document.createElement("div");
        card.id = "slider-card-" + id;
        card.className = "slider-card";
        //add a picture to the card
        var image = document.createElement("img");
        image.src = "https://image.tmdb.org/t/p/w300/d7Id9xnYNGAXl84Nt4WiYfcF4zj.jpg";
        image.id = "slider-image";
        card.appendChild(image);
        //size
        card.style.height = videoHeight;
        card.style.width = videoWidth;
        // add the card to the slider
        card.addEventListener("mouseenter", function () {
            // get the id of the card
            var id = this.id;
            console.log(id, "clicked");
        });

        return card
    }
}

function lazyLoad() {
    function addEventListeners() {
        document.getElementById("playbutton").addEventListener("click", function () {
            console.log("button clicked");
        });
    }
    function ripples() {
        mdc.ripple.MDCRipple.attachTo(document.querySelector('#playbutton'));
    }
    addEventListeners()
    ripples()
}






$(window).resize(function () {
    init();
});
function init() {
    //set sizes
    sliderFrame.width(windowWidth);
    sliderFrame.height(videoHeight * scaling);


    //sliderFrame.css("top", (videoHeightDiff / 2));

    sliderContainer.height(videoHeight * scaling);
    sliderContainer.width((videoWidth * videoCount) + videoWidthDiff);
    sliderContainer.css("top", (videoHeightDiff / 2));
    sliderContainer.css("margin-left", (controlsWidth));

    //hover effect
    $(".slide").mouseover(function () {
        $(this).css("width", videoWidth * scaling);
        $(this).css("height", videoHeight * scaling);
        $(this).css("top", -(videoHeightDiff / 2));
        if ($(".slider-card").index($(this)) == 0 || ($(".slider-card").index($(this))) % 4 == 0) {
            // do nothing
        }
        else if (($(".slider-card").index($(this)) + 1) % 4 == 0 && $(".slider-card").index($(this)) != 0) {
            $(this).parent().css("margin-left", -(videoWidthDiff - controlsWidth));
        }
        else {
            $(this).parent().css("margin-left", - (videoWidthDiff / 2));
        }
    }).mouseout(function () {
        $(this).css("width", videoWidth * 1);
        $(this).css("height", videoHeight * 1);
        $(this).css("top", 0);
        $(this).parent().css("margin-left", controlsWidth);
    });

    // controls
    controls(frameWidth, scollWidth);
}
function controls(frameWidth, scollWidth) {
    var prev = $(".previous");
    var next = $(".next");

    next.on("click", function () {
        console.log(currentSliderCount);
        console.log(sliderCount);
        scollWidth = scollWidth + frameWidth;
        $('.slider-container').animate({
            left: - scollWidth
        }, 300, function () {
            if (currentSliderCount >= sliderCount - 1) {
                $(".slider-container").css("left", 0);
                currentSliderCount = 0;
                scollWidth = 0;
            } else {
                currentSliderCount++;
            }
        });
    });
    prev.on("click", function () {
        scollWidth = scollWidth - frameWidth;
        $('.slider-container').animate({
            left: + scollWidth
        }, 300, function () {
            currentSliderCount--;
        });
        //$(".slider-container").css("left", scollWidth);
    });
};