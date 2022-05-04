import express from "express";
import axios from "axios";
const app = express();
import cors from "cors";
import { dbConnection } from "./utils/utils";
import { QueryReturn, shorten, getFullUrl } from "./modules/Database";
import { FileWatcherEventKind } from "typescript";

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log("Server running on port:", PORT);
  dbConnection();
});

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.post("/shorten", async (req, res) => {
  let url: string = req.body.fullUrl;
  try {
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      url = "https://" + url;
    }
    await axios(url);
  } catch (e) {
    res.send({ short: undefined });
    return undefined;
  }

  shorten(url, (result: string): QueryReturn => {
    res.send({ short: result });
    return undefined;
  });
});

app.post("/redirect", async (req, res) => {
  let url: string = req.body.shortUrl;

  getFullUrl(url, (result: string): QueryReturn => {
    res.send({ fullUrl: result });
    return undefined;
  });
});
