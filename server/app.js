const express = require("express");
const bodyParse = require("body-parser");
const { Pool } = require("pg");
const cors = require("cors");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "react",
  password: "Dawid1234",
  port: 5432,
});

const app = express();
app.use(bodyParse.json());

app.use(
  bodyParse.urlencoded({
    extended: true,
  })
);
app.use(cors());

app.post("/addpost", (req, res) => {
  const { firstName, lastName, age } = req.body;

  pool.query(
    "INSERT INTO users VALUES ($1,$2,$3,$4)",
    [Date.now() - 1612000000000, firstName, lastName, age],
    () => {
      return res.status(200).json({ message: "added" });
    }
  );
});

app.use("/getposts", (req, res) => {

  pool.query(
    "select * from users",
    (dbErr, dbRes) => {
      if(dbErr){
          return res.status(400).json({ message: "error" });
      }else{
          return res.status(200).json({rows:dbRes.rows})
      }
    }
  );
});

app.listen(4000, () => {
  console.log("listening");
});
