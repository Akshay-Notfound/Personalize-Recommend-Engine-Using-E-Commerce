import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel
from sklearn.decomposition import TruncatedSVD
from ml_engine.data_loader import get_dataframes

class RecommenderSystem:
    def __init__(self):
        self.users_df, self.products_df, self.ratings_df = get_dataframes()
        self.content_sim_matrix = None
        self.svd_matrix = None
        self.user_item_matrix = None
        self._train_models()

    def _train_models(self):
        # 1. Content-Based Filtering
        self.products_df['content'] = self.products_df['name'] + " " + \
                                      self.products_df['category'] + " " + \
                                      self.products_df['description']
        
        tfidf = TfidfVectorizer(stop_words='english')
        tfidf_matrix = tfidf.fit_transform(self.products_df['content'])
        self.content_sim_matrix = linear_kernel(tfidf_matrix, tfidf_matrix)

        # 2. Collaborative Filtering (SVD using sklearn)
        # Create User-Item Matrix
        self.user_item_matrix = self.ratings_df.pivot(index='user_id', columns='product_id', values='rating').fillna(0)
        
        # Apply TruncatedSVD
        self.svd = TruncatedSVD(n_components=min(5, self.user_item_matrix.shape[1]-1), random_state=42)
        self.svd_matrix = self.svd.fit_transform(self.user_item_matrix)
        
        print("Models trained successfully.")

    def get_content_recommendations(self, product_id, top_n=5):
        """
        Returns similar products based on content similarity.
        """
        try:
            idx = self.products_df[self.products_df['id'] == product_id].index[0]
        except IndexError:
            return []

        sim_scores = list(enumerate(self.content_sim_matrix[idx]))
        sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
        sim_scores = sim_scores[1:top_n+1] 

        product_indices = [i[0] for i in sim_scores]
        return self.products_df.iloc[product_indices].to_dict('records')

    def get_collaborative_recommendations(self, user_id, top_n=5):
        """
        Returns recommendations for a user based on SVD (Matrix Reconstruction).
        """
        if user_id not in self.user_item_matrix.index:
            return []

        # Reconstruct the matrix
        user_idx = self.user_item_matrix.index.get_loc(user_id)
        
        # We need to compute the dot product of the user's latent features and the components
        # A_hat = U * Sigma * Vt approx = U_reduced * Vt_reduced
        # However, svd.transform gives us U * Sigma.
        # So we can just dot product with components_
        
        user_ratings_reconstructed = np.dot(self.svd_matrix[user_idx, :], self.svd.components_)
        
        # Get product IDs
        product_ids = self.user_item_matrix.columns
        
        # Create a series of predicted ratings
        predicted_ratings = pd.Series(user_ratings_reconstructed, index=product_ids)
        
        # Filter out already rated products
        rated_products = self.ratings_df[self.ratings_df['user_id'] == user_id]['product_id'].values
        predictions = predicted_ratings.drop(rated_products)
        
        # Sort and take top_n
        top_predictions = predictions.sort_values(ascending=False).head(top_n)
        
        top_product_ids = top_predictions.index.tolist()
        return self.products_df[self.products_df['id'].isin(top_product_ids)].to_dict('records')

    def get_hybrid_recommendations(self, user_id, top_n=5):
        # Check if user exists/has ratings
        if user_id not in self.ratings_df['user_id'].unique():
             # Cold Start: Return popular products
             popular_products = self.ratings_df.groupby('product_id')['rating'].mean().sort_values(ascending=False).head(top_n)
             pop_ids = popular_products.index.tolist()
             return self.products_df[self.products_df['id'].isin(pop_ids)].to_dict('records')

        collab_recs = self.get_collaborative_recommendations(user_id, top_n)
        return collab_recs

recommender = RecommenderSystem()
