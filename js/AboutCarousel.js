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

