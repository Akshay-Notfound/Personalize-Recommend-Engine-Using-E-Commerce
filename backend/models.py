from dataclasses import dataclass
from typing import List, Optional

@dataclass
class Product:
    id: int
    name: str
    category: str
    price: float
    description: str

@dataclass
class User:
    id: int
    name: str
    email: str

@dataclass
class Rating:
    user_id: int
    product_id: int
    rating: float

# Mock Database for now
users = [
    User(1, "Alice", "alice@example.com"),
    User(2, "Bob", "bob@example.com"),
    User(3, "Charlie", "charlie@example.com"),
    User(4, "David", "david@example.com"),
    User(5, "Eve", "eve@example.com")
]

products = [
    Product(101, "Wireless Headphones", "Electronics", 99.99, "Noise cancelling high quality headphones"),
    Product(102, "Smartphone", "Electronics", 699.99, "Latest generation smartphone with 5G"),
    Product(103, "Running Shoes", "Fashion", 79.99, "Comfortable running shoes for daily use"),
    Product(104, "Coffee Maker", "Home", 49.99, "Automatic coffee maker with timer"),
    Product(105, "Backpack", "Fashion", 39.99, "Waterproof laptop backpack"),
    Product(106, "Laptop", "Electronics", 1200.00, "High performance laptop for gaming"),
    Product(107, "T-Shirt", "Fashion", 19.99, "Cotton crew neck t-shirt"),
    Product(108, "Blender", "Home", 29.99, "High speed blender for smoothies"),
]

# User ID, Product ID, Rating (1-5)
ratings = [
    Rating(1, 101, 5.0), Rating(1, 102, 4.0), Rating(1, 103, 2.0),
    Rating(2, 101, 2.0), Rating(2, 102, 2.0), Rating(2, 104, 5.0), Rating(2, 105, 4.5),
    Rating(3, 103, 5.0), Rating(3, 105, 5.0), Rating(3, 107, 4.0),
    Rating(4, 101, 4.5), Rating(4, 106, 5.0),
    Rating(5, 104, 3.0), Rating(5, 108, 4.0),
]
