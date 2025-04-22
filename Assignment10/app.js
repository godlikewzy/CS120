const express = require('express');
const { MongoClient } = require('mongodb');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3010;

const uri = 'mongodb+srv://zwu08:test01@cluster0.p2rjzyt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const dbName = 'CS120';
const collectionName = 'places';

app.use(express.static(__dirname));

let db;

MongoClient.connect(uri)
  .then(client => {
    db = client.db(dbName);
    console.log("Connected to MongoDB");
  })
  .catch(err => console.error(err));

app.get('/search', async (req, res) => {
  const input = (req.query.q || "");

  try {
    let result;
    if (/^\d/.test(input)) {
      result = await db.collection(collectionName).findOne({ zips: input });
    } else {
      result = await db.collection(collectionName).findOne({ place: input });
    }

    if (!result) {
      return res.json({ error: "No result found." });
    }

    console.log('Search result:', result);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
