var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var tradeSchema = new Schema({
    requestedBy: String,
    requested: Date,
    lended: String
});

var bookSchema = new Schema({
    name: String,
    author: String,
    username: String,
    trade: [tradeSchema]
});

var Book = mongoose.model('Book', bookSchema);

module.exports = {
    book: Book
}