# Joseph Profile

A modern, fast, and responsive React web application built as a professional profile.

## Overview

This project is built using:

- **React 19** for UI components
- **Vite** for fast, optimized builds
- **Tailwind CSS** for styling
- **TypeScript** for type-safe development

## Setup Instructions

### Prerequisites

- Node.js (v18 or higher recommended)

### Local Development

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Environment Variables:**
   Copy `.env.example` to `.env.local` and fill in necessary keys (e.g., `GEMINI_API_KEY`).

   ```bash
   cp .env.example .env.local
   ```

3. **Start the development server:**

   ```bash
   npm run dev
   ```

   The site will be available on port 3000 (or the next available port).

### Building for Production

Compile the code and build the project for production:

```bash
npm run build
```

The output will be generated in the `dist` directory.

## Deployment (GitHub Actions)

This project is configured with a continuous integration/continuous deployment (CI/CD) pipeline via GitHub Actions.

- Whenever code is pushed to the `main` or `master` branch, the `Deploy to GitHub Pages` workflow is automatically triggered.
- It installs the dependencies, builds the project, and deploys the generated `dist` folder directly to GitHub Pages.

To ensure this works on your repository, make sure that **GitHub Pages is enabled** in your repository settings, with the source set to **GitHub Actions**.
