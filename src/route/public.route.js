import express from "express";
import si from "systeminformation";
import network from "network";

import path from "path";
import fs from "fs";

const publicRouter = express.Router();

async function getIPAddress() {
  return new Promise((resolve, reject) => {
    network.get_private_ip((err, ip) => {
      if (err) {
        reject(err);
      } else {
        resolve(ip);
      }
    });
  });
}

publicRouter.get('/', async (req, res) => {
  try {
    const indexPath = path.join(__dirname, '../public', 'index.html');
    const fileContent = await fs.promises.readFile(indexPath, 'utf-8');
    res.send(fileContent);
  } catch (error) {
    console.error('Error fetching system information:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

publicRouter.get('/api',(req,res) => {
  res.json({
    "api":"main",
    "feature": {
      "switchled": {
        "no":1,
        "rute":"/api/led",
        "level":"production"
      },
      "smarthome": {
        "no":2,
        "rute":"/api/smarthome",
        "level":"development"
      },
      },
  })
});

export default publicRouter;
