# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules. It is designed for building modern web applications with a focus on performance and developer experience.

## Project Overview

Welcome to the **Civic Bot** project! Civic Bot is an intelligent chatbot designed to assist users in navigating administrative procedures and accessing public services in Thủ Đức City. The bot provides quick responses to common inquiries, helping users find the information they need efficiently. This project leverages React, TypeScript, and Vite to create a responsive and user-friendly interface.

## Features

- Fast Refresh with Vite
- TypeScript support for type safety
- ESLint configuration for maintaining code quality
- Responsive design using Tailwind CSS
- File upload functionality with Cloudinary integration
- Civic Bot integration for user assistance with administrative queries

## Installation

To get started with this project, follow these steps:

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add your Cloudinary credentials:
   ```env
   VITE_CLOUDINARY_NAME=<your-cloudinary-name>
   VITE_UPLOAD_PRESET=<your-upload-preset>
   ```

## Running the Project

To run the development server, use the following command:
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:3000` to see your application in action.

## Building for Production

To build the application for production, run:
```bash
npm run build
```
This will create an optimized build in the `dist` directory.

## Expanding the ESLint Configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

- Configure the top-level `parserOptions` property like this:
  ```js
  export default tseslint.config({
    languageOptions: {
      // other options...
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  })
  ```

- Replace `tseslint.configs.recommended` with `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`.
- Optionally add `...tseslint.configs.stylisticTypeChecked`.
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:
  ```js
  // eslint.config.js
  import react from 'eslint-plugin-react'

  export default tseslint.config({
    // Set the react version
    settings: { react: { version: '18.3' } },
    plugins: {
      // Add the react plugin
      react,
    },
    rules: {
      // other rules...
      // Enable its recommended rules
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
    },
  })
  ```

## Components Overview

- **Header**: Displays the navigation and contact information.
- **MainContent**: Contains the main functionality, including search and information display.
- **Footer**: Provides additional links and contact information.
- **Civic Bot**: Assists users with inquiries related to administrative procedures and public services.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.