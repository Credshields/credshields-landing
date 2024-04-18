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
