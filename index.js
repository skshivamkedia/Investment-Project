// index.js
const express = require('express');
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";
require('dotenv').config();


const app = express();
const port = 3000;

app.get('/', (req, res) => {
//   getHistoricalData();
    createMessage();
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

// const fetch = require('node-fetch'); // Only needed if you're using an older version of Node.js

const getHistoricalData = async () => {
  try {
    const response = await fetch('https://api.upstox.com/v2/historical-candle/BSE_INDEX|SENSEX/day/2025-01-05/2024-12-08', {
      method: 'GET',
      headers: {
        'Accept': 'application/json', // Replace with your actual access token
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    const json = data.data;
    let min = 200000;
    let lastvaluesensex = 0;
    let bool = true;
    for(const item of json.candles){
        if(item[4]<=min){
            min = item[4];
        }
        if(bool){
            lastvaluesensex = item[4];
            bool = false;
        }
    }
    if(min===lastvaluesensex){
        console.log("Invest");
    }else{
        console.log("Boring day");
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

// Download the helper library from https://www.twilio.com/docs/node/install

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createMessage() {
  const message = await client.messages.create({
    body: "Hi there",
    from: "+16087369841",
    to: "+919693282570",
  });

  console.log(message.body);
}




