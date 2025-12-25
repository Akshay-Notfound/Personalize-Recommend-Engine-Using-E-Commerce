import requests
import json
import os

BASE_URL = "https://fakestoreapi.com"
CACHE_DIR = "cache"

if not os.path.exists(CACHE_DIR):
    os.makedirs(CACHE_DIR)

def fetch_with_cache(endpoint):
    cache_file = os.path.join(CACHE_DIR, f"{endpoint.replace('/', '_')}.json")
    
    # Simple cache logic (optional, but good for dev)
    if os.path.exists(cache_file):
        with open(cache_file, "r") as f:
            return json.load(f)
    
    response = requests.get(f"{BASE_URL}/{endpoint}")
    if response.status_code == 200:
        data = response.json()
        with open(cache_file, "w") as f:
            json.dump(data, f)
        return data
    else:
        raise Exception(f"Failed to fetch {endpoint}: {response.status_code}")

def get_products():
    return fetch_with_cache("products")

def get_users():
    return fetch_with_cache("users")

def get_carts():
    return fetch_with_cache("carts")

def get_product_by_id(product_id):
    return fetch_with_cache(f"products/{product_id}")
