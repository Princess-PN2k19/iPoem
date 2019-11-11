const mongoose = require('mongoose')
const validator = require('mongoose-unique-validator')
const Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/poem', { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', function () {
    console.log("Connected!")
});

var poemSchema = new Schema({

    title:{
        type: String,
        required: true,
        unique: true
    },
    currentDT:{
        type: Date,
        required: true
    },
    poem:{
        type: String,
        required: true
    }
});

poemSchema.plugin(validator, { message: 'Title must be unique!' });

module.exports = mongoose.model('Poem', poemSchema);