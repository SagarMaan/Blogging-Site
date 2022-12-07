const express = require('express');
const app = express()
const route = require('./routes/route');
const mongoose = require('mongoose');

app.use(express.json());

mongoose.set("strictQuery", true);
mongoose.connect("mongodb+srv://SagarMaan:yHJBlRWQ0FdJmdj6@chaudhary-shaab-db.cueddss.mongodb.net/Project-1",
 { useNewUrlParser: true })

.then(() => {
    console.log("mongoDb is connected");

}).catch((err) => {
    console.log(err);

});

app.use('/', route)

app.listen(process.env.PORT || 3000, function() {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});