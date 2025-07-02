// Swipe animation for about me animation fadeInLeft
function onEntryAboutMeAnimation(){
    // console.log("We are animating About Me Section");
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const content = document.querySelector(".about-container");

            if (entry.isIntersecting) {
                // console.log("We are adding animation to about-container");
                animateCSS('.about-container','fadeInLeftBig');
            } 
        });
    }, { threshold: 0.3 });
    observer.observe(document.getElementById("aboutme"));
}

// Swipe animation for projects cards
function onEntryProjectsAnimation() {
    // const project = document.getElementById('projects');
    console.log("Adding animation for Projects Section");
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                console.log("We are intersecting");
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