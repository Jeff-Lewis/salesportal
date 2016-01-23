/**
 * Created by Jonathan on 06/12/2015.
 */
var connstr = 'mongodb://127.0.0.1/sales';
var mongoose = require('mongoose').connect(connstr);
var database = mongoose.connection;

database.on('error', console.error.bind(console, 'Erro ao conectar no banco'));

database.once('open', function () {
    /*var userSchema = mongoose.Schema({
     fullname: String,
     email: String,
     password: String,
     created_at: Date
     });*/
    //exports.db = database; //mongoose.model('LogUser', userSchema);
    //exports.mong = mongoose;
});

exports.strconn = connstr;
exports.db = database; //mongoose.model('LogUser', userSchema);
exports.mong = mongoose;