# CleanBrowse - Ad Blocker Chrome Extension

CleanBrowse is a privacy-first ad blocker for Chrome (Manifest V3) designed to block ads, trackers, and other online annoyances. It's built with a lightweight architecture and offers a freemium model with premium features for advanced users.

## ✨ Features

- **Effective Blocking:** Uses Chrome's `declarativeNetRequest` API for fast and efficient blocking.
- **Privacy First:** No user tracking by default. All data is handled according to our strict privacy policy.
- **Lightweight:** Minimalist UI and a small footprint to keep your browser fast.
- **Freemium Model:** Core ad-blocking is free, with an optional premium subscription for advanced features.
- **Customizable:** Manage your own whitelists and filter lists.

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- [npm](https://www.npmjs.com/)

### Development Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/cleanbrowse.git
    cd cleanbrowse
    ```

2.  **Install frontend dependencies:**
    ```bash
    cd extension
    npm install
    ```

3.  **Install backend dependencies:**
    ```bash
    cd ../backend
    npm install
    ```

### Building the Extension

To build the extension for production, run the following command from the `extension` directory:

```bash
npm run build
```

This will create a `dist` folder inside the `extension` directory, containing the optimized and bundled files ready for loading into Chrome.

### Running the Backend

To start the backend server for development (with auto-reloading), run:

```bash
cd backend
npm run dev
```

## 📦 Loading the Extension in Chrome (Development)

1.  Open Chrome and navigate to `chrome://extensions`.
2.  Enable **"Developer mode"** in the top-right corner.
3.  Click **"Load unpacked"**.
4.  Select the `extension/dist` folder from your project directory.

The CleanBrowse extension should now be installed and active.

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request if you have any ideas or improvements.

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
