# Personalized Recommendation Engine for E-Commerce

A full-stack e-commerce application featuring a **Hybrid Recommendation Engine** that combines Collaborative Filtering (SVD) and Content-Based Filtering (TF-IDF) to deliver personalized shopping experiences.

## 🚀 Features

* **Hybrid Recommendation System**: Combines user behavior and product attributes for accurate suggestions.
* **Cold Start Handling**: Automatically recommends popular products for new users.
* **Personalized Homepage**: "Curated For You" section based on unique user history.
* **Smart Search & Filtering**: Filter by category, sort by price/name.
* **Secure Authentication**: Firebase Authentication for signup/login.
* **Modern UI**: Built with React, Tailwind CSS, and Framer Motion.
* **Wishlist & Cart**: Full shopping cart and wishlist functionality.
* **Mock Payment**: Simulated checkout flow with order success confirmation.

---

## 🛠️ Tech Stack

* **Frontend**: React, Vite, Tailwind CSS, Axios, Lucide React
* **Backend**: Python, Flask, Flask-CORS
* **ML Engine**: Scikit-Learn (SVD, TF-IDF), Pandas, NumPy
* **Database/Auth**: Firebase Firestore & Authentication

---

## 📋 Prerequisites

Ensure you have the following installed:

* [Node.js](https://nodejs.org/) (v16+)
* [Python](https://www.python.org/) (v3.8+)
* Firebase Account

---

## ⚙️ Step-by-Step Installation Guide

### 1. Clone the Repository

```bash
git clone https://github.com/Akshay-Notfound/Personalize-Recommend-Engine-Using-E-Commerce.git
cd "Personalize-Recommend-Engine-Using-E-Commerce"
```

### 2. Backend Setup (Flask + ML Engine)

Navigate to the project root and create a virtual environment:

```bash
# Create virtual environment
python -m venv .venv

# Activate virtual environment
# Windows:
.venv\Scripts\activate
# Mac/Linux:
source .venv/bin/activate
```

Install Python dependencies:

```bash
pip install -r requirements.txt
```

*Note: Ensure `scikit-learn`, `flask`, `flask-cors`, `pandas`, `numpy` are in `requirements.txt`.*

Start the Backend Server:

```bash
python -m backend.app
```

*The backend should default to running on `http://localhost:5000`.*

### 3. Frontend Setup (React)

Open a new terminal, navigate to the `frontend` folder:

```bash
cd frontend
```

Install Node dependencies:

```bash
npm install
```

Start the Frontend Development Server:

```bash
npm run dev
```

*The app will typically run on `http://localhost:5173`.*

### 4. Firebase Configuration

1. Create a project in the [Firebase Console](https://console.firebase.google.com/).
2. Enable **Authentication** (Email/Password).
3. Enable **Firestore Database**.
4. Copy your Firebase config keys and update `frontend/src/config/firebaseConfig.js`.

---

## 🧠 Recommendation Engine Details

For a deep dive into how the recommendation algorithms work (SVD, TF-IDF, Cold Start strategies), please read the [RECOMMENDATION_ENGINE.md](./RECOMMENDATION_ENGINE.md) file included in this repository.

---

## � Future Enhancements

* **Real-time Analytics Dashboard**: Admin panel to visualize user engagement and sales trends.
* **Payment Gateway Integration**: Full integration with Stripe or Razorpay for actual transactions.
* **Social Login**: Google and Facebook authentication options.
* **Mobile Application**: React Native mobile app for iOS and Android.
* **A/B Testing**: Framework to test different recommendation strategies.
* **Containerization**: Docker support for easy deployment and scaling.
* **Voice Search**: Voice-enabled product search for better accessibility.
* **AR Try-On**: Augmented Reality feature for virtual product trials (fashion/accessories).
* **Multi-language Support**: Internationalization (i18n) for global reach.
* **Price Drop Alerts**: Automated notifications for wishlisted items.
* **AI Chatbot**: Intelligent customer support assistant.

---

## �📸 Screenshots

(Screenshots can be added here)

## 📄 License

MIT License
