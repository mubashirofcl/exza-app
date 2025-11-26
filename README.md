<h2 align="center"> 🛒 EXZA - Classifieds Marketplace </h2>

<h4 align="center">
A responsive, real-time classifieds platform built with React, Redux, Firebase Authentication, and a modern Glassmorphism theme.
</h4>

<p align="center">
<img src="https://www.google.com/search?q=https://placehold.co/800x400/9ec8f5/333%3Ftext%3DEXZA%2BApp%2BPreview%2B(Light%2BTheme)" alt="EXZA App Preview" width="80%">
</p>

<p align="center">
<a href="#" target="_blank">
<img src="https://img.shields.io/badge/🔗 Live Preview-000000?style=for-the-badge&logo=google-chrome&logoColor=white" alt="Live Demo Link">
</a>
</p>

📖 About the Project

EXZA is a modern, OLX-style classifieds application designed for users to quickly buy and sell new or used products within their local area. The platform focuses on a clean user experience backed by robust state management (Redux Toolkit) and secure authentication (Firebase).

The application strictly enforces security: users must be signed in to perform any transactional actions, such as listing a product or adding items to the cart.

✨ Features (Phase 6 Complete)

Security & Authentication (Requirement A, F.iii)

Google Sign-In: Secure and seamless authentication using the Firebase Google provider.

Session Management: User state and authentication readiness are managed in Redux, ensuring the application reliably tracks the current session.

Protected Routes: Selling, Cart, and Checkout pages are guarded. Unauthenticated users attempting access are redirected to the Login page.

Product Management (Requirement B, F.i, G)

Create New Listings: Authenticated users can list new products via a responsive React Hook Form (/sell).

Asynchronous Image Handling: Form includes validation and simulates image upload via a mock Cloudinary API, returning a hosted URL for the product.

Product State Management: Products are dispatched to the Redux store (productsSlice), where they are managed in real-time (F.i).

Search & Filtering (Ready): Core functionality for listing and browsing products is implemented.

Transactional Logic (Requirement D, E, F.ii, F.iv)

Add to Cart: Users can add available products to a temporary Redux-managed cart (F.ii). This action is gated behind authentication.

Checkout Process: A dedicated checkout flow handles collecting mock payment/shipping information (using RHF validation).

Mark as Sold: The successful checkout process dispatches a processCheckout action, which updates the product status from 'available' to 'sold' (E, F.iv) and clears the cart.

Design & Architecture (Phase 4 Complete)

Custom Theme: Utilizes a custom Tailwind CSS theme based on a modern light purple/blue gradient (exza-gradient) with light mode color variables.

Glassmorphism UI: Header, Footer, and Card components feature a light, frosted glass effect.

Responsive Layout: Optimized for all screen sizes (mobile, tablet, desktop).

🛠️ Built With

This project uses the following core technologies:

React (Vite) — Frontend Framework

Redux Toolkit — State Management (for Auth, Products, and Cart)

React Router DOM — Navigation

Tailwind CSS — Utility-first styling (with custom colors and utilities)

Firebase SDK — Authentication (Google Sign-In)

React Hook Form — Form validation and management

Mock Cloudinary API — Image upload simulation (for demonstrating B)

🚀 Getting Started

To run this project locally:

Clone the repository:

git clone [repository-url]
cd exza-app


Install dependencies:

npm install


Setup Firebase:

Create a Firebase project and enable Google Authentication.

Update src/api/auth.js with your specific firebaseConfig.

Start the development server:

npm run dev


The application will automatically open in your browser, enabling you to test the full authentication and product workflow.
