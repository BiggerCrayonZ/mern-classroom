const mong = require("mongoose");
const URI = `mongodb+srv://rreza:${process.env.mongodbPass}@rreza-qo8zt.mongodb.net/classroom?retryWrites=true&w=majority`;
// const URI = 'mongodb://localhost/mern-aula';

mong.set('useFindAndModify', false);
mong.set('useCreateIndex', true);
mong
  .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(db => console.log("BD conectada"))
  .catch(err => console.log(err));

module.exports = mong;