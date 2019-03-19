const express = require('express');//załadowanie expressa
var path = require('path')
var myParser = require("body-parser");
const app = express();

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

const server = app.listen(7000, () => {
  console.log(`Express running → PORT ${server.address().port}`);
}); //nasluchiwanie portu

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.static('public'));

MongoClient.connect(url,{ useNewUrlParser: true }, (err, client) => {//połaczenie z bazą
    if (err) {
      console.error(err);
    }

    const db = client.db('test_db');
    const collection = db.collection('user_example');



    app.get('/', (req, res) => {
      res.render('index'); // wyswietlenie htmla
    });

    app.use(myParser.urlencoded({extended : true}));//<-do ogarniecia

    app.post("/", function(req, res) {

          var log = req.body.login;
          var pass = req.body.password;//przypisanie danych z formularza
          var log_r = req.body.login_r;
          var pass_r = req.body.password_r;
          var email_r = req.body.email_r;
          var button_r=req.body.button_r;
          var button=req.body.button;

          if(button=="zaloguj")
          {
            collection.countDocuments({name:log},(err, result) => {
                if(result){
                    var user = collection.findOne({name:log}, function(err, result){
                      if (err) {
                        console.error(err);
                      }

                        console.log(result.name);// wyswietlenie zawartosci bazy

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

        } else if(button_r=="rejestracja"){

          collection.countDocuments({name:log_r}, (err,result) => {
            if(result)
            {
              console.log("Taki uzytkownik istnieje");
            }else
            {
              collection.insertOne({name: log_r, password: pass_r, email: email_r});
            }

          });
          }

    });
})


// Do stworzenia servera potrzebuje node.js expressa i puga albo innego template engine tutaj przykładem jest html do ktorego uzyłem ejs-a
