
/*
 * GET page list
 */

var models = require('../models')
  , Film = models.Films
  , util = require('../util')
  , _ = require('underscore')
  , EventProxy = require('eventproxy');


/**
 * 基础的查询功能函数
 */
function getFilmByQuery(query, fields ,opt, cb) {
    //查询字段不为空并且是数组 就转化一下子 因为
    //新的mongoose就是这么搞的不然会报错
    //它只接受对象或者 字符串
    if (fields && ('Array' == fields.constructor.name)) {
        if (fields.length == 0) {
            fields = null;
        }
        else {
            fields = fields.join(' '); 
        }
    }
    Film.find(query, fields, opt, function(err, film) {
        if (err) {
            return cb(err); 
        } 
        return cb(null, film); 
    });
}
/**
 * 通过id获取电影
 */
function getFilmById(id, cb) {
    Film.findOne({_id: id}, function(err, film) {
        if (err) {
            return cb(err); 
        }
        return cb(null, film); 
    });
}

/**
 * http的的上下文,用来获取列表页面
 */
function getList(req, res, next) {

    getFilmByQuery({}, [], {sort: {'update': -1}}, function(err, films) {
        //if error
        if (err) {
            return next(err);   
        }        
        _.each(films, function(film, index, list) {
            list[index] = {
                _id: film._id, 
                name: film.name,
                type: film.type, 
                status: film.status, 
                url: film.url, 
                introduction: film.introduction, 
                largeImg: film.largeImg, 
                tinyImg: film.tinyImg, 
                resources: film.resources, 
                update: film.update, 
                createTime: util.convertTime(film.update || new Date())
            }; 
        });

        //res.render('index', films);
        res.json(200, films);
    });
}
/**
 * 所有导出的函数在这个地方
 */
exports.getList = getList;

