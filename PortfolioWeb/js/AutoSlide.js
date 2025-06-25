const slides = document.querySelectorAll(".slide");
const dotsContainer = document.getElementById("slider-dots");

let current = 0;
let autoSlideTimeOut = null;
let isTransitioning = false;

slides.forEach((sld,i)=>{
    const dot = document.createElement("div");
    dot.classList.add("dot");
    if(i === current) dot.classList.add("active");

    dot.addEventListener("click",(e)=>{
        e.stopPropagation();
        if(isTransitioning) return;
        clearTimeout(autoSlideTimeOut);
        current = i;
        showSlide(current);
    });

    dotsContainer.appendChild(dot);
});

const dots = dotsContainer.querySelectorAll(".dot");

function updateDots(index){
    dots.forEach((dot,i)=>{
        dot.classList.toggle("active", i === index);
    });
}

function nextSlide() {
    clearTimeout(autoSlideTimeOut);
    autoSlideTimeOut = setTimeout(()=>{
        current = ((current + 1 ) % slides.length);
        console.log(isTransitioning);
        showSlide(current);
    }, 5000);
}

function showSlide(index) {
    if(isTransitioning) return;
    isTransitioning = true;
    clearTimeout(autoSlideTimeOut);
    
    slides.forEach((slide, i) => {
        slide.classList.remove("visible");
        const video = slide.querySelector("video");
        if (video) {
            video.pause();
            video.currentTime = 0;
            video.onended = null;
        }
    });

    const currentSlide = slides[index];
    currentSlide.classList.add("visible");
    updateDots(index);

    const video = currentSlide.querySelector("video");
    if (video) {
        video.muted = true;
        video.playsInline = true;
        video.play().then(() => {
            video.onended = () => {
                clearTimeout(autoSlideTimeOut);
                current = (current + 1) % slides.length;
                showSlide(current);
            };
            isTransitioning = false;
        }).catch(() => {
            // Go autoslide if error playing video
            nextSlide();
            isTransitioning = false;
        });
    } else {
        nextSlide();
        isTransitioning = false;
    }
}

showSlide(current);