import pandas as pd
import numpy as np
import pymongo
from sklearn.ensemble import RandomForestRegressor 
from sklearn.metrics import mean_absolute_error
from sklearn.model_selection import train_test_split

# Load dataset 
print("Loading dataset...")
df = pd.read_csv('training_set1.csv')

# Define features
features = ['personality', 'work_scenerio', 'field_interest', 'academics', 'analytics','general_science'] 

# Get list of careers 
careers = df.columns[8:] 

# Split data
X_train, X_test, y_train, y_test = train_test_split(df[features], df[careers], test_size=0.2, random_state=0)

# Train model
rf = RandomForestRegressor(n_estimators=100, random_state=1)
rf.fit(X_train, y_train) 

# Evaluate model
predictions = rf.predict(X_test)
mae = mean_absolute_error(y_test, predictions)
print('MAE:', mae)

mongo_uri = 'mongodb://localhost:27017/career_db'
# Make predictions
client = pymongo.MongoClient(mongo_uri)
db = client.get_database()
collection_name = 'users'

data = db[collection_name].find()
for new_data in data:
      personality: new_data['personality']
      work_scenerio: new_data['work_scenerio']
      field_interest: new_data['field_interest']
      academics: new_data['academics']
      analytics: new_data['analytics']
      general_science: new_data['general_science']

new_data_df = pd.DataFrame(new_data, index=[0])

predictions = rf.predict(new_data_df[features])

# Get top 5 career recommendations  
top_scores = sorted(predictions[0],reverse=True)[:5]
top_careers = [careers[i] for i in np.argsort(predictions[0])[-5:]]
#max_score = np.max(y_train.values)
#percentages = [score/max_score * 100 for score in top_scores]
percentages = [score/.97 * 100 for score in top_scores]

for i in range(1,6):
  print(f"{i}. {top_careers[-i]} ({percentages[i-1]:.1f}%)")