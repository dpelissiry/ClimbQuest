import pandas as pd
from sqlalchemy import create_engine
import sqlite3

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
        sql = "UPDATE boulder SET CAST(height AS INTEGER)  "
        cursor.execute(sql)
        db.commit()
        print(cursor.fetchone())


def add_table():
    with sqlite3.connect("climb.db") as db:
        cursor = db.cursor()
        sql = """ CREATE TABLE search (
            id INTEGER PRIMARY KEY,
            query TEXT,
            type TEXT,
            rows TEXT
        ); """
        cursor.execute(sql)
        db.commit()

import sqlite3

def delete_table():
    try:
        with sqlite3.connect("climb.db") as db:
            cursor = db.cursor()
            sql = "DROP TABLE IF EXISTS search"
            cursor.execute(sql)
            db.commit()
    except sqlite3.Error as e:
        print(f"An error occurred: {e}")

#add_table()


delete_table()
add_table()

