// document.addEventListener("DOMContentLoaded", function () {
const productImg = document.getElementById("productImg");
const container = document.querySelector(".products_one_container");
const productWrap = document.querySelector(".products_one_wrap");
const initialOffset = container.offsetTop;
const initialTranslateY = 216;
const initialTranslateX = 0;
const containerHeight = container.offsetHeight;

const servicesContainer = document.querySelector(".services_container");
const servicesBox = document.getElementById("services_con");
const servicesFocus = document.querySelector(".services_focus");
const aboveFocusText = document.querySelector(".above_focus");
const belowFocusText = document.querySelector(".below_focus");

const logoPathElements = document.querySelectorAll(".logo_focus path");

window.addEventListener("scroll", () => {
  throttledScrollServices();
  throttledScrollProducts();
});

const throttledScrollServices = throttle(scrollServices, 5);
const throttledScrollProducts = throttle(scrollProduct, 5);

function getTranslateY(element) {
  const transform = window
    .getComputedStyle(element)
    .getPropertyValue("transform");
  if (transform && transform !== "none") {
    const translateY = transform.match(/translateY\(([^)]+)\)/);
    if (translateY) {
      return parseFloat(translateY[1]);
    }
  }
  return 0;
}

function scrollServices() {
  const scrollPosition = window.scrollY - 60;
  const translateYFactor = 1.8;
  const scaleFactor = 800;
  const opacityFactor = 500;
  const servicesFocusRadiusFactor = 0.2;
  const innerCircleScaleFactor = 200;
  const currentOffset = servicesContainer.offsetTop;

  if (
    currentOffset <= scrollPosition &&
    currentOffset + 600 >= scrollPosition
  ) {
    const scrollOffset = scrollPosition - currentOffset;

    const translateBlockchainY = Math.min(
      1200,
      scrollOffset * translateYFactor
    ).toFixed(2);
    const scale = (1 - scrollOffset / scaleFactor).toFixed(4);
    let opacity = 1;
    if (scrollOffset > 150)
      opacity = Math.max(0, (opacityFactor - scrollOffset) / opacityFactor);

    let outerRadius = Math.max(
      0,
      50 - scrollOffset * servicesFocusRadiusFactor
    );
    if (scrollOffset < 100) {
      outerRadius = 50;
    }
    const innerCircleScale = Math.max(
      1,
      1 + scrollOffset / innerCircleScaleFactor
    );

    requestAnimationFrame(() => {
      servicesBox.style.transform = `translate(0px, ${translateBlockchainY}px)`;
      servicesBox.style.scale = scale;
      servicesBox.style.opacity = opacity;
      if (opacity === 0) {
        logoPathElements.forEach((pathElement) => {
          pathElement.style.fill = "white";
        });
        servicesContainer.style.boxShadow = "none";
        aboveFocusText.style.display = "block";
        belowFocusText.style.display = "block";
      } else {
        logoPathElements.forEach((pathElement) => {
          pathElement.style.fill = "#1E1E3A";
        });
        servicesContainer.style.boxShadow =
          "0px 0px 0px 0px #ffffff, 0px 0px 0px 1px #f4f4f51a, 0px 0px 0px 0px #00000000";
        aboveFocusText.style.display = "none";
        belowFocusText.style.display = "none";
      }
      servicesFocus.style.scale = innerCircleScale;
      servicesContainer.style.borderRadius = outerRadius + "%";
    });
  }
}

function scrollProduct() {
  const scrollPosition = window.scrollY + 100;
  const scaleFactorIncrement = 0.18;
  const currentOffset = container.offsetTop;
  const imgX = productImg.getBoundingClientRect().left;
  const containerX = productWrap.getBoundingClientRect().left;
  const displayStyle = window
    .getComputedStyle(productImg)
    .getPropertyValue("display");

  if (displayStyle !== "none") {
    if (
      currentOffset <= scrollPosition &&
      currentOffset + 630 >= scrollPosition
    ) {
      const scrollOffset = scrollPosition - currentOffset;
      let translateX = scrollOffset > 218 ? -41 : 0;

      if (currentOffset <= scrollPosition - 218) {
        const imgComputedStyle = window.getComputedStyle(productImg);
        const imgTransform = imgComputedStyle.getPropertyValue("transform");
        const transformMatrix = imgTransform.match(/matrix.*\((.+)\)/);
        if (transformMatrix) {
          const matrixValues = transformMatrix[1].split(",").map(parseFloat);
          translateX = matrixValues[4];
        }
      }

      if (imgX >= containerX && scrollOffset <= 218) {
        translateX = -scrollOffset * scaleFactorIncrement;
      }
      const translateY = initialTranslateY - scrollOffset;
      const newTranslateY = Math.max(-415, translateY);

      requestAnimationFrame(() => {
        productWrap.style.position = "sticky";
        productWrap.style.top = "100px";
        productImg.style.transform = `translate(${translateX}px, ${newTranslateY}px)`;
      });
    }
  }
}

function throttle(func, delay) {
  let lastCall = 0;
  return function (...args) {
    const now = new Date().getTime();
    if (now - lastCall >= delay) {
      func.apply(this, args);
      lastCall = now;
    }
  };
}
