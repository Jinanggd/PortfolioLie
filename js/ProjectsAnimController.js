function setProjectsCardWidth() {
    const grid = document.querySelector('.projects-grid');
    console.log(grid);
    const cards = grid.querySelectorAll('.project-card');
    const numCards = cards.length;
    const cardWidth = 100 / numCards;

    cards.forEach(card => {
        card.style.width = `${cardWidth}%`;
    });
}

function onEntryProjectsAnimation() {
    const project = document.getElementById('projects');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const cards = document.querySelectorAll('.project-card');
                cards.forEach((card, i) => {
                    // Reset animation
                    card.classList.remove('slide-from-top', 'slide-from-bottom', 'animate-in');
                    

                    const direction = i % 2 === 0 ? 'slide-from-bottom' : 'slide-from-top';
                    card.classList.add(direction);

                    void card.offsetWidth;

                    // Delay por orden
                    setTimeout(() => {
                        card.classList.add('animate-in');
                    }, 100 * i);
                });
            }
        });
    }, {
        threshold: 0.6
    });

    observer.observe(project);
}

document.addEventListener('DOMContentLoaded', () => {
    setProjectsCardWidth();
    onEntryProjectsAnimation();
});

window.addEventListener('resize', setProjectsCardWidth);