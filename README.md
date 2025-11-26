<h2 align="center"> 🛒 EXZA – Modern Marketplace App </h2>

<h4 align="center">
  A clean OLX-style buying & selling platform built with React, Redux, Firebase Auth, and Cloudinary.
</h4>

<p align="center">
  <img src="/src/assets/exza-preview.gif" alt="EXZA App Preview" width="80%">
</p>

<p align="center">
  <a href="https://your-exza-live-link.com" target="_blank">
    <img src="https://img.shields.io/badge/🔗 Live Preview-000000?style=for-the-badge&logo=google-chrome&logoColor=white">
  </a>
</p>

---

## 📖 About the Project

**EXZA** is a modern and responsive marketplace application modeled after OLX.  
Anyone can browse products. Once logged in via **Google Authentication**, users can post new products, upload images, add items to cart, and mark items as sold during checkout.

The project uses **Redux Toolkit** for global state, **Cloudinary** for image uploads, and **LocalStorage persistence** for listings & cart.

---

## 🛠️ Built With

This project uses the following technologies:

- **React (Vite)** — frontend framework  
- **Redux Toolkit** — state management  
- **React Router DOM** — navigation  
- **React Hook Form** — form handling  
- **Firebase Authentication (Google Sign-In)** — secure login  
- **Cloudinary Upload API** — image hosting  
- **Tailwind CSS** — styling  
- **LocalStorage** — persistent data  

---

## ✨ Features

- **Public Product Access**  
  Anyone can browse the product listings without logging in.

- **Google Authentication**  
  Secure login using Firebase's Google Sign-In.

- **Product Listing System**  
  Authenticated users can create new listings with one product image.

- **Cloudinary Upload**  
  Each product image is securely uploaded and stored in Cloudinary.

- **Add to Cart (Single Item)**  
  OLX-style cart: each product can be added only once.

- **Checkout → Sold Status**  
  Completing checkout marks the product as *SOLD*, and its button becomes disabled.

- **LocalStorage Persistence**  
  Products & cart remain saved even after reload.

- **Responsive UI**  
  Fully optimized for phone, tablet, and desktop.

- **Fallback Image Handling**  
  If an uploaded image fails to load, a placeholder is shown.

---
