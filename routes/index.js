var express = require("express");
var router = express.Router();
var mysql = require("mysql");


router.get("/delete/:id", (req, res, next) => {
  var conn = mysql.createConnection({
    host: "jasondatabase.c7llj8gpbiqw.us-west-1.rds.amazonaws.com",
    user: "jasondatabase",
    password: "jasondatabase",
    database: "thermo",
  });

  var id = req.params.id;
  id = parseInt(id);

  if (isNaN(id)) res.send("\r\nThe entered ID must be an integer.\r\n");
  else {
    conn.connect((err) => {
      if (err) throw err;
      sql = "DELETE FROM temperatures WHERE id ='" + id + "'";
      var rows;
      conn.query(sql, (err, result) => {
        //if (err) res.send("\r\n There is no record with that value\r\n");
        if (err) res.send("\r\n I don't seem to have that ID \r\n");
        //res.send("\r\n Record " + id + " has been deleted.\r\n");
        res.send("\r\n The ID " + id + " has been deleted.\r\n");
      });
    });
  }
});



router.get("/delete", (req, res, next) => {
  var conn = mysql.createConnection({
    host: "jasondatabase.c7llj8gpbiqw.us-west-1.rds.amazonaws.com",
    user: "jasondatabase",
    password: "jasondatabase",
    database: "thermo",
  });

  conn.connect((err) => {
    if (err) throw err;
      sql = "DELETE FROM temperatures";
    var rows;
    conn.query(sql, (err, result) => {
      if (err) throw err;
      //res.send("\r\n All records have been deleted...\r\n");
      res.send("\r\n All database entries have been deleted \r\n");
    });
  });
});

router.get("/:id", function (req, res, next) {
  var conn = mysql.createConnection({
    host: "jasondatabase.c7llj8gpbiqw.us-west-1.rds.amazonaws.com",
    user: "jasondatabase",
    password: "jasondatabase",
    database: "thermo",
  });

  var id = req.params.id;
  id = parseInt(id);
  console.log(id);

  if (isNaN(id)) res.send("\r\nThe entered ID value must be an integer.\r\n");
  else {
    conn.connect((err) => {
      if (err) throw err;
        sql = "SELECT * FROM temperatures WHERE id = '" + id + "'";
      var rows;
      conn.query(sql, (err, result) => {
        if (err) throw err;

        if (result != "") {
          rows = JSON.parse(JSON.stringify(result[result.length - 1]));

          /* postTitle = rows['title'];
      postBody = rows['body']; */
          res.send(
            "\r\n" + id + ": " + rows["time"] + " " + rows["temp"] + "\r\n"
          );
          } //else res.send("\r\n There's currently no data :(\r\n");
        else res.send("\r\n The database is currently empty \r\n");
      });
    });
  }
});




router.get("/", function (req, res, next) {
  var conn = mysql.createConnection({
    host: "jasondatabase.c7llj8gpbiqw.us-west-1.rds.amazonaws.com",
    user: "jasondatabase",
    password: "jasondatabase",
    database: "thermo",
  });
  conn.connect((err) => {
    if (err) throw err;
      sql = "SELECT * FROM temperatures";
    var rows;
    conn.query(sql, (err, result) => {
      if (err) throw err;

      if (result != "") {
        rows = JSON.parse(JSON.stringify(result[result.length - 1]));

        res.send(
          "\r\nThe most recent entry in the database is:\r\n" +
            rows["id"] +
            ": " +
            rows["time"] +
            " " +
            rows["temp"] +
            "\r\n"
        );
      } else res.send("\r\nThe database is currently empty \r\n");
    });
  });
});


/*
router.post("/put/:id", (req, res, next) => {
    var conn = mysql.createConnection({
        host: "jasonurvanejo.c7llj8gpbiqw.us-west-1.rds.amazonaws.com",
        user: "jasonurvanejo",
        password: "jasonurvanejo",
        database: "thermo",
    });

    var id = req.params.id;
    id = parseInt(id);

    if (isNaN(id)) res.send("\r\nThe entered ID must be an integer.\r\n");
    else {
        conn.connect((err) => {
            if (err) throw err;

            var sql =
                'UPDATE temperatures SET time = ' + req.body.time + ' WHERE ID = ' + id;
                //'UPDATE temperatures SET temp = ' + req.body.temp + ' WHERE ID = ' + id;
                //'","' + ' SET time = ' + req.body.time + 'WHERE ID = ' + id;
            conn.query(sql, (err, result) => {
                if (err) throw err;
                console.log("1 record modified");
                res.send("\r\n Success! Record adjusted for id: " + rows["id"] + "\r\n");
            });

            ////////////////Dont use this///////////////////
            sql =
            "SELECT * FROM temperatures WHERE time = '" +
            req.body.time +
            "' AND temp = '" +
            req.body.temp +
            "'";
            var rows;
            conn.query(sql, (err, result) => {
            if (err) throw err;

            rows = JSON.parse(JSON.stringify(result[result.length - 1]));
            
            res.send("\r\n Success! Record adjusted for id: " + rows["id"] + "\r\n");
            });
            
            ///////////////////////////////////////////////
        });
    };
});
*/

router.post("/", (req, res, next) => {
  var conn = mysql.createConnection({
    host: "jasondatabase.c7llj8gpbiqw.us-west-1.rds.amazonaws.com",
    user: "jasondatabase",
    password: "jasondatabase",
    database: "thermo",
  });

  conn.connect((err) => {
    if (err) throw err + "\r\n dadgum, POST didn't work this time boi!";
    var sql =
      'INSERT INTO temperatures(time, temp) VALUES("' +
      req.body.time +
      '","' +
      req.body.temp +
      '")';
    conn.query(sql, (err, result) => {
      if (err) throw err;
      console.log("1 record inserted");
    });

    sql =
      "SELECT * FROM temperatures WHERE time = '" +
      req.body.time +
      "' AND temp = '" +
      req.body.temp +
      "'";
    var rows;
    conn.query(sql, (err, result) => {
      if (err) throw err;

      rows = JSON.parse(JSON.stringify(result[result.length - 1]));

      res.send("\r\n Success! Record inserted for id: " + rows["id"] + "\r\n");
    });
  });
});


module.exports = router;
