import sys
import traceback

print("Starting debug...", flush=True)

try:
    print("Importing flask...", flush=True)
    import flask
    print(f"Flask installed: {flask.__version__}", flush=True)
    
    print("Importing sklearn...", flush=True)
    import sklearn
    print(f"Sklearn installed: {sklearn.__version__}", flush=True)
    
    print("Importing ml_engine...", flush=True)
    from ml_engine.recommender import recommender
    print("Recommender imported successfully", flush=True)

except Exception as e:
    print("Error occurred:", flush=True)
    traceback.print_exc()
