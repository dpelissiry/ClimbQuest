import pandas as pd
from sqlalchemy import create_engine
import sqlite3
import csv

def create_db():
    # Replace 'your_file.csv' with the path to your CSV file
    csv_file = '..\\data\\master_boulders.csv'
    # This will create an SQLite database named 'database.db' in your current working directory
    database_name = 'sqlite:///climb.db'

    # Read your CSV file into a pandas DataFrame
    df = pd.read_csv(csv_file)

    # Create the SQLite database and connect to it
    engine = create_engine(database_name)

    # Convert the DataFrame to an SQL table within the database
    # Replace 'your_table_name' with the desired table name for your data
    df.to_sql('boulder', engine, if_exists='replace', index=False)

def edit_db():
     with sqlite3.connect("climb.db") as db:
        cursor = db.cursor()
        sql = "UPDATE boulder SET CAST(height AS int)  "
        cursor.execute(sql)
        db.commit()
        print(cursor.fetchone())


def add_csv():
    with sqlite3.connect("climb.db") as db:
        with open ("C:\\Users\\dpeli\\OneDrive\\Python\\mp_scraper\\scraping\\master_combined_youtube.csv", 'r', encoding="utf-8") as f:
            
            df = pd.read_csv(f)
            df['rating'].astype('float')
            df['height'] = pd.to_numeric(df['height'], errors='ignore')
            df['num_votes'] = pd.to_numeric(df['num_votes'], errors='ignore')
            print(df.info())
            df.to_sql('boulder', db, if_exists='replace', index=False)

def add_table():
    with sqlite3.connect("climb.db") as db:
        cursor = db.cursor()
        sql = """ CREATE TABLE training_data(
            id INTEGER PRIMARY KEY,
            input TEXT,
            output TEXT,
            type TEXT
        ); """
        cursor.execute(sql)
        db.commit()


def delete_table():
    try:
        with sqlite3.connect("climb.db") as db:
            cursor = db.cursor()
            sql = "DROP TABLE IF EXISTS training_data"
            cursor.execute(sql)
            db.commit()
    except sqlite3.Error as e:
        print(f"An error occurred: {e}")
# delete_table()
# add_table()

# edit_db()
# delete_table()
# add_table()
add_csv()

