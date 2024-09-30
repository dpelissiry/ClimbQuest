import { gpt } from "./gpt_requests.js";
import express from 'express';
import { join, dirname } from 'path';
import sqlite3 from 'sqlite3';
import cors from 'cors';
import { test } from './test.js'


// Open a database in read-only mode
const db = new sqlite3.Database('./climb.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error('Error opening database', err.message);
    return;
  }
  console.log('Connected to the climb database.');
});


const app = express();
const PORT = 3000;
const __dirname = dirname(new URL(import.meta.url).pathname); //dirname wasnt found since im not using regular js


app.listen(process.env.PORT || PORT, () => console.log(`Listening on http://localhost:${PORT}`));
app.use(express.json());//static('public')); //tell express static files are in public directory
app.use(cors())

app.post('/search', async (request, response) => {
  console.log(request.body)
  const { type, query } = request.body;
  const result = await getRequest(query, type); //testing
  console.log(result)
  response.json(result)
});

//query pop search
app.post('/pop-search', async (request, response) => {
  try {
    const { type } = request.body;
    const result = await querySearchDatabase(type);
    console.log(result.length)
    response.json(result.slice(result.length - 10, result.length));
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});

async function testGetRequest(msg, type) {
  const result = test;//await gpt(msg, type);
  return createResponse(200, "Success", result) //testing
}

async function getRequest(msg, type) {
  console.log(msg, type);
  // Assume preprocessUserQuery now returns true/false
  if (!msg || !preprocessUserQuery(msg)) {
    return createResponse(400, "Invalid user query")
  }

  try {
    const result = await gpt(msg, type);

    const query = result['message']['content'];
    console.log(query);

    // Assume preprocessGptQuery now returns true/false
    if (!preprocessGptQuery(query)) {
      return createResponse(400, "GPT-generated query is invalid");
    }

    const rows = await queryClimbDatabase(query);
    appendToTrainingData(msg, query, type)
    appendToSearchDatabase(msg, type, rows)
    return createResponse(200, "Success", rows)
  } catch (error) {
    console.error("Error in getRequest:", error);
    return createResponse(500, "Server error processing the request");
  }
}

function createResponse(code = false, message = "", data = null) {
  return {
    code: code,
    message: message,
    data: data
  };
}

function queryClimbDatabase(query) {
  return new Promise((resolve, reject) => {
    db.all(query, [], (err, rows) => {
      if (err) {
        console.error(err.message);
        reject(err);
      } else {
        // console.log(rows);
        resolve(rows);
      }
    });
  });
}

function querySearchDatabase(type) {
  const top10 = "SELECT * FROM search WHERE id IN (SELECT MIN(id) FROM search GROUP BY query)"
  return new Promise((resolve, reject) => {
    db.all(top10, [], (err, rows) => {
      if (err) {
        console.error(err.message);
        reject(err);
      } else {
        //console.log(rows);
        resolve(rows);
      }
    });
  });
}

async function appendToSearchDatabase(query, type, rows) {
  if (rows.length == 0) return;
  rows = rows.slice(0, 10);
  db.run(`INSERT INTO search (query, type, rows) VALUES(?, ?, ?)`, [query, type, JSON.stringify(rows)], (err) => {
    if (err) {
      return console.log(err.message);
    }
    // get the last insert id
    console.log("A row has been inserted");
  });
}

function preprocessGptQuery(query) {
  if (query.includes("SELECT")) {
    return true
  }
  return false
}

function preprocessUserQuery(query) {
  if (query.length > 0) {
    return true
  }
  return false
}

function appendToTrainingData(input, output, type) {

  db.run(`INSERT INTO training_data (input, output, type) VALUES(?, ?, ?)`, [input, output, type], (err) => {
    if (err) {
      return console.log(err.message);
    }
    // get the last insert id
    console.log("Training data inserted");
  });
}