const mainContainer = document.querySelector('.main-container');
const sections = Array.from(document.querySelectorAll('.section'));
let isScrolling = false;

mainContainer.addEventListener('wheel', (e) => {
  e.preventDefault();
  if (isScrolling) return;

  const delta = e.deltaY;
  const scrollTop = mainContainer.scrollTop;
  const viewportHeight = mainContainer.clientHeight;

  // Encontrar índice actual basado en scrollTop
  let currentIndex = 0;
  for (let i = 0; i < sections.length; i++) {
    if (scrollTop >= sections[i].offsetTop) {
      currentIndex = i;
    }
  }

  if (delta > 0) {
    // Scroll down: ir a siguiente sección
    if (currentIndex < sections.length - 1) {
      isScrolling = true;
      const nextTop = sections[currentIndex + 1].offsetTop;
      mainContainer.scrollTo({ top: nextTop, behavior: 'smooth' });
      setTimeout(() => { isScrolling = false; }, 700);
    }
  } else {
    // Scroll up: ir a anterior sección
    if (currentIndex > 0) {
      isScrolling = true;
      const prevTop = sections[currentIndex - 1].offsetTop;
      mainContainer.scrollTo({ top: prevTop, behavior: 'smooth' });
      setTimeout(() => { isScrolling = false; }, 700);
    }
  }
});