const items = document.querySelectorAll(".carousel-item");
let carrouselIndex = 0;

document.getElementById("prevBtn").addEventListener("click", () => {
  items[carrouselIndex].classList.remove("active");
  carrouselIndex = (carrouselIndex - 1 + items.length) % items.length;
  items[carrouselIndex].classList.add("active");
});

document.getElementById("nextBtn").addEventListener("click", () => {
  items[carrouselIndex].classList.remove("active");
  carrouselIndex = (carrouselIndex + 1) % items.length;
  items[carrouselIndex].classList.add("active");
});

// Swipe animation
const observer = new IntersectionObserver((entries) => {
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

observer.observe(document.getElementById("aboutme"));