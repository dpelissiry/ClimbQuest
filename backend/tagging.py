import sqlite3

import tkinter as tk




def pull_desc():
    with sqlite3.connect("climb.db") as db:
        cursor = db.cursor()
        sql = "SELECT rowid, description FROM boulder WHERE tags IS NULL"
        res = cursor.execute(sql)
        return res.fetchone()
def add_tags(id: int, tags: list):
    with sqlite3.connect("climb.db") as db:
        cursor = db.cursor()
        tags = ','.join(tags)
        res = cursor.execute("UPDATE boulder SET tags = ? WHERE rowid = ?", (tags, id))
        db.commit()
        print(res.fetchone())

window = tk.Tk()
window.title("Tag Training")

# Create labels and entry widgets
name_label = tk.Label(window, text=pull_desc()[1])
name_label.grid(row=0, column=0)


# Create a submit button
submit_button = tk.Button(window, text="Submit")
submit_button.grid(row=1, column=0, columnspan=2)

window.mainloop()
pull_desc()
add_tags(1,['dyno', 'crimps'])