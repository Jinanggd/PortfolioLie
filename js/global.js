// OBJECT FOR SLIDES, maybe in the future do it in backend
const slides_array = 
[
    { "type": "video", "src": "01.mp4" },
    { "type": "video", "src": "02.mp4" },
    { "type": "video", "src": "03.mp4" },
    { "type": "video", "src": "04.mp4" },
    { "type": "image", "src": "05.png" },
    { "type": "image", "src": "06.jpg" },
    { "type": "image", "src": "07.jpg" }
]

// Animate.css controller
// HOW TO USE
// animateCSS('.my-element', 'bounce');

// or
//animateCSS('.my-element', 'bounce').then((message) => {
  // Do something after the animation
//});
const animateCSS = (element, animation, prefix = 'animate__') =>
  // We create a Promise and return it
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    const node = document.querySelector(element);

    node.classList.add(`${prefix}animated`, animationName);

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event) {
        event.stopPropagation();
        node.classList.remove(`${prefix}animated`, animationName);
        resolve('Animation ended');
    }

    node.addEventListener('animationend', handleAnimationEnd, {once: true});
    });

// Animation controller if enter a HTML node    
const animateCSSHTMLElement = (node, animation, prefix = 'animate__') =>
    new Promise((resolve, reject) => {
        const animationName = `${prefix}${animation}`;
        node.classList.add(`${prefix}animated`,animationName);

        // When the animation ends, we clean the classes and resolve the Promise
        function handleAnimationEnd(event) {
            event.stopPropagation();
            node.classList.remove(`${prefix}animated`, animationName);
            resolve('Animation ended');
        }

        node.addEventListener('animationend', handleAnimationEnd, {once:true});
    });