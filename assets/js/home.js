
const bannerSlides = [
    {
        category: "Figurines",
        title: "Bring characters to life.",
        description: "Collect figures, toys and iconic cars.",
        image: "assets/images/image1.png"
    },
    {
        category: "Toys",
        title: "Play more. Imagine more.",
        description: "Build, battle and explore a world of competitive events.",
        image: "assets/images/image3.png"
    },
    {
        category: "Board Games",
        title: "Game night starts here.",
        description: "Gather friends and family for your next tabletop adventure.",
        image: "assets/images/image5.png"
    },
    {
        category: "Diecast Cars",
        title: "Small cars. Big style.",
        description: "Collect classic rides and city vehicles.",
        image: "assets/images/image7.png"
    }
];

let slideNumber = 0;
let slideTimer;


function addZero(number) {
    if (number < 10) {
        return "0" + number;
    }
    return "" + number;
}


function playFade(element) {
    element.classList.remove("fade-effect");
    element.offsetWidth; 
    element.classList.add("fade-effect");
}

function showSlide(index) {
    slideNumber = index;
    const slide = bannerSlides[index];

    document.getElementById("banner-category").textContent = slide.category;
    document.getElementById("banner-title").textContent = slide.title;
    document.getElementById("banner-desc").textContent = slide.description;
    document.getElementById("banner-image").src = slide.image;
    document.getElementById("banner-number").textContent = addZero(index + 1) + " / " + addZero(bannerSlides.length);


    const dots = document.querySelectorAll(".banner-dot");
    for (let i = 0; i < dots.length; i++) {
        dots[i].classList.remove("is-on");
    }
    dots[index].classList.add("is-on");

    playFade(document.getElementById("banner-title"));
    playFade(document.getElementById("banner-desc"));
    playFade(document.querySelector(".banner-frame"));
}

function showNextSlide() {
    let next = slideNumber + 1;

  
    if (next >= bannerSlides.length) {
        next = 0;
    }

    showSlide(next);
}


function startSlideTimer() {
    clearInterval(slideTimer);
    slideTimer = setInterval(showNextSlide, 4000);
}


function clickDot(index) {
    showSlide(index);
    startSlideTimer(); 
}

function makeDots() {
    let html = "";

    for (let i = 0; i < bannerSlides.length; i++) {
        html += '<button class="banner-dot" aria-label="Show ' + bannerSlides[i].category + '" onclick="clickDot(' + i + ')"></button>';
    }

    document.getElementById("banner-dots").innerHTML = html;
}


function countToys(category) {
    let count = 0;

    for (let i = 0; i < allToys.length; i++) {
        if (allToys[i].category === category) {
            count = count + 1;
        }
    }
    return count;
}


function makeItemsText(count) {
    if (count === 1) {
        return count + " item";
    }
    return count + " items";
}

function showCatCounts() {
    document.getElementById("count-figurines").textContent = makeItemsText(countToys("Figurines"));
    document.getElementById("count-toys").textContent = makeItemsText(countToys("Toys"));
    document.getElementById("count-boardgames").textContent = makeItemsText(countToys("Board Games"));
    document.getElementById("count-cars").textContent = makeItemsText(countToys("Diecast Cars"));
}

function showTopPicks() {
    let html = "";
    let howMany = 0;

    for (let i = 0; i < allToys.length; i++) {
        if (allToys[i].featured && howMany < 5) {
            html += makeToyCard(allToys[i], false);
            howMany = howMany + 1;
        }
    }

    document.getElementById("top-picks").innerHTML = html;
    setupFadeUp();
}


// calls

function startHomeToys() {
    showCatCounts();
    showTopPicks();
}

makeDots();
showSlide(0);
startSlideTimer();
loadToys(startHomeToys);
