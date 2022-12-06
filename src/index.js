const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes/route');
const mongoose = require('mongoose');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect("mongodb+srv://cassmmmg:Functionup2022@cluster0.quflkwm.mongodb.net/Project-1", { useNewUrlParser: true })

.then(() => {
    console.log("mongoDb is connected");

}).catch((err) => {
    console.log(err);

});

app.use('/', route)

app.listen(process.env.PORT || 3000, function() {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});