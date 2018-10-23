const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const counter = require('./counter');
const express = require('express');
const app = express();
const url = require('url');


// var items = {};

// Public API - Fix these CRUD functions ///////////////////////////////////////

exports.create = (text, callback) => {
  //app.post('./data', (req, res, next) => {
    counter.getNextUniqueId((err, id) => {
      var newPath = path.join(exports.dataDir, id + '.txt');
      fs.writeFile(newPath, text, (err) => {
      if(err) {
        throw err;
      } else {
        // res.send('File Written!');
        callback(null, { id, text });
      }
    });
    });

    //next();
  //});
  /*
    On a post request
      get next unique ID
      create a new file with uniqueID as file name using the fs module, containing only the todo text
      save to the data directory path
  */
  // var id = counter.getNextUniqueId();
  // items[id] = text;
};

exports.readAll = (callback) => {
  // var data = [];
  // _.each(items, (text, id) => {
  //   data.push({ id, text });
  // });
  // callback(null, data);
  /*
  create empty array
  readDir passing in exports.dataDir, err, list of items
    if err throws error
    else return data.map returning an object containing id and text
  */
 var data = [];
  fs.readdir(exports.dataDir, (err, items) => {
    if (err) {
      throw err;
    } else {
    // console.log('Data',items);
      //var test = items.map(item => {
      // console.log('item here',item,'type of', typeof item);
      //   return {
      //     id: items.slice(0,5),
      //     text: items.slice(0,5)
      //   };
      // });
      console.log('items', items)
      items.forEach(item => {
        data.push({id: item.slice(0, 5), text: (item.slice(0, 5))});
      });
      callback(null, data);
    }
  });
};

exports.readOne = (id, callback) => {
  var text = items[id];
  if (!text) {
    callback(new Error(`No item with id: ${id}`));
  } else {
    callback(null, { id, text });
  }
};

exports.update = (id, text, callback) => {
  var item = items[id];
  if (!item) {
    callback(new Error(`No item with id: ${id}`));
  } else {
    items[id] = text;
    callback(null, { id, text });
  }
};

exports.delete = (id, callback) => {
  var item = items[id];
  delete items[id];
  if (!item) {
    // report an error if item not found
    callback(new Error(`No item with id: ${id}`));
  } else {
    callback();
  }
};

// Config+Initialization code -- DO NOT MODIFY /////////////////////////////////

exports.dataDir = path.join(__dirname, 'data');

exports.initialize = () => {
  if (!fs.existsSync(exports.dataDir)) {
    fs.mkdirSync(exports.dataDir);
  }
};
