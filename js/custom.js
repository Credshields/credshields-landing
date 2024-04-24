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

const serviceWraps = document.querySelectorAll(".service_wrap");
serviceWraps.forEach((serviceWrap) => {
  serviceWrap.addEventListener("mousemove", (e) => {
    const rect = serviceWrap.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    const gradientStyle = `radial-gradient(circle at ${x}% ${y}%, #ACF0C6, #174AFF, #18181b80, #18181b80, #18181b80)`;
    const gradient = serviceWrap.querySelector(".gradient");
    gradient.style.background = gradientStyle;
  });

  serviceWrap.addEventListener("mouseenter", () => {
    const gradient = serviceWrap.querySelector(".gradient");
    gradient.style.opacity = "20%";
    serviceWrap.style.scale = 1.05;
  });

  serviceWrap.addEventListener("mouseleave", () => {
    const gradient = serviceWrap.querySelector(".gradient");
    gradient.style.opacity = "0";
    serviceWrap.style.scale = 1;
  });
});

function setActiveServiceTab(hash) {
  var tab = document.querySelector(hash);
  if (tab) {
    var tabs = document.querySelectorAll(".service_tab");
    tabs.forEach(function (tab) {
      tab.classList.remove("service_active");
    });
    tab.classList.add("service_active");
  }
}

window.onload = function () {
  const servicePageMap = {
    "web-app-security.html": "#web_sec",
    "blockchain-security.html": "#blockchain_sec",
    "bug-bounty-management.html": "#bug_sec",
    "smart-contract-audit.html": "#sc_sec",
    "mobile-app-security.html": "#mobile_sec",
    "external-network-testing.html": "#ext_net_sec",
  };
  let urlString = window.location.pathname;
  let filename = urlString.substring(urlString.lastIndexOf("/") + 1);
  const hash = servicePageMap[filename];
  if (hash) setActiveServiceTab(hash);
};

// window.onhashchange = function () {
//   setActiveServiceTab(window.location.hash);
// };
