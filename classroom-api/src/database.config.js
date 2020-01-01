const mong = require("mongoose");
const URI = "mongodb://localhost/mern-aula";

mong.set('useFindAndModify', false);

mong
  .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(db => console.log("BD conectada"))
  .catch(err => console.err(err));

module.exports = mong;