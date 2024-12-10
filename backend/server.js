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

const isDev = process.argv.includes('--dev');

if (isDev){ console.log("DEV MODE") }

const app = express();
const PORT = 3000;
const __dirname = dirname(new URL(import.meta.url).pathname); //dirname wasnt found since im not using regular js


app.listen(process.env.PORT || PORT, () => console.log(`Listening on http://localhost:${PORT}`));
app.use(express.json());//static('public')); //tell express static files are in public directory
app.use(cors())

app.post('/search', async (request, response) => {
  console.log(request.body)
  const { type, query, bbox, bboxEnabled } = request.body;

  let result
  if (isDev){
    result = await testGetRequest();
    
  }else{
    result = await getRequest(query, type, JSON.parse(bbox), bboxEnabled); //testing
  }
    // console.log(result)
  console.log(JSON.parse(request.body.bbox)[0])//.forEach((latlng) => console.log(latlng))
  response.json(result)
});

//query pop search
app.post('/pop-search', async (request, response) => {
  try {
    const { type } = request.body;
    const result = await querySearchDatabase(type);
    response.json(result.slice(result.length - 10, result.length));
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});


app.post('/descriptions', async (request, response) => {
  try{
    
  }
  catch(error){

  }
})

app.post('/training', async (request, response) => {
  try{

  }
  catch(error){

  }
})

async function testGetRequest() {
  const result = test;//await gpt(msg, type);
  return createResponse(200, "Success", result) //testing
}

async function getRequest(msg, type, bbox, bboxEnabled) {
  // console.log(msg, type, bbox, bboxEnabled);

  /* Response if user enters empty request */
  if (!msg || !preprocessUserQuery(msg)) {
    return createResponse(400, "Invalid user query")
  }

  try {
    const result = await gpt(msg, type);

    let query = result['message']['content'];
    console.log(query);

    /* Remove reference to LOCATION in SQL query if bbox is enabled */

    if (!preprocessGptQuery(query)) {
      return createResponse(400, "GPT-generated query is invalid");
    }
    query = processGptQuery(query, bboxEnabled);
    let rows = await queryClimbDatabase(query);
    appendToTrainingData(msg, query, type)
    appendToSearchDatabase(msg, type, rows)

    rows = checkInBoundingBox(rows, bboxEnabled, bbox);

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
  return query.includes("SELECT")

}

function preprocessUserQuery(query) {
  return query.length > 0
}

function processGptQuery(query, bboxEnabled){
  if(!bboxEnabled){
    return query
  }

  let no_paren_sub = query.match(/location.*%'/)
  let paren_sub = query.match(/\(location.*?\)/)

  /* Check if multiple location queries in parens */

  if(paren_sub){
    query = query.slice(0,paren_sub.index) + query.slice((paren_sub.index+paren_sub[0].length))
  
    query = query.replace(/WHERE\s*ORDER/, 'ORDER');
    query = query.replace(/WHERE\s*;/, ''); // Removes empty WHERE at the end
    query = query.replace(/AND\s*ORDER/, 'ORDER');
    query = query.replace(/AND\s*;/, '');  // Removes empty AND at the end
  }
  /* Match to all locations starting with AND */
  if (no_paren_sub){

    /* Match to all locations starting and ending with AND */ 
    query = query.slice(0,no_paren_sub.index) + query.slice((no_paren_sub.index+no_paren_sub[0].length))
  
    query = query.replace(/WHERE\s*ORDER/, 'ORDER');
    query = query.replace(/WHERE\s*;/, ';'); // Removes empty WHERE at the end
    query = query.replace(/AND\s*ORDER/, 'ORDER');
    query = query.replace(/AND\s*;/, ';');  // Removes empty AND at the end
  }


  console.log("Processed Query: " + query)
  return query
}

function checkInBoundingBox(rows, bboxEnabled, bbox){
  if(!bboxEnabled){
    return rows
  }
  console.log(rows)
  let new_rows = []
  console.log(bbox[1])
  bbox.forEach((box,i) => {
    rows.forEach(element => {
      let lat = element['Area Latitude']
      let lng = element['Area Longitude']
      if(((lat <= bbox[i][0].lat && lat >= bbox[i][1].lat) || (lat <= bbox[i][1].lat && lat >= bbox[i][0].lat)) &&
          ((lng <= bbox[i][1].lng && lng >= bbox[i][0].lng) || (lng <= bbox[i][0].lng && lng >= bbox[i][1].lng))){
            new_rows.push(element)
          }
    });
  });
  return new_rows
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




// TRAINING STUFF

function pull_desc(){
  db.run(`SELECT rowid, description FROM boulder WHERE tags IS NULL`, err => {
    
  })
}

function appendTag(id, tags){
  db.run(``)
}
