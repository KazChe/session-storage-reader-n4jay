# SessionStorage Reader Chrome Extension

A Chrome extension that reads sessionStorage data from web pages, allowing you to extract and view stored information with copy functionality.

## Features

- Reads sessionStorage data from the current active tab
- Extracts and displays stored data with copy functionality
- Console logging for debugging
- Clean, simple popup interface
- Configurable data extraction patterns

## Installation

1. Download or clone this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right corner
4. Click "Load unpacked" and select the extension directory
5. The extension icon should appear in your Chrome toolbar

## Usage

### Method 1: Popup Interface

1. Click the extension icon in your Chrome toolbar
2. Click "Read SessionStorage" button
3. The popup will display stored data from sessionStorage
4. Click the copy icon next to any value to copy it to clipboard

### Method 2: Extension Icon Click

1. Navigate to a page with sessionStorage data
2. Click the extension icon directly (not the popup)
3. Check the browser console for logged sessionStorage data

## What It Reads

The extension reads all sessionStorage data from the current page. You can modify the code to extract specific data patterns as needed:

```javascript
// Example: Reading all sessionStorage keys
const allKeys = Object.keys(sessionStorage);
allKeys.forEach((key) => {
  console.log(`${key}: ${sessionStorage.getItem(key)}`);
});

// Example: Reading specific data structure
const specificData = JSON.parse(sessionStorage.getItem("your.key.here"));
if (specificData) {
  console.log("Data:", specificData);
}
```

## Files Structure

- `manifest.json` - Extension configuration and permissions
- `background.js` - Service worker for extension icon click functionality
- `popup.html` - Popup interface HTML
- `popup.js` - Popup functionality and sessionStorage reading
- `content.js` - Content script (placeholder)
- `icon.png` - Extension icon
- `copy-icon.png` - Copy button icon

## Permissions

The extension requires the following permissions:

- `storage` - For accessing browser storage
- `activeTab` - For reading data from the current tab
- `scripting` - For executing scripts in the current tab

## Error Handling

The extension includes error handling for:

- Missing sessionStorage data
- JSON parsing errors
- Invalid data structure

## Development

To modify the extension:

1. Make changes to the relevant files
2. Go to `chrome://extensions/`
3. Click the refresh icon on the extension card
4. Test your changes

## Browser Compatibility

- Chrome (Manifest V3)
- Other Chromium-based browsers (Edge, Brave, etc.)

## Security Note

This extension reads data from sessionStorage, which may contain sensitive information. Use responsibly and only on trusted websites. The extension only reads data locally and does not transmit it anywhere.

## License

This project is open source and available under the MIT License.
