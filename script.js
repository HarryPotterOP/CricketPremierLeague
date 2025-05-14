const scroll = new LocomotiveScroll({
  el: document.querySelector('#main'),
  smooth: true
});

function loaderAnimation() {
  const loader = document.querySelector("#loader");
  setTimeout(function () {
    loader.style.top = "-100%";
  }, 4200);
}

loaderAnimation();

const elems = document.querySelectorAll(".elem");
const fixedImage = document.querySelector("#fixed-image");

elems.forEach(function (elem) {
  elem.addEventListener("mouseenter", function () {
    const imageUrl = elem.dataset.image;
    fixedImage.style.backgroundImage = `url(${imageUrl})`;
    fixedImage.style.display = "block";
  });

  elem.addEventListener("mouseleave", function () {
    fixedImage.style.display = "none";
  });
});
