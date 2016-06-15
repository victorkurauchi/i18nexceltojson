'use strict';

const XLSX = require('xlsx');
const _ = require('underscore');
const fs = require('fs');

let workbook = XLSX.readFile('lang.xlsx');
var first_sheet_name = workbook.SheetNames[0];
 
/* Get worksheet */
var worksheet = workbook.Sheets[first_sheet_name];
var headers = {};
var data = [];

for (var z in worksheet) {
  if(z[0] === '!') continue;
  //parse out the column, row, and value
  var col = z.substring(0,1);
  var row = parseInt(z.substring(1));
  var value = worksheet[z].v;

  //store header names
  if(row == 1) {
      headers[col] = value;
      continue;
  }

  if(!data[row]) data[row]={};
  data[row][headers[col]] = value;
}

//drop those first two rows which are empty
data.shift();
data.shift();

var transformed = {};

_.each(data, (value, key, list) => {
  _.each(value, (v, k, l) => {
    transformed[list[key]['pt-br']] = list[key]['english']
  }); 
})


fs.writeFileSync('en.json', JSON.stringify(transformed));
