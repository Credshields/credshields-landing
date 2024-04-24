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
  let increment = end > start ? 1 : -1;
  let startTime = performance.now();

  function update() {
    let elapsedTime = performance.now() - startTime;
    let progress = Math.min(elapsedTime / duration, 1);
    current = start + progress * range;
    element.textContent = formatNumber(Math.round(current), addPlus);
    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

function startAnimationWhenInView() {
  let elements = document.querySelectorAll(".animate-number");

  let observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        let start = 0;
        let end = parseInt(entry.target.getAttribute("data-end"));
        let addPlus = entry.target.getAttribute("show-plus") === "true";
        let duration = 800;
        animateValueWhenInView(entry.target, start, end, duration, addPlus);
        observer.unobserve(entry.target);
      }
    });
  });

  elements.forEach((element) => {
    observer.observe(element);
  });
}

// Start animation when element is in view
startAnimationWhenInView();
