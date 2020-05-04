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
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Accept, x-access-token");
  res.header("Access-Control-Allow-Methods", ['GET', 'PUT', 'POST', 'UPDATE', 'OPTIONS', 'DELETE']);
  next();
});
app.use(express.json());

/* Routes */
app.get('/api', (req, res) => {
  res.send('Working');
})
app.use('/api/activity',require('./routes/activity.routes'));
app.use('/api/role',require('./routes/role.routes'));
app.use('/api/auth',require('./routes/auth.routes'));
app.use('/api/user',require('./routes/user.routes'));

/* Static and React Build */
app.use(express.static(path.join(__dirname, '../../classroom-ui/build')));
app.get('/app', (req, res) => {
  res.sendFile(path.join(__dirname + '/views/index.html'))
});
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/views/index.html'))
});

/* Init */
app.listen(app.get('port'), () => {
  console.log(`Servidor inicializado en el puerto ${app.get('port')} señor con ${process.env.NODE_ENV === 'production' ? 'PROD' : 'DEV'}`);
});