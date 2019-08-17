/* App JavaScript file */

// Check service worker is supported
if ('serviceWorker' in navigator) {

  // Use the window load event to keep the page load performant
  window.addEventListener('load', () => {

    navigator.serviceWorker.register('service-worker.js')
      .then(registration => console.log('Service Worker registered'))
      .catch(err => 'SW registration failed');

  });

}

/* Updates description text with device info */
function init() {
  var txt = "";
  txt += "<p>" + "Is PWA: " + isStandalone() + "</p>";
  txt += "<p>" + "Is Mobile: " + isMobile() + "</p>";
  txt += "<p>" + "Is iOS: " + isIOS() + "</p>";
  txt += "<p>" + "Is iPad: " + isIpad() + "</p>";
  txt += "<p>User Agent: " + navigator.userAgent + "</p>";
  document.getElementById("card-text").innerHTML = txt;
}

/* Check if Mobile Device */
function isMobile() {
  const userAgent = window.navigator.userAgent.toLowerCase();
  return /mobile/.test(userAgent);
}

/* Check if device is running iOS */
function isIOS() {
  const userAgent = window.navigator.userAgent.toLowerCase();
  return /iphone|ipad|ipod/.test(userAgent);
}

/* Check if device is an Ipad */
function isIpad() {
  const userAgent = window.navigator.userAgent.toLowerCase();
  return /ipad/.test(userAgent)
}

/* Check if device is installed */
function isStandalone() {
  return window.matchMedia('(display-mode: standalone)').matches;
}