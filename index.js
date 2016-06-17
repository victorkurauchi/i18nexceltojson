'use strict';

const XLSX = require('xlsx');
const _ = require('underscore');
const fs = require('fs');
const yargs = require('yargs').argv;


// let headerOrigin = yargs.origin || 'pt-br';
// let headerDestiny = yargs.destiny || 'english';
// let input = yargs.input || 'lang.xlsx';
// let output = yargs.output || 'lang.json';

let 
[
  headerOrigin, 
  headerDestiny, 
  input, 
  output
] = 
[
  yargs.origin || 'pt-br', 
  yargs.destiny || 'english', 
  yargs.input || 'lang.xlsx', 
  yargs.output || 'lang.json'
]

let workbook = XLSX.readFile(input);
let first_sheet_name = workbook.SheetNames[0];
 
/* Get worksheet */
let worksheet = workbook.Sheets[first_sheet_name];
let headers = {};
let data = [];

for (var z in worksheet) {
  if(z[0] === '!') continue;
  //parse out the column, row, and value
  let col = z.substring(0,1);
  let row = parseInt(z.substring(1));
  let value = worksheet[z].v;

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

console.log(headerOrigin, headerDestiny);
let transformed = {};

_.each(data, (value, key, list) => {
  _.each(value, (v, k, l) => {
    // console.log(list[key]['espanol'])
    // transformed[list[key]['pt-br']] = list[key]['english']
    transformed[list[key][headerOrigin]] = list[key][headerDestiny]
  }); 
})


fs.writeFileSync(output, JSON.stringify(transformed));
