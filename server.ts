const express = require('express');
const bodyParser = require('body-parser');
const app = express();
// const cors = require('cors');
//
const MongoClient = require('mongodb').MongoClient;
const mongodb = require('mongodb');

let ObjectID = mongodb.ObjectID;

const connection_string = process.env.CONNECTION_STRING;
if (!connection_string) {
  console.log('no connection string for db provided');
  process.exit(1)
}
//
let db;
let itemsCollection;

// app.use(cors);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.all('/*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/', (request, response) => {
  response.send('Hello from Express!')
});

app.get('/items', (req, res) => {
  console.log('get all');
  itemsCollection.find({}).toArray((err, result) => {
    if (err) {
      console.log(`error!`);
      res.status(404).send('we have faiced some issues');
    } else {
      res.status(200).send(result)
    }
  });
});

app.get('/items/:id', (req, res) => {
  itemsCollection.findOne({_id: new ObjectID(req.params.id.toString())}, (err, result) => {
    if (err) {
      res.status(500).send('ups we have error');
    } else {
      res.status(200).send(result);
    }
  });
});

app.post('/items', (req, res) => {
  console.log(`post na item`, req.body);

  itemsCollection.insertOne(req.body, (err, result) => {
    if (err) {
      res.status(500).send('not saved in database')
    } else {
      res.status(201).send(result.ops[0]);
      console.log('saved to database');
    }
  });
});

app.put('/items/:id', (req, res) => {
  itemsCollection.updateOne({_id: new ObjectID(req.params.id.toString())},
    { $set: { "item" : req.body.item } }, (err, result) => {
      if (err) {
        res.status(500).send('not saved in database')
      } else {
        res.status(201).send(result.ops[0]);
        console.log('saved to database');
      }
    });
});

app.delete('/items/:id', (req, res) => {
  itemsCollection.deleteOne({_id: new ObjectID(req.params.id.toString())}, (err, result) => {
    if (err) {
      res.status(500).send('ups we have error');
    } else {
      console.log('result', result);
      res.status(200).send();
    }
  })
});

MongoClient.connect(`${connection_string}`, {useNewUrlParser: true}, (err, database) => {
  if (err) {
    console.error(`error`, err);
    process.exit(1);
  }

  db = database.db('todo-list');
  itemsCollection = db.collection('todo-list-items');

  app.listen(3000, () => {
    console.log('listening on 3000');
  });
});

