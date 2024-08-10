# Binance Token Extractor

**Binance Token Extractor** is a Chrome extension that monitors network requests to the Binance website and extracts the CSRF token and cookies. This extension is particularly useful for developers or security analysts who need to access these tokens for testing or automation purposes.

## Features

- **CSRF Token Extraction**: Automatically captures and stores the CSRF token from network requests made to `https://www.binance.com`.
- **Cookie Management**: Retrieves and stores all cookies associated with the `www.binance.com` domain.
- **Copy to Clipboard**: Easily copy the extracted CSRF token and cookies to the clipboard for use in scripts or other tools.

## Installation

1. Clone or download this repository to your local machine.
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable **Developer mode** in the top right corner.
4. Click **Load unpacked** and select the directory where this repository is located.

## Usage

1. Once installed, the extension will automatically monitor requests made to `https://www.binance.com`.
2. Open the extension by clicking on its icon in the Chrome toolbar.
3. The popup will display the extracted CSRF token and cookies.
4. Click the "Copy to Clipboard" button to copy both the CSRF token and cookies in a formatted string.

## File Structure

- **manifest.json**: The configuration file for the Chrome extension, specifying permissions, background scripts, and other metadata.
- **background.js**: The background script that listens for network requests and retrieves the CSRF token and cookies.
- **popup.html**: The HTML file for the extension's popup UI.
- **popup.js**: The JavaScript file that powers the functionality of the popup, including displaying data and copying it to the clipboard.
- **styles.css**: Optional stylesheet for styling the popup (if needed).

## Troubleshooting

- **No CSRF Token Found**: Ensure that you have navigated to `https://www.binance.com` and that your session is active. The extension will only capture tokens during active network requests.
- **Cookies Not Displaying**: Make sure you have the necessary permissions enabled in `manifest.json` and that the domain is correctly specified.
- **Cannot Copy to Clipboard**: Ensure you have the latest version of Chrome and that you are allowing clipboard access.

## Contributing

Contributions are welcome! If you have suggestions for improvements or have found a bug, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

_This extension is not affiliated with or endorsed by Binance. Use it at your own risk._
