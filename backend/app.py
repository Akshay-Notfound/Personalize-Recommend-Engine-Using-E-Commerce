from flask import Flask, jsonify, request
from flask_cors import CORS
from ml_engine.recommender import recommender
from backend import api_service

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return jsonify({"message": "E-Commerce Recommendation Engine API is running"})

@app.route('/api/products', methods=['GET'])
def get_products():
    return jsonify(api_service.get_products())

@app.route('/api/products/<int:product_id>', methods=['GET'])
def get_product(product_id):
    product = api_service.get_product_by_id(product_id)
    if not product:
        return jsonify({"error": "Product not found"}), 404
    
    # Get similar products (Content-Based)
    similar_products = recommender.get_content_recommendations(product_id)
    
    return jsonify({
        "product": product,
        "similar_products": similar_products
    })

@app.route('/api/recommend/<int:user_id>', methods=['GET'])
def recommend(user_id):
    # Hybrid/Collaborative Recommendations
    recommendations = recommender.get_collaborative_recommendations(user_id)
    return jsonify(recommendations)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
