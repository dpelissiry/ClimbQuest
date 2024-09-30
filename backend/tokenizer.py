from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
import sqlite3


with sqlite3.connect("climb.db") as db:
    cursor = db.cursor()
    sql = "SELECT input FROM training_data WHERE type = 'Boulder'"
    cursor.execute(sql)
    inputs = [i for l in cursor.fetchall() for i in l]


tokenizer = Tokenizer(num_words = 100)
tokenizer.fit_on_texts(inputs)
word_index = tokenizer.word_index

sequences = tokenizer.texts_to_sequences(inputs)

padded = pad_sequences(sequences)
print(word_index)
print(sequences)
print(padded)