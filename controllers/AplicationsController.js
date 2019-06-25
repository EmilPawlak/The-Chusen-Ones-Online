const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";

exports.login = (req,res) => {

  MongoClient.connect(url,{ useNewUrlParser: true }, (err, client) => {//połaczenie z bazą
      if (err) {
        console.error(err);
      }

  const db = client.db('test_db');
  const collection = db.collection('user_example');
  var log = req.body.login_l;
  var pass = req.body.password_l;//przypisanie danych z formularza
  var log_r = req.body.login_r;
  var pass_r = req.body.password_r;
  var email_r = req.body.email_r;
  var button_r=req.body.button_r;
  var button=req.body.button_l;

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

  } else if(button_r=="zarejestruj"){

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
};
