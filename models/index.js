/**
 * model数据的对象
 *
 */
var mongoose = require('mongoose')
  , db = require('../config').config.db;

mongoose.connect(db, function(err) {
    if (err) {
        console.log('数据库连接失败'); 
        console.error('connect to %s error: ', db, err.message);
    }        
});

require('./film')

exports.Films = mongoose.model('Films');
