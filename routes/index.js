
/*
 * GET home page.
 */

var config = require('../config')
    , db = config.db;

exports.index = function(req, res){
  res.render('index', { title: '首页' });
};
exports.myhome = function(req, res){
    res.render('myhome', { title: '我的个人空间' });
};
exports.viewing = function(req, res){
    db.query('select * from user order by creat_time asc, id asc limit 50', function(err, rows) {
        if(err) return next(err);
        res.render('viewing', {title:'查看会员信息', userId:req.params.id, userlist:rows});
    });
};
exports.editing = function(req, res){
    //res.render('editing', {title:'编辑会员信息',userId:req.params.id});

    db.query('select * from user t where t.id='+req.params.id, function(err, rows) {
        if(err) return next(err);
        res.render('editing', {title:'编辑会员信息', userId:req.params.id, users:rows});
    });
};

exports.update = function(req, res){

//    res.send('updating' + req.user.name);
};

exports.save = function(req, res, next) {
    var id = req.params.id;
    var cellphone = req.body.cellphone || '';
    cellphone = cellphone.trim();
    var real_name = req.body.cellphone || '';
    real_name = real_name.trim();
    var sex = req.body.cellphone || '';
    sex = sex.trim();
    var level = req.body.cellphone || '';
    level = level.trim();
    if(!cellphone) {
        return res.render('error', {message: '手机号码是必须的'});
    }
    db.query('update user set cellphone=?, real_name=?, sex=?, level=? where id=?', [cellphone, real_name, sex, level, id], function(err, result) {
        if(err) return next(err);
        res.redirect('/home');
    });
};