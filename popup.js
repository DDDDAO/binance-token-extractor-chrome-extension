document.addEventListener("DOMContentLoaded", function () {
  const tokenElement = document.getElementById("token");
  const cookiesListElement = document.getElementById("cookiesList");
  const copyButtonElement = document.getElementById("copyButton");

  console.log("Token element:", tokenElement); // Check if the element is found
  console.log("Cookies list element:", cookiesListElement);
  console.log("Copy button element:", copyButtonElement);

  if (tokenElement && cookiesListElement && copyButtonElement) {
    // Fetch CSRF token from storage
    chrome.storage.local.get(["csrfToken"], function (result) {
      tokenElement.textContent = result.csrfToken || "No token found";
    });

    // Fetch Binance cookies from storage
    chrome.storage.local.get(["binanceCookies"], function (result) {
      const cookies = result.binanceCookies || [];
      cookiesListElement.textContent = JSON.stringify(cookies, null, 2);
    });

    // Copy both CSRF token and cookies to clipboard when the button is clicked
    copyButtonElement.addEventListener("click", function () {
      const token = tokenElement.textContent;
      const cookies = JSON.parse(cookiesListElement.textContent);
      console.log("Cookies:", cookies);
      const needed = cookies.filter((cookie) => cookie.name === "p20t");
      let cookieString = "";
      if (needed.length === 0) {
        console.error("Cookie not found");
      } else {
        cookieString = needed[0].name + "=" + needed[0].value;
      }
      // Construct the string to copy
      const textToCopy = `csrfToken=${token}&${cookieString}`;

      // Copy the text to the clipboard
      navigator.clipboard
        .writeText(textToCopy)
        .then(function () {
          console.log("CSRF token and cookies copied to clipboard");
        })
        .catch(function (error) {
          console.error("Failed to copy text: ", error);
        });
    });
  } else {
    console.error("One or more elements were not found in the DOM.");
  }
});
