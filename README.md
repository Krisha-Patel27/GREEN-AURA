# 🌿 Green Aura

### *Inspired by Nature, Powered by Technology*

Green Aura is a web-based gardening e-commerce platform developed to make it easier for users to explore and purchase gardening products online. The platform provides products such as **plants, seeds, plant care products, pots & planters, and gardening essentials**.

The system provides separate functionalities for **Guest Users, Registered Users, and Administrators**. Users can browse and search products, manage their wishlist and cart, place orders, make online payments, track orders, and provide product ratings and reviews. The administrator can manage products, categories, users, inventory, orders, and customer feedback.

---

## 🌱 About the Project

Traditional gardening product shopping often requires customers to visit physical nurseries or stores to check product availability and make purchases. Green Aura provides a centralized online platform where gardening products can be browsed, searched, filtered, and purchased conveniently.

The main objective of Green Aura is to provide a **user-friendly, secure, and organized gardening e-commerce experience** while simplifying product and order management for administrators.

---

## ✨ Key Features

### 👤 Guest User

* View Home Page
* Browse gardening products
* View product categories
* Search products
* View product details
* View About Us
* View Terms & Conditions
* Register for an account

### 🛒 Registered User

* Secure user registration and login
* CAPTCHA verification
* Manage user profile
* Browse and search products
* Filter products by category and price
* View detailed product information
* Add products to cart
* Manage Wishlist
* Place orders
* Online payment
* View order history
* Track order status
* Provide product ratings and reviews
* Change password
* Reset password using OTP verification

### 🔐 Administrator

* Secure Admin Login
* Admin Dashboard
* Category Management
* Subcategory Management
* Product Management
* User Management
* Order Management
* Order Status Updates
* Payment Management
* Feedback and Review Management
* Admin Forgot Password with OTP verification

---

## 🛠️ Technology Stack

### Frontend

* React.js
* HTML5
* CSS3
* JavaScript
* Bootstrap

### Backend

* Node.js
* Express.js

### Database

* MongoDB

### Security

* bcrypt password hashing
* CAPTCHA verification
* Authentication and authorization
* Role-based access control
* Input validation
* Secure session management
* OTP-based password recovery

### Payment

* Razorpay

### Development Tools

* Visual Studio Code
* Git & GitHub
* Google Chrome
* Microsoft Edge

### Deployment

* Vercel

---

## 🏗️ Project Architecture

The project follows a client-server architecture:

```text
Green Aura
│
├── client
│   └── React.js Frontend
│
├── server
│   └── Node.js + Express.js Backend
│
├── MongoDB
│   └── Database
│
└── Razorpay
    └── Payment Integration
```

The **client** handles the user interface and interaction, while the **server** manages APIs, authentication, business logic, and communication with MongoDB.

---

## 🔒 Security Features

Green Aura implements several security mechanisms to protect users and system data:

* CAPTCHA verification during login
* Password hashing using bcrypt
* Secure session management
* User authentication
* Role-based access control for Admin and User
* Input validation
* Secure communication between frontend and backend
* Admin-side OTP verification for forgot password
* User-side OTP verification for password reset

---

## 🗄️ Database

Green Aura uses **MongoDB** for storing application data.

Major collections include:

* Admin Login
* Categories
* Products
* Users
* User Reviews
* Wishlist
* Cart
* Orders
* Counters

The database stores information related to products, users, orders, reviews, cart items, wishlist items, and administrative operations.

---

## 🛍️ Product Categories

Green Aura organizes gardening products into categories such as:

* 🌱 Plants
* 🌾 Seeds
* 🪴 Plant Care
* 🏺 Pots & Planters
* 🧰 Gardening Essentials

This category-based structure makes it easier for users to find suitable gardening products.

---

## 💳 Online Payment

Green Aura supports online payment integration using **Razorpay**.

The payment process allows users to proceed from their cart to checkout and make an online payment while placing an order.

---

## 📦 Order Management

Users can:

* Place orders
* View previous orders
* View order details
* Track order status

Administrators can manage customer orders and update their status, such as:

```text
Pending → Shipped → Delivered
```

---

## ⭐ Reviews & Ratings

Registered users can provide feedback for purchased products by:

* Giving a rating from 1 to 5 stars
* Writing a product review

The administrator can monitor customer reviews and feedback.

---

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/AeshaVyas/GREEN-AURA.git
```

### 2. Navigate to the Project

```bash
cd GREEN-AURA
```

### 3. Install Dependencies

Install the required dependencies for the project using npm.

For the client:

```bash
cd client
npm install
```

For the server:

```bash
cd ../server
npm install
```

### 4. Configure Environment Variables

Create the required `.env` file in the appropriate project directory and add the required configuration values such as database and payment credentials.

**Do not upload sensitive credentials or API keys to GitHub.**

### 5. Run the Application

Start the frontend and backend using the appropriate npm commands defined in the project configuration.

---

## 🌐 Live Demo

**Green Aura:**
https://green-aura-six.vercel.app/

---
## 🔮 Future Enhancements

The following features can be added in future versions:

1. **AI-Based Product Recommendation**
   Recommend gardening products based on browsing history, previous purchases, and seasonal trends.

2. **Plant Care Assistant**
   Develop an AI-based assistant to provide watering schedules, sunlight requirements, and basic plant disease guidance.

3. **Mobile Application**
   Develop dedicated Android and iOS applications.

4. **Subscription-Based Model**
   Introduce monthly plant deliveries, seasonal gardening kits, and Plant of the Month plans.

5. **Advanced Order Tracking**
   Provide real-time delivery tracking, estimated delivery time, and courier API integration.

6. **Community & User Engagement**
   Add gardening blogs, discussion forums, and community features.

7. **Advanced Filters & Personalization**
   Add filters such as air-purifying, low-maintenance, and pet-friendly plants.

8. **FAQ / Help Center**
   Provide quick answers and guides related to products, plant care, orders, delivery, and returns.

---

## 📚 References

### Websites

* Plant Orbit
* House of Kojo
* NurseryLive
* PlantsHub
* Stack Overflow
* React Documentation
* Node.js Documentation
* Express.js Documentation
* MongoDB Documentation
* Razorpay Documentation
* Vercel Documentation

### Books

* *MERN Stack Web Development for Beginners* — Nathan Sebhastian
* *MERN Projects for Beginners* — Nabendu Biswas

---

## 👩‍💻 Project

**Green Aura – Gardening E-Commerce Platform**

A full-stack web application developed using the MERN stack to provide a convenient online platform for purchasing gardening products.
