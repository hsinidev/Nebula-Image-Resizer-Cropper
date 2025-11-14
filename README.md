
# Nebula Image Resizer & Cropper

![React](https://img.shields.io/badge/React-18-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3-blue?logo=tailwindcss)

A modern, client-side image resizing and cropping tool built with React, TypeScript, and the HTML Canvas API. This application provides a seamless, fast, and private way to manipulate images directly in your browser without ever uploading them to a server.

**[ Placeholder for App Screenshot/GIF ]**

## ✨ Key Features

-   **100% Client-Side:** All image processing happens locally in your browser. No data is ever sent to a server, guaranteeing user privacy and phenomenal speed.
-   **Live Preview:** Instantly see changes on an HTML canvas as you adjust settings.
-   **Resize & Crop:** Easily resize images to specific dimensions and perform simple crops. (Cropping functionality is planned).
-   **Format Conversion:** Export your final image as a high-quality PNG or a compressed JPEG.
-   **Drag & Drop:** A user-friendly interface that supports dragging and dropping files.
-   **Responsive Design:** A clean, dual-panel UI that works beautifully on both desktop and mobile devices.
-   **Stunning Aesthetics:** Features an immersive, animated multi-colored galaxy background for a unique user experience.

## 🚀 How It Works

The application leverages the power of modern browser APIs to handle all logic on the client-side:

1.  **File Reading:** The `FileReader` API reads the user-selected image from their local machine into memory as a data URL.
2.  **Canvas Rendering:** An `Image` object is created from the data URL and drawn onto an HTML `<canvas>` element for preview.
3.  **Image Manipulation:** When a user applies a transformation (like resizing), a hidden, off-screen canvas is used. The original image is drawn onto this new canvas with the desired dimensions, which performs the scaling.
4.  **Export & Download:** The content of the off-screen canvas is converted back into a data URL in the user's chosen format (PNG/JPEG). This URL is then used to programmatically trigger a download in the browser.

## 💻 Technology Stack

-   **Framework:** [React 18](https://reactjs.org/) (with TypeScript)
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
-   **Core Logic:** [HTML Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API), [FileReader API](https://developer.mozilla.org/en-US/docs/Web/API/FileReader)
-   **Bundler:** Vite (as per a standard React setup)

## 🛠️ Getting Started

To run this project locally, follow these simple steps.

### Prerequisites

-   Node.js (v18 or newer recommended)
-   npm or yarn package manager

### Installation & Running

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/nebula-image-resizer.git
    cd nebula-image-resizer
    ```

2.  **Install project dependencies:**
    ```bash
    npm install
    ```

3.  **Start the development server:**
    ```bash
    npm run dev
    ```

4.  **Open your browser:**
    Navigate to `http://localhost:5173` (or the port specified in your console).

## 🤝 Contributing

Contributions are welcome! If you have ideas for new features, bug fixes, or improvements, please feel free to:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/your-amazing-feature`).
3.  Commit your changes (`git commit -m 'Add some amazing feature'`).
4.  Push to the branch (`git push origin feature/your-amazing-feature`).
5.  Open a Pull Request.

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
