import db from "./dbInit";

let connectionTries = 0;

export function dbConnection() {
  db.connect((err: Error) => {
    if (err) {
      console.log("Connection with database was not established:", err);
      if (connectionTries < 3) {
        connectionTries += 1;
        setTimeout(dbConnection, 7000);
      } else {
        console.log("client cann't connect");
      }
      return;
    }
    connectionTries = 0;
    console.log("Connection with database was established");
  });

  db.on("error", (err) => {
    console.log("Database error", err);
    if (err.code == "PROTOCOL_CONNECTION_LOST") {
      console.log("Connection with database was lost");
      dbConnection();
    }
  });
}
