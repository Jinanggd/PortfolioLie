// Swipe animation for about me animation fadeInLeft
function onEntryAboutMeAnimation(){
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const content = document.querySelector(".about-container");

            if (entry.isIntersecting) {
                animateCSS('.about-container','fadeInLeftBig');
            } 
        });
    }, { threshold: 0.3 });
    observer.observe(document.getElementById("aboutme"));
}

// Swipe animation for projects cards
function onEntryProjectsAnimation() {
    // const project = document.getElementById('projects');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const cards = document.querySelectorAll('.project-card');
                cards.forEach((card, i) => {
                    //disable hover first
                    card.classList.add('disable-hover');

                    //Card animation itself
                    const direction = i % 2 === 0 ? 'fadeInUpBig' : 'fadeInDownBig';
                    animateCSSHTMLElement(card, direction).then((m) => {
                        card.classList.remove('disable-hover');
                    });
                });
            }
        });
    }, { threshold: 0.3 });

    observer.observe(document.getElementById('projects'));
}

// Add the animations once DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    onEntryAboutMeAnimation();
    onEntryProjectsAnimation();
});