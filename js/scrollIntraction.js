// document.addEventListener("DOMContentLoaded", function () {
const productImg = document.getElementById("productImg");
const container = document.querySelector(".products_one_container");
const productWrap = document.querySelector(".products_one_wrap");
const initialOffset = container.offsetTop;
const initialTranslateY = 216;
const initialTranslateX = 0;
const containerHeight = container.offsetHeight;

const servicesContainer = document.querySelector(".services_container");
// const blockchainSecurity = document.getElementById("blockchain_security");
// const smart_Contract = document.getElementById("smart_contract");
// const mobileApp = document.getElementById("mobile_app");
// const bugBounty = document.getElementById("bug_bounty");
// const webApp = document.getElementById("web_app");
// const externalNetwork = document.getElementById("external_network");
const servicesBox = document.getElementById("services_con");
const servicesFocus = document.querySelector(".services_focus");
const logoPathElements = document.querySelectorAll(".logo_focus path");

window.addEventListener("scroll", () => {
  scrollProduct();
  scrollServices();
});
// });

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
  const currentOffset = servicesContainer.offsetTop;

  if (
    currentOffset <= scrollPosition &&
    currentOffset + 600 >= scrollPosition
  ) {
    const scrollOffset = scrollPosition - currentOffset;

    const translateBlockchainY = Math.min(
      1200,
      scrollOffset * translateYFactor
    );
    const scale = 1 - scrollOffset / scaleFactor;
    let opacity = 1;
    if (scrollOffset > 150)
      opacity = Math.max(0, (opacityFactor - scrollOffset) / opacityFactor);

    const outerRadius = Math.max(
      0,
      50 - scrollOffset * servicesFocusRadiusFactor
    );
    const innerRadius = Math.max(
      4,
      50 - scrollOffset * servicesFocusRadiusFactor
    );

    servicesBox.style.transform = `translate(0px, ${translateBlockchainY}px)`;
    servicesBox.style.scale = scale;
    servicesBox.style.opacity = opacity;
    if (opacity === 0) {
      logoPathElements.forEach((pathElement) => {
        pathElement.style.fill = "white";
      });
      servicesContainer.style.boxShadow = "none";
    } else {
      logoPathElements.forEach((pathElement) => {
        pathElement.style.fill = "#1E1E3A";
      });
      servicesContainer.style.boxShadow =
        "0px 0px 0px 0px #ffffff, 0px 0px 0px 1px #f4f4f51a, 0px 0px 0px 0px #00000000";
    }
    servicesFocus.style.borderRadius = innerRadius + "%";
    servicesContainer.style.borderRadius = outerRadius + "%";
  }
}

function scrollProduct() {
  const scrollPosition = window.scrollY + 100;
  const scaleFactorIncrement = 0.12;
  const currentOffset = container.offsetTop;
  const imgX = productImg.getBoundingClientRect().left;
  const containerX = productWrap.getBoundingClientRect().left;
  if (
    currentOffset <= scrollPosition &&
    currentOffset + 800 >= scrollPosition
  ) {
    const scrollOffset = scrollPosition - currentOffset;
    console.log(scrollOffset);
    let translateX = 0;
    if (currentOffset <= scrollPosition - 325) {
      const imgComputedStyle = window.getComputedStyle(productImg);
      const imgTransform = imgComputedStyle.getPropertyValue("transform");
      const transformMatrix = imgTransform.match(/matrix.*\((.+)\)/);
      if (transformMatrix) {
        const matrixValues = transformMatrix[1].split(",").map(parseFloat);
        translateX = matrixValues[4];
      }
    }

    if (imgX >= containerX) {
      translateX = -scrollOffset * scaleFactorIncrement;
    }
    const translateY = initialTranslateY - scrollOffset;
    const newContainerHeight = containerHeight + scrollOffset;

    container.style.height = newContainerHeight + "px";
    productWrap.style.transform = `translate(0px, ${scrollOffset}px)`;

    const newTranslateY = Math.max(-415, translateY);
    productImg.style.transform = `translate(${translateX}px, ${newTranslateY}px)`;
  }
}
