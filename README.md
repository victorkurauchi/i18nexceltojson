# i18nexceltojson
Create a .json based on an existent .xlsx translated sheet (i18n utils)

## Context
Considering you need to create .json where the key is your original idiom and the value is the translated idiom. You have a excel sheet where someone translated all the words/sentences, having a header with both idioms.

Running this script you'll be able to output the desired json.

## Why ?
Because if you end up using node-i18n, you'll probably want to use this lib.

## Running

`node index.js --destiny=espanol --input=espanol.xlsx --output=es.json`

## Properties

*destiny* it's the translated columns header (example: we want to translate to spanish, and the .xlsx needs to contain this header name)

*origin* it's our origin language (.xlsx file needs to contain this header name)

*input* .xlsx file location 

*output* our translated file in json