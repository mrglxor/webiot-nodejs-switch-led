import express from "express";
import ledController from "../controller/led.controller.js";

const ledRouter = express.Router();

ledRouter.get('/led',ledController.getState);
ledRouter.post('/led',ledController.setState);

export default ledRouter;