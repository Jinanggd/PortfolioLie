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

document.addEventListener('DOMContentLoaded', () => {
    setProjectsCardWidth();
});

window.addEventListener('resize', setProjectsCardWidth);