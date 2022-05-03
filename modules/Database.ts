import db from "../utils/dbInit";
import md5 from "md5";
import { MysqlError, queryCallback } from "mysql";

//types
export type QueryReturn = queryCallback | undefined | string;

function getShortUrl(url: string, callback: any) {
  const existenceQuery = "SELECT * FROM Urls WHERE short LIKE ?";

  let short = md5(url).slice(-7);
  db.query(existenceQuery, short, (err, res): QueryReturn => {
    console.log(short, res);
    if (err) {
      console.log(err);
      return undefined;
    }
    if (res.length === 0) {
      return callback(short);
    }
    // todo
  });
}

export const shorten = (
  url: string,
  callback: (value: string) => QueryReturn
) => {
  const existenceQuery = "SELECT * FROM Urls WHERE url LIKE ?";
  const insertationQuery = "INSERT INTO Urls(url, short) VALUES (?, ?)";

  db.query(existenceQuery, url, (err, res): QueryReturn => {
    if (err) {
      console.log(err);
      return;
    }
    if (res.length !== 0) {
      return callback(res[0].short);
    }
    getShortUrl(url, (short: string): QueryReturn => {
      db.query(insertationQuery, [url, short], (err: MysqlError | null) => {
        if (err) {
          console.log(err);
        }
      });
      return callback(short);
    });
  });
};
