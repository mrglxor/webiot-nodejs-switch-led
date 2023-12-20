import express from "express";
import si from "systeminformation";
import network from "network";

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
    const systemInfo = await si.system();
    const osInfo = await si.osInfo();
    const ipConfig = await getIPAddress();

    const deviceInfo = {
      type: systemInfo.model,
      name: osInfo.distro,
      ipConfig: ipConfig,
      currentTime: new Date().toISOString()
    };

    res.json({
      data: {
        message: "Welcome to the RESTful API of WebIot.",
        api: "Switch LED",
        status: "OK",
        currentDevice: deviceInfo
      },
      author: "Muhamad Farhan",
      github: "https://github.com/mrglxor"
    });
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
