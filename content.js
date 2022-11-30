const promotedSvg =
  "M19.498 3h-15c-1.381 0-2.5 1.12-2.5 2.5v13c0 1.38 1.119 2.5 2.5 2.5h15c1.381 0 2.5-1.12 2.5-2.5v-13c0-1.38-1.119-2.5-2.5-2.5zm-3.502 12h-2v-3.59l-5.293 5.3-1.414-1.42L12.581 10H8.996V8h7v7z";
const adDiv = "div[data-testid=placementTracking]";
const timelineDiv = 'div[aria-label="Timeline: Your Home Timeline"]';
var timeline;

function hidePromotedTweets() {
  document.querySelectorAll(adDiv).forEach((element) => {
    if (element.innerHTML.includes(promotedSvg)) {
      element.closest(adDiv).remove();
    }
  });
}

//check for promoted tweets on page load
document.addEventListener("load", () => {
  timeline = document.querySelector(timelineDiv);
  hidePromotedTweets();
});

//check for promoted tweets when user scrolls
document.addEventListener("scroll", () => hidePromotedTweets());

//handle promoted tweets which load after the page
const observer = new PerformanceObserver(() => {
  hidePromotedTweets();
});

//LCP only supported in Chromium based browsers, not Firefox or Safari
observer.observe({ type: "largest-contentful-paint", buffered: true });

//attempted solution for non LCP browsers
timeline.addEventListener("load", () => {
  setTimeout(() => {
    hidePromotedTweets();
  }, 1000);
});
