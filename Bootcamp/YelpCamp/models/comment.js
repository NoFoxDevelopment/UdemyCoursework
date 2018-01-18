const mongoose 	= require('mongoose');

const commantSchema = mongoose.Schema({
	text: String,
	author: String
});

module.exports = mongoose.model('Comment', commantSchema);