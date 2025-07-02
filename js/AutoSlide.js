const slides = document.querySelectorAll(".slide");
const slides_dotsContainer = document.getElementById("slider-dots");

let slides_CurrentIndex = 0;
let autoSlideTimeOut = null;
let isTransitioning = false;

slides.forEach((sld,i)=>{
    const dot = document.createElement("div");
    dot.classList.add("dot");
    if(i === slides_CurrentIndex) dot.classList.add("active");

    dot.addEventListener("click",(e)=>{
        e.stopPropagation();
        if(isTransitioning) return;
        clearTimeout(autoSlideTimeOut);
        slides_CurrentIndex = i;
        showSlide(slides_CurrentIndex);
    });

    slides_dotsContainer.appendChild(dot);
});

const dots = slides_dotsContainer.querySelectorAll(".dot");

function updateDots(index){
    dots.forEach((dot,i)=>{
        dot.classList.toggle("active", i === index);
    });
}

function nextSlide() {
    clearTimeout(autoSlideTimeOut);
    autoSlideTimeOut = setTimeout(()=>{
        slides_CurrentIndex = ((slides_CurrentIndex + 1 ) % slides.length);
        showSlide(slides_CurrentIndex);
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
                slides_CurrentIndex = (slides_CurrentIndex + 1) % slides.length;
                showSlide(slides_CurrentIndex);
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

showSlide(slides_CurrentIndex);