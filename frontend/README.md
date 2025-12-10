This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


#######
# syncHer Frontend

This is the frontend for the **syncHer AI chatbot** project. It is built using **Next.js 13+** with **TypeScript** and connects to the FastAPI backend to provide a chatbot interface for menstruation support.

---

## **Table of Contents**

1. [Prerequisites](#prerequisites)  
2. [Installation](#installation)  
3. [Folder Structure](#folder-structure)  
4. [Running the Frontend](#running-the-frontend)  
5. [Connecting to the Backend](#connecting-to-the-backend)  
6. [Project Overview](#project-overview)  
7. [Notes for Team Members](#notes-for-team-members)  

---

## **Prerequisites**

Before running the frontend, ensure the following are installed:

1. **Node.js (v18 or later)**  
   - Check version:  
     ```bash
     node -v
     ```
2. **npm (comes with Node.js)**  
   - Check version:  
     ```bash
     npm -v
     ```
3. **Backend running**  
   - Ensure the FastAPI backend is running at `http://127.0.0.1:8000` (default).  
   - Frontend communicates with backend through `/api` routes.

---

## **Installation**

1. Install dependencies:

```bash
npm install
```

2. Run the frontend:

```bash
npm run dev
```

3. Folder structure
frontend/
├── .next/                  # Next.js build output
├── node_modules/           # Installed npm packages
├── public/                 # Static files (images, icons)
├── src/
│   └── app/                # Main application code (App Router)
│       ├── page.tsx        # Root page (chatbot interface)
│       └── layout.tsx      # Root layout (<html> and <body> wrapper)
├── .gitignore
├── next.config.ts          # Next.js configuration (rewrites to backend)
├── package.json
├── tsconfig.json           # TypeScript configuration
├── postcss.config.mjs
├── eslint.config.mjs
└── README.md


Notes for Team Members

Client Components: All pages using React hooks (like useState) must include "use client" at the top.

Adding new pages: Create a new folder in src/app/ and add a page.tsx inside it.

Global styling: Use src/app/globals.css or add Tailwind/other CSS as needed.

Backend URL changes: If the backend runs on a different port, update next.config.ts rewrites.

Restart dev server after making changes to next.config.ts or TypeScript files.
