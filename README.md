# 🚖 Uber Clone – Web Ride Booking Application

A full-stack ride-booking web application inspired by Uber. This platform allows users to register, book rides, view real-time driver updates on a map, and pay securely online. Drivers can go online/offline, accept ride requests, and navigate using real-time route mapping.

---

## 📌 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Screenshots](#screenshots)
- [Architecture](#architecture)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [How It Works](#how-it-works)
- [Folder Structure](#folder-structure)
- [Demo](#demo)
- [Contributing](#contributing)
- [License](#license)
- [Author](#author)

---

## 🧠 Overview

This project replicates key features of the Uber platform, focusing on ride booking, real-time location tracking, and payment processing. It’s built with a modern tech stack including React, Node.js, MongoDB, Socket.io, and Google Maps API.

> This clone is meant for educational purposes and does not store real user data.

---

## ✨ Features

### 👤 User
- Sign up / Log in
- Book rides with pickup and destination
- See estimated fare
- Track driver in real-time on map
- Secure online payment with Razorpay
- View ride history

### 🚗 Driver
- Driver login
- Go online/offline
- Receive and accept ride requests
- Navigate via Google Maps
- View completed rides

### 🔄 Shared
- Real-time communication using Socket.io
- Google Maps route plotting
- Geolocation tracking
- Responsive mobile-friendly UI

---

## ⚙️ Tech Stack

### Frontend:
- React.js
- Tailwind CSS
- Axios
- React Router
- Google Maps JavaScript API

### Backend:
- Node.js
- Express.js
- MongoDB (Mongoose)
- Socket.io
- Razorpay Payment Gateway
- JWT for authentication

---

## 🖼️ Screenshots

> Add screenshots in `/assets/screenshots/` and link them here.

- Home Page  
- Booking Interface  
- Driver Dashboard  
- Real-time Map Tracking  
- Razorpay Checkout

---

## 🏗️ Architecture

graph LR
A[User Interface (React)] --> B[Express Server]
B --> C[MongoDB]
B --> D[Socket.io Server]
B --> E[Razorpay API]
A --> F[Google Maps API]
