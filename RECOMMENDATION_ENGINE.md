# Personalized Recommendation Engine Documentation

## Overview

The **Personalized Recommendation Engine** is a core feature of the E-Shop platform, designed to deliver a tailored shopping experience for every user. By analyzing user behavior and product characteristics, the system dynamically curates products to increase engagement and conversion rates.

## Architecture: Hybrid Recommendation System

This project implements a **Hybrid Recommendation System** that combines two powerful filtering techniques to overcome the limitations of each individual approach.

### 1. Collaborative Filtering (User-Behavior Based)

* **Concept**: "Users who liked this also liked..."
* **Implementation**: Utilizes **Singular Value Decomposition (SVD)**.
* **How it works**:
  * Constructs a `User-Item Matrix` (Rows = Users, Columns = Products, Values = Ratings/Interactions).
  * Decomposes this matrix to identify latent factors (hidden patterns) connecting users and items.
  * Predicts a user's potential rating for an unvisited product based on similar users' preferences.
* **Library**: `scikit-learn` (TruncatedSVD).
* **Use Case**: Powers the **"Curated For You"** section on the Homepage.

### 2. Content-Based Filtering (Item-Attribute Based)

* **Concept**: "Since you viewed X, you might like Y..."
* **Implementation**: Utilizes **TF-IDF (Term Frequency-Inverse Document Frequency)** and **Cosine Similarity**.
* **How it works**:
  * Analyzes product metadata (Name, Category, Description) to create a "Content Profile" for each item.
  * Converts text data into numerical vectors using TF-IDF.
  * Calculates the Cosine Similarity between these vectors to find products that are semantically similar.
* **Library**: `scikit-learn` (TfidfVectorizer, linear_kernel).
* **Use Case**: Powers the **"Similar Products"** suggestions on Product Detail pages.

---

## Key Features

### 🛒 Contextual Recommendations

When a user views a specific product, the engine immediately suggests alternative or complementary items with similar attributes (e.g., same fabric, style, or brand category). This keeps the user engaged even if the initial product isn't a perfect match.

### 🏠 Personalized Homepage Feed

Every registered user sees a unique "Curated For You" section upon logging in. This feed is generated in real-time based on their historical ratings and interaction patterns.

### ❄️ Cold Start Handling

**Problem**: New users have no interaction history, making it impossible to perform collaborative filtering.
**Solution**: The system implements a fallback strategy.

* If a user is new (User ID not found in the matrix), the engine automatically switches to a **Popularity-Based** model.
* It recommends the top-rated products across the entire platform until sufficient data is collected.

### 📊 User Interaction Tracking

The frontend application actively tracks user actions to feed the recommendation engine.

* **Tracking Module**: `frontend/src/services/userService.js`
* **Captured Events**:
  * Product Views
  * Ratings/Reviews (Implicitly converted to preferences)

---

## Technical Stack

| Component | Technology | Role |
| :--- | :--- | :--- |
| **Backend Framework** | Flask (Python) | API hosting and request handling |
| **ML Engine** | Scikit-learn, Pandas | Data processing and algorithm implementation |
| **Vectorization** | TF-IDF | Natural Language Processing for product text |
| **Matrix Factorization** | SVD | Dimensionality reduction for collaborative filtering |
| **Frontend Integration** | React + Axios | Displaying recommendations via API calls |

## API Endpoints

| Endpoint | Method | Description | Model Used |
| :--- | :--- | :--- | :--- |
| `/api/recommend/<user_id>` | `GET` | Get personalized feed for a user | **SVD** (or Popularity Fallback) |
| `/api/products/<id>` | `GET` | Get similar products for a specific item | **TF-IDF + Cosine Similarity** |
