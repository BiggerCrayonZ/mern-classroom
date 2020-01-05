const mong = require("mongoose");
const URI = `mongodb+srv://rreza:${process.env.mongodbPass}@rreza-qo8zt.mongodb.net/classroom?retryWrites=true&w=majority`;

mong.set('useFindAndModify', false);

mong
  .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(db => console.log("BD conectada"))
  .catch(err => console.err(err));

module.exports = mong;