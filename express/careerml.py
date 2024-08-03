import pandas as pd
import numpy as np
import json
import sys
from sklearn.ensemble import RandomForestRegressor 
from sklearn.metrics import mean_absolute_error
from sklearn.model_selection import train_test_split

def careerml(user_data):
# Load dataset 
      df = pd.read_csv('training_set1.csv')

      # Define features
      features = ['personality', 'work_scenerio', 'field_interest', 'academics', 'analytics','general_science'] 

      # Get list of careers 
      careers = df.columns[8:] 
      careerss = {}
     # percentage = []

      # Split data
      X_train, X_test, y_train, y_test = train_test_split(df[features], df[careers], test_size=0.2, random_state=0)

      # Train model
      rf = RandomForestRegressor(n_estimators=100, random_state=1)
      rf.fit(X_train, y_train) 

      # Evaluate model
      predictions = rf.predict(X_test)
      mae = mean_absolute_error(y_test, predictions)
      print('MAE:', mae)

      # Make predictions
      new_data = {
            'personality': user_data[0],
            'work_scenerio': user_data[1], 
            'field_interest': user_data[2],
            'academics': user_data[3],
            'analytics': user_data[4],
            'general_science': user_data[5],
      } 

      new_data_df = pd.DataFrame(new_data, index=[0])

      predictions = rf.predict(new_data_df[features])

      # Get top 5 career recommendations  
      top_scores = sorted(predictions[0],reverse=True)[:6]
      top_careers = [careers[i] for i in np.argsort(predictions[0])[-5:]]
      #max_score = np.max(y_train.values)
      #percentages = [score/max_score * 100 for score in top_scores]
      percentages = [score/.97 * 100 for score in top_scores]

      for i in range(1,6):
            careerss[top_careers[-i]]=percentages[i-1]
            print(f"{i}. {top_careers[-i]} ({percentages[i-1]:.1f}%)")
      return careerss

if __name__ == '__main__':
    #user_data =json.loads(sys.argv[1])
    user_data = [2, 1, 1, 2, 1, 1]
    output_data = careerml(user_data)
    print(json.dumps(output_data))

