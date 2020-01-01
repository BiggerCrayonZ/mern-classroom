if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const { mong } = require('./database.config');
const app = express();

/* Settings */
app.set('port', process.env.PORT || 4000);

/* Middlewares */
app.use(morgan('dev'));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
  next();
});
app.use(express.json());

/* Routes */
app.use('/api/activity',require('./routes/activity.routes'));
app.use('/api/auth',require('./routes/auth.routes'));

/* Static */
app.use(express.static(path.join(__dirname, 'public')));

/* Init */
app.listen(app.get('port'), () => {
  console.log(`Servidor inicializado en el puerto ${app.get('port')} señor con ${process.env.NODE_ENV === 'production' ? 'PROD' : 'DEV'}`);
});