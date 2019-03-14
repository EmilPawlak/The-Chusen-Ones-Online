const express = require('express');//załadowanie expressa
var path = require('path')
var myParser = require("body-parser");
const app = express();

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

const server = app.listen(7000, () => {
  console.log(`Express running → PORT ${server.address().port}`);
}); //nasluchiwanie portu

MongoClient.connect(url,{ useNewUrlParser: true }, (err, client) => {//połaczenie z bazą
    if (err) {
      console.error(err);
    }

    const db = client.db('test_db');
    const collection = db.collection('user_example');

    app.engine('html', require('ejs').renderFile);
    app.set('view engine', 'html');
    app.use(express.static('public'));

    app.get('/', (req, res) => {
      res.render('index'); // wyswietlenie htmla
    });

    app.use(myParser.urlencoded({extended : true}));//<-do ogarniecia

    app.post("/", function(req, res) {

          var log = req.body.login;
          var pass = req.body.password;//przypisanie danych z formularza

          collection.countDocuments({name:log}, function(err, result){
            if(result){
                var user = collection.findOne({name:log}, function(err, result){
                  if (err) {
                    console.error(err);
                  }

                    //console.log(result.name);// wyswietlenie zawartosci bazy

                    if(result.password===pass)
                    {
                      console.log("Udało się zalogować");
                    } else {
                      console.log("Błędne hasło");
                    }
                });
            } else {
              console.log("błędny login");
            }
          });
        });
})


// Do stworzenia servera potrzebuje node.js expressa i puga albo innego template engine tutaj przykładem jest html do ktorego uzyłem ejs-a
