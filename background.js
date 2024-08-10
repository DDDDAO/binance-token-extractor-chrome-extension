chrome.webRequest.onBeforeSendHeaders.addListener(
  function (details) {
    let csrfToken = null;
    for (let header of details.requestHeaders) {
      if (header.name.toLowerCase() === "csrftoken") {
        csrfToken = header.value;
        console.log("CSRF Token:", csrfToken);

        // Store the CSRF token using Chrome's storage API
        chrome.storage.local.set({ csrfToken: csrfToken }, function () {
          console.log("CSRF Token saved to storage");
        });
        break;
      }
    }
    // After checking headers, let's fetch cookies for binance.com
    fetchCookies("https://www.binance.com");
  },
  { urls: ["https://www.binance.com/*"] }, // Monitor requests to Binance
  ["requestHeaders"]
);

// Function to fetch cookies
function fetchCookies(domain) {
  chrome.cookies.getAll({ domain: "www.binance.com" }, function (cookies) {
    console.log("Cookies for domain:", domain, cookies);

    // Store cookies in local storage or handle them as needed
    chrome.storage.local.set({ binanceCookies: cookies }, function () {
      console.log("Cookies saved to storage");
    });
  });
}
