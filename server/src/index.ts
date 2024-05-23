// PWD : @Abdi1234@

import express, { Express } from "express";
import financialRecordRouter from "./routes/financial-records";
import mongoose from "mongoose";
import cors from "cors";

const app: Express = express();

app.use(
  cors({
    methods: ["GET", "POST", "PUT", "DELETE"],
    origin: "*",
  })
);
const PORT = process.env.PORT || 3001;

app.use(express.json());

const MongoURI: string =
  "mongodb+srv://engshakrayare114:WOA8hsP6Mp8vdoUF@cluster0.qrc1vm3.mongodb.net/financialRecord?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(MongoURI)
  .then(() => console.log("Connected"))
  .catch((err) => console.log("Failed to Connect MongoDB!"));

app.use("/financialRecord", financialRecordRouter);
app.listen(PORT, () => console.log("connected to server!"));
