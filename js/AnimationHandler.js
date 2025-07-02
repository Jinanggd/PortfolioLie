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
                    const direction = i % 2 === 0 ? 'fadeInUpBig' : 'fadeInDownBig';
                    animateCSSHTMLElement(card, direction);
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