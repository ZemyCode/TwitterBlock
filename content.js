const promotedSvg =
  "M19.498 3h-15c-1.381 0-2.5 1.12-2.5 2.5v13c0 1.38 1.119 2.5 2.5 2.5h15c1.381 0 2.5-1.12 2.5-2.5v-13c0-1.38-1.119-2.5-2.5-2.5zm-3.502 12h-2v-3.59l-5.293 5.3-1.414-1.42L12.581 10H8.996V8h7v7z";
const adDiv = "div[data-testid=placementTracking]";

function hidePromotedTweets() {
  document.querySelectorAll(adDiv).forEach((element) => {
    if (element.innerHTML.includes(promotedSvg)) {
      element.closest(adDiv).remove();
    }
  });
}

//check for promoted tweets on page load
document.addEventListener("load", () => hidePromotedTweets());

//check for promoted tweets when user scrolls
document.addEventListener("scroll", () => hidePromotedTweets());

//handle promoted tweets which load after the page
const observer = new PerformanceObserver((list) => {
  list.forEach(hidePromotedTweets());
});

//LCP only supported in Chromium based browsers, not Firefox or Safari
observer.observe({ type: "largest-contentful-paint", buffered: true });

//an imperfect solution for non LCP browsers, depends on user's page load time
//one second seems safe
if (document.readyState == "complete") {
  delay(1000).then(() => hidePromotedTweets());
}
