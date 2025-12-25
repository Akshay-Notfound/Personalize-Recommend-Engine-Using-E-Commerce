import pandas as pd
from backend import api_service

def get_dataframes():
    """
    Fetches real data from API and converts to DataFrames.
    Synthesizes ratings based on cart data.
    """
    products = api_service.get_products()
    users = api_service.get_users()
    carts = api_service.get_carts()

    products_df = pd.DataFrame(products)
    users_df = pd.DataFrame(users)
    
    # Map API fields if necessary
    if 'title' in products_df.columns:
        products_df = products_df.rename(columns={'title': 'name'})

    # Synthesize Ratings from Carts
    # If a user has a product in their cart, we give it a high rating (e.g. 5.0)
    rating_list = []
    for cart in carts:
        user_id = cart['userId']
        for item in cart['products']:
            product_id = item['productId']
            rating_list.append({
                'user_id': user_id,
                'product_id': product_id,
                'rating': 5.0
            })
    
    # Also add some random variation or base ratings from product's own rating if available
    for p in products:
        if 'rating' in p:
            # We don't have user_id for these, so we'll just use them as a baseline or ignore
            # For this MVP, we mainly care about the user-product matrix
            pass

    ratings_df = pd.DataFrame(rating_list)
    
    # Ensure no duplicates in ratings (take max rating if exists)
    if not ratings_df.empty:
        ratings_df = ratings_df.groupby(['user_id', 'product_id'])['rating'].max().reset_index()

    return users_df, products_df, ratings_df
