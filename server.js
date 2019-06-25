const app = require('./app');

app.set('port' , process.env.PORT || 7000);

const server = app.listen(app.get('port'), ()=> {
  console.log('Server running => PORT ' + app.get('port'));
});
