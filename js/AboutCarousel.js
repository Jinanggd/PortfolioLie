const carrousel_items = document.querySelectorAll(".carousel-item");
let carrouselIndex = 0;

document.getElementById("prevBtn").addEventListener("click", () => {
  carrousel_items[carrouselIndex].classList.remove("active");
  carrouselIndex = (carrouselIndex - 1 + carrousel_items.length) % carrousel_items.length;
  carrousel_items[carrouselIndex].classList.add("active");
});

document.getElementById("nextBtn").addEventListener("click", () => {
  carrousel_items[carrouselIndex].classList.remove("active");
  carrouselIndex = (carrouselIndex + 1) % carrousel_items.length;
  carrousel_items[carrouselIndex].classList.add("active");
});

// Swipe animation
const observer_SwipeAnimation = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const img = document.querySelector(".about-image");
    const content = document.querySelector(".about-content");

    if (entry.isIntersecting) {
      img.classList.add("expand");
      content.classList.add("expand");
    } else {
      img.classList.remove("expand");
      content.classList.remove("expand");
    }
  });
}, { threshold: 0.3 });

observer_SwipeAnimation.observe(document.getElementById("aboutme"));