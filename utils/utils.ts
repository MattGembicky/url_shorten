import db from "./dbInit";

export function dbConnection(){
  db.connect((err: Error) => {
    if(err){
      console.log("Connection with database was not established:", err);
      setTimeout(dbConnection, 7000);
      return;
    }
    console.log("Connection with database was established");
  });

  db.on("error", (err) => {
    console.log("Database error", err);
    if(err.code == "PROTOCOL_CONNECTION_LOST"){
      console.log("Connection with database was lost");
      dbConnection();
    }
  });
}
