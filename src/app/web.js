import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import publicRouter from "../route/public.route.js";
import ledRouter from "../route/led.route.js";

dotenv.config();

const web = express();

web.use(express.json());
web.use(cors());

web.use('/',publicRouter);

web.use('/api',ledRouter);


export default web;