var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var bookSchema = new Schema({
    name: String,
    author: String,
    username: String,
    available: Boolean
});

var Book = mongoose.model('Book', bookSchema);

module.exports = {
    book: Book
}