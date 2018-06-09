/**
 * This script generates mock data for local development
 */

const fetch = require('node-fetch');
const fs = require('fs');

const API_ER_URL = 'http://192.168.0.78:4000/er';
const API_DATA_URL = 'http://192.168.0.78:4000/data';
const DATA_MOCK_QUERY = {
  link: {
    entity: 'GD_USER',
    alias: 'U',
    fields: [
      {
        attribute: 'CONTACTKEY',
        link: {
          entity: 'Person',
          alias: 'P',
          fields: [
            {
              attribute: 'NAME'
            }
          ]
        }
      }
    ]
  },
  options: {
    order: {
      P: {
        NAME: 'asc'
      }
    }
  }
};

const jsonDb = {};

async function getEr() {
  const response = await fetch(API_ER_URL);
  return await response.json();
}

async function getData() {
  const response = await fetch(API_DATA_URL, {
    method: 'POST',
    body: JSON.stringify(DATA_MOCK_QUERY),
    headers: { 'Content-Type': 'application/json' }
  });
  return await response.json();
}

(async function() {
  try {
    jsonDb.er = await getEr();
    jsonDb.data = await getData();

    fs.writeFile('./db.json', JSON.stringify(jsonDb), function(err) {
      if (err) return console.log(err);
      console.log('Mock data generated.');
    });
  } catch (error) {
    console.log(error);
  }
})();
