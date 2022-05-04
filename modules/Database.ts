import db from "../utils/dbInit";
import md5 from "md5";
import { MysqlError, queryCallback } from "mysql";

//types
export type QueryReturn = queryCallback | undefined | string;
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
  callback: (value: UrlReturn) => QueryReturn
) {
  const EXISTENCEQUERY =
    "SELECT * FROM Urls WHERE short LIKE ? ORDER BY date_added DESC";
  let short = md5(url).slice(-7);
  db.query(EXISTENCEQUERY, "%" + short + "%", (err, res): QueryReturn => {
    console.log(short, res);
    if (err) {
      console.log(err);
      return callback(undefined);
    }
    if (res.length === 0) {
      return callback(short);
    }
    // it may happen but very ulikely
    const end = res[0].short.slice(7).split("");
    return short + getNewEnding(end);
  });
}

export const shorten = (
  url: string,
  callback: (value: UrlReturn) => QueryReturn
) => {
  const EXISTENCEQUERY = "SELECT * FROM Urls WHERE short LIKE ?";
  const hash = md5(url).slice(-7);

  db.query(EXISTENCEQUERY, hash + "%", (err, res): QueryReturn => {
    console.log(res);
    if (err) {
      console.log(err);
      return callback(undefined);
    }
    if (res.length > 0) {
      if (res.length === 1) {
        return callback(res[0].short);
      }
      res.forEach((record: any) => {
        if (record.url === url) {
          return callback(record.short);
        }
      });
    }

    createShortUrl(url, (short: UrlReturn): QueryReturn => {
      const INSERTATIONQUERY = "INSERT INTO Urls(url, short) VALUES (?, ?)";
      db.query(INSERTATIONQUERY, [url, short], (err: MysqlError | null) => {
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
  callback: (value: UrlReturn) => QueryReturn
) => {
  const EXISTENCEQUERY = "SELECT * FROM Urls WHERE url LIKE ?";
  db.query(EXISTENCEQUERY, url, (err, res): QueryReturn => {
    if (err) {
      console.log(err);
      return callback(undefined);
    }
    if (res.length !== 0) {
      return callback(res[0].url);
    }
    return callback(null);
  });
};
