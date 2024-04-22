$(document).ready(function () {
  const $carousel = $(".carousel");

  $carousel.slick({
    centerMode: true,
    centerPadding: "60px",
    slidesToShow: 3,
    infinite: false,
    arrows: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: "40px",
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: "40px",
          slidesToShow: 1,
        },
      },
    ],
  });

  // Set initial slides to be 2, 3, and 4
  $carousel.slick("slickGoTo", 2);

  // Click handlers for custom next and previous buttons
  $(".prev-btn").click(function () {
    $carousel.slick("slickPrev");
  });

  $(".next-btn").click(function () {
    $carousel.slick("slickNext");
  });
});

const serviceWrap = document.getElementById("blockchain_security");
const gradient = document.getElementById("gradient");

serviceWrap.addEventListener("mousemove", (e) => {
  const rect = serviceWrap.getBoundingClientRect();
  const x = ((e.clientX - rect.left) / rect.width) * 100; // Calculate x position relative to container width
  const y = ((e.clientY - rect.top) / rect.height) * 100; // Calculate y position relative to container height
  const gradientStyle = `radial-gradient(circle at ${x}% ${y}%, #ff0000, #00ff00, #0000ff, #ff0000)`;
  gradient.style.background = gradientStyle;
});

serviceWrap.addEventListener("mouseenter", () => {
  gradient.style.opacity = "1"; // Show the gradient when mouse enters the container
});

serviceWrap.addEventListener("mouseleave", () => {
  gradient.style.opacity = "0"; // Hide the gradient when mouse leaves the container
});
