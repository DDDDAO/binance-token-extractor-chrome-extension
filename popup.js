document.addEventListener("DOMContentLoaded", function () {
  const tokenElement = document.getElementById("token");
  const cookiesListElement = document.getElementById("cookiesList");
  const copyButtonElement = document.getElementById("copyButton");

  console.log("Token element:", tokenElement);
  console.log("Cookies list element:", cookiesListElement);
  console.log("Copy button element:", copyButtonElement);

  if (tokenElement && cookiesListElement && copyButtonElement) {
    // Fetch CSRF token from storage
    chrome.storage.local.get(["csrfToken"], function (result) {
      tokenElement.textContent = result.csrfToken || "No token found";
    });

    // Get the current tab's domain and fetch the corresponding cookies
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      if (tabs.length === 0) {
        console.error("No active tab found.");
        return;
      }

      const url = new URL(tabs[0].url);
      const domain = url.hostname;
      const storageKey = `cookies_${domain}`;
      console.log("Looking for cookies with key:", storageKey);

      chrome.storage.local.get([storageKey], function (result) {
        const cookies = result[storageKey] || [];
        console.log("Fetched cookies for domain:", domain, cookies);

        if (cookies.length === 0) {
          cookiesListElement.textContent = "No cookies found.";
        } else {
          cookiesListElement.textContent = JSON.stringify(cookies, null, 2);
        }
      });
    });

    // Copy both CSRF token and cookies to clipboard when the button is clicked
    copyButtonElement.addEventListener("click", function () {
      const token = tokenElement.textContent;
      let cookies = [];

      try {
        cookies = JSON.parse(cookiesListElement.textContent);
      } catch (error) {
        console.error("Failed to parse cookies:", error);
      }

      console.log("Cookies after parsing:", cookies);

      const needed = cookies.filter((cookie) => cookie.name === "p20t");
      console.log("Filtered cookies:", needed);

      let cookieString = "";
      if (needed.length === 0) {
        console.error("Cookie 'p20t' not found.");
      } else {
        cookieString = `${needed[0].name}=${needed[0].value}`;
        console.log("Constructed cookie string:", cookieString);
      }

      // Construct the string to copy
      const textToCopy = `csrfToken=${token}&${cookieString}`;
      console.log("Text to copy:", textToCopy);

      // Copy the text to the clipboard
      navigator.clipboard
        .writeText(textToCopy)
        .then(function () {
          console.log("CSRF token and cookies copied to clipboard.");
        })
        .catch(function (error) {
          console.error("Failed to copy text: ", error);
        });
    });
  } else {
    console.error("One or more elements were not found in the DOM.");
  }
});
