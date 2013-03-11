var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

//电影的一些信息
var FilmSchema = new Schema({
    'name': { type: String },  
    'type': { type: String },
    'status': { type: String },
    'update': { type: Date },
    'url': { type: String },
    'introduction': { type: String }, 
    'largeImg': { type: String },
    'tinyImg': { type: String },
    'resources': { type: String }
});

//一部电影的内容
mongoose.model('Films', FilmSchema);
