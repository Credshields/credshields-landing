function formatNumber(number, addPlus = false) {
  let formattedNumber;
  if (number >= 1000000000) {
    formattedNumber =
      (number / 1000000000).toFixed(1).replace(/\.0$/, "") + "B";
  } else if (number >= 1000000) {
    formattedNumber = (number / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
  } else if (number >= 1000) {
    formattedNumber = (number / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  } else {
    formattedNumber = number.toString();
  }

  if (addPlus && formattedNumber !== "0") {
    formattedNumber += "+";
  }

  return formattedNumber;
}

function animateValueWhenInView(element, start, end, duration, addPlus) {
  let range = end - start;
  let current = start;
  let startTime = performance.now();
  let steps = 15;
  let stepDuration = duration / steps;
  let stepSize = range / steps;
  let animationFrame;

  function update(timestamp) {
    let elapsedTime = timestamp - startTime;
    let currentStep = Math.floor(elapsedTime / stepDuration);
    if (currentStep >= steps) {
      current = end;
      element.textContent = formatNumber(Math.round(current), addPlus);
      cancelAnimationFrame(animationFrame);
      return;
    }
    current = Math.max(Math.min(start + currentStep * stepSize, end), start); // Ensure current value stays within the range
    element.textContent = formatNumber(Math.round(current), addPlus);
    animationFrame = requestAnimationFrame(update);
  }

  animationFrame = requestAnimationFrame(update);
}

function startAnimationWhenInView() {
  let elements = document.querySelectorAll(".animate-number");

  let observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        let start = 0;
        let end = parseInt(entry.target.getAttribute("data-end"));
        let addPlus = entry.target.getAttribute("show-plus") === "true";
        let duration = 800 + (index + 1) * 100;
        animateValueWhenInView(entry.target, start, end, duration, addPlus);
        observer.unobserve(entry.target);
      }
    });
  });

  elements.forEach((element) => {
    observer.observe(element);
  });
}

startAnimationWhenInView();
