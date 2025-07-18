
// Projects section card width handler
function setProjectsCardWidth() {
    const grid = document.querySelector('.projects-grid');
    const cards = grid.querySelectorAll('.project-card');
    const numCards = cards.length;
    const cardWidth = 100 / numCards;

    cards.forEach(card => {
        card.style.width = `${cardWidth}%`;
    });
}

// AutoSlider for Latest work section
function initSlider(){
    /*
    fetch('resources/LatestWorkSlides/slides.json')
    .then(response => response.json())
    .then(slides => {
        const slider = document.querySelector('.slider');
        
        slides.forEach(slide => {
            const slideDiv = document.createElement('div');
            slideDiv.classList.add('slide');

            if(slide.type === 'video'){
                slideDiv.innerHTML = `<video src="resources/LatestWorkSlides/${slide.src} playsinline muted></video>`;
            } else {
                slideDiv.innerHTML = `<img src="resources/LatestWorkSlides/${slide.src}`;
            }

            slider.appendChild(slideDiv);
        });

        autoSlider();
    })
    .catch(error => console.error('Error reading slides: ', error));*/
    const slider = document.querySelector('.slider');
    
    slides_array.forEach(slide => {
        const slideDiv = document.createElement('div');
        slideDiv.classList.add('slide');
        let e;

        if(slide.type === 'video'){
            e = document.createElement('video');
            e.src = `resources/LatestWorkSlides/${slide.src}`;
            e.muted = true;
        } else {
            e = document.createElement('img');
            e.src = `resources/LatestWorkSlides/${slide.src}`;
        }
        slideDiv.appendChild(e);
        slider.appendChild(slideDiv);
    });

    autoSlider();
}

function autoSlider(){
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
}

// Section Scroller
function autoScroller(){
    const mainContainer = document.querySelector('.main-container');
    const sections = Array.from(document.querySelectorAll('.section'));
    let isScrolling = false;

    mainContainer.addEventListener('wheel', (e) => {
    e.preventDefault();
    if (isScrolling) return;

    const delta = e.deltaY;
    const scrollTop = mainContainer.scrollTop;
    const viewportHeight = mainContainer.clientHeight;

    let currentIndex = 0;
    for (let i = 0; i < sections.length; i++) {
        if (scrollTop >= sections[i].offsetTop) {
            currentIndex = i;
        }
    }

    if (delta > 0) {
        // Scroll down
        if (currentIndex < sections.length - 1) {
            isScrolling = true;
            const nextTop = sections[currentIndex + 1].offsetTop;
            mainContainer.scrollTo({ top: nextTop, behavior: 'smooth' });
            setTimeout(() => { isScrolling = false; }, 700);
        }
    } else {
        // Scroll up
        if (currentIndex > 0) {
            isScrolling = true;
            const prevTop = sections[currentIndex - 1].offsetTop;
            mainContainer.scrollTo({ top: prevTop, behavior: 'smooth' });
            setTimeout(() => { isScrolling = false; }, 700);
        }
    }
    });
}

//About section Carrousel 
function startAboutMeCarrousel(){
    const carrousel_items = document.querySelectorAll(".carousel-item");
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let carrouselIndex = 0;
    let animation = 'none';

    function updateCarrousel(animation){
        carrousel_items.forEach((item, i) =>{
            item.classList.toggle('active', i === carrouselIndex);
            if(i === carrouselIndex){
                animateCSSHTMLElement(item,animation);
            }
        });

        prevBtn.classList.toggle('hidden', carrouselIndex === 0);
        nextBtn.classList.toggle('hidden', carrouselIndex === carrousel_items.length-1);
    }

    prevBtn.addEventListener("click", () => {
        if(carrouselIndex > 0){
            animation = 'fadeInLeft';
            carrouselIndex --;
            updateCarrousel(animation);
        }
    });

    nextBtn.addEventListener("click", () => {
        if(carrouselIndex < carrousel_items.length - 1){
            animation = 'fadeInRight';
            carrouselIndex ++;
            updateCarrousel(animation);
        }
    });

    updateCarrousel(animation);
}

// Calling functions

// Sections autoscroller
autoScroller();

// Projects Section - Cards Width
setProjectsCardWidth();
window.addEventListener('resize', setProjectsCardWidth);
/*
document.addEventListener('DOMContentLoaded', () => {
    setProjectsCardWidth();
});*/

// Latest work Section - auto slider
initSlider();
//autoSlider();

// About Me section - Start carrousel
startAboutMeCarrousel();



