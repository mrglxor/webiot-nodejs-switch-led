import express from "express";

import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { promises as fs } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const publicRouter = express.Router();

publicRouter.get('/', async (req, res) => {
  try {
    const indexPath = path.join(__dirname, '../public', 'index.html');
    const fileContent = await fs.readFile(indexPath, 'utf-8');
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
