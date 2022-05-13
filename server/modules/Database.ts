import { db } from "../utils/dbInit";
import md5 from "md5";

//types
type Record = {
  short: string;
  url: string;
  date_added: string;
};
type QueryResult = Array<Record>;
export type UrlReturn = string | null | undefined;

//charset
import charset from "./charset.json";
const CHARSET = charset.charset;

function getNewEnding(characters: Array<string>) {
  // handle all nines
  const nines = characters.reduce(
    (count, v) => (v === CHARSET[CHARSET.length - 1] ? count + 1 : count),
    0
  );
  if (nines === characters.length) {
    return Array(characters.length + 1).fill(CHARSET[0]);
  }

  // add
  let result = [...characters];
  for (let i = characters.length - 1; i >= 0; i--) {
    if (result[i] === CHARSET[CHARSET.length - 1]) {
      result[i] = CHARSET[0];
      continue;
    }
    result[i] = CHARSET[CHARSET.indexOf(result[i]) + 1];
    break;
  }
  return result;
}

function createShortUrl(
  url: string,
  callback: (value: UrlReturn) => undefined
) {
  const EXISTENCEQUERY =
    "SELECT * FROM Urls WHERE short LIKE ? ORDER BY date_added DESC";
  let short = md5(url).slice(-7);
  db.query(EXISTENCEQUERY, short + "%", (err, rows, fields) => {
    const result: QueryResult = Object.values(JSON.parse(JSON.stringify(rows)));
    if (err) {
      console.log(err);
      return callback(undefined);
    }
    if (result.length === 0) {
      return callback(short);
    }
    //this may happen but very ulikely
    const end = result[0].short.slice(7).split("");
    return short + getNewEnding(end);
  });
}

export const shorten = (
  url: string,
  callback: (value: UrlReturn) => undefined
) => {
  const EXISTENCEQUERY = "SELECT * FROM Urls WHERE short LIKE ?";
  const hash = md5(url).slice(-7);

  db.query(EXISTENCEQUERY, hash + "%", (err, rows, fields) => {
    const result: QueryResult = Object.values(JSON.parse(JSON.stringify(rows)));
    if (err) {
      console.log(err);
      return callback(undefined);
    }
    if (result.length > 0) {
      result.forEach((record: Record) => {
        if (record.url === url) {
          return callback(record.short);
        }
      });
    }

    createShortUrl(url, (short: UrlReturn) => {
      const INSERTATIONQUERY = "INSERT INTO Urls(url, short) VALUES (?, ?)";
      db.query(INSERTATIONQUERY, [url, short], (err) => {
        if (err) {
          console.log(err);
          return callback(undefined);
        }
        if (short!.length > 16) {
          return callback(null);
        }
      });
      return callback(short);
    });
  });
};

export const getFullUrl = (
  url: string,
  callback: (value: UrlReturn) => void
) => {
  const EXISTENCEQUERY = "SELECT * FROM Urls WHERE short LIKE ?";
  db.query(EXISTENCEQUERY, url, (err, rows, fields) => {
    const result: QueryResult = Object.values(JSON.parse(JSON.stringify(rows)));
    if (err) {
      console.log(err);
      return callback(undefined);
    }
    if (result.length === 1) {
      return callback(result[0].url);
    }
    return callback(null);
  });
};
