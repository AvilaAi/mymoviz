var mongoose = require('mongoose');
var options = {
	connectTimeoutMS: 5000,
	useNewUrlParser: true,
	useUnifiedTopology: true,
};

mongoose.connect('mongodb+srv://avila:2222@cluster0-dfpve.mongodb.net/mymovizapp?retryWrites=true', options, function(
	err
) {
	console.log(err);
});

module.exports = mongoose;
