import express from "express";
const app = express();
import cors from "cors";
import axios from "axios";
import { shorten, getFullUrl, UrlReturn } from "./modules/Database";

const PORT = process.env.PORT || 8001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log("Server running on port:", PORT);
});

app.post("/shorten", async (req, res) => {
  let url: string = req.body.fullUrl;
  try {
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      url = "https://" + url;
    }
    await axios(url);
  } catch (e) {
    res.status(400).send();
    return undefined;
  }
  console.log("compiled url:", url);

  shorten(url, (result: UrlReturn) => {
    // database error
    if (result !== undefined) {
      // validation error
      if (result !== null) {
        res.send({ valid: true, short: result });
      } else {
        res.send({ valid: false, errorNumber: 202 });
      }
    } else {
      res.send({ valid: false, errorNumber: 100 });
    }
    return undefined;
  });
});

app.post("/redirect", async (req, res) => {
  let url: string = req.body.shortUrl;

  getFullUrl(url, (result: UrlReturn) => {
    if (result !== undefined) {
      if (result !== null) {
        res.send({ found: true, fullUrl: result });
      } else {
        res.status(404).send();
      }
    } else {
      res.send({ found: false, errorNumber: 100 });
    }
    return;
  });
});
