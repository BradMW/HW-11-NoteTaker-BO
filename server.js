const express = require('express');
const path = require('path');
const fs = require('fs');
const db = require('./db/db.json');
const { v4: uuidv4 } = require('uuid');
const { readFromFile, readAndAppend } = require('./helpers/fsUtils');



const PORT =  process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.static('public'));


app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);


app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('/api/notes', (req, res) => {
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
});

app.post('/api/notes', (req, res) => {
  console.log(req.body);

  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      note_id: uuidv4(),
    };

    readAndAppend(newNote, './db/db.json');
    res.json(`Note added successfully 🚀`);
  } else {
    res.error('Error in adding Note');
  }
});


app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
