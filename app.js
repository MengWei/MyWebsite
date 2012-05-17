
/**
 * Module dependencies.
 */
var path = require('path');
var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , config = require('./config');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || config.port);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  //app.use(express.bodyParser({uploadDir:'./uploads'}));//增加上传目录设置
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
  //app.use(express.session({secret: config.session_secret}));
  app.use(express.cookieParser('keyboard cat'));
  app.use(express.session());
});

//var static_dir = path.join(__dirname, 'public');

app.configure('development', function(){
    //app.use(express.static(static_dir));
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
    //var maxAge = 3600000 * 24 * 30;
    //app.use(express.static(static_dir, { maxAge: maxAge }));
    app.use(express.errorHandler());
    app.set('view cache', true);
});

app.get('/', routes.index);
app.get('/home', routes.myhome);
app.get('/user/:id', routes.viewing);
app.get('/user/:id/edit', routes.editing);
app.post('/save/:id', routes.save);
app.post('/file-upload', function(req, res, next) {
    console.log(req.body);
    console.log(req.files);
    /*
    var size = req.files.upFile.size;
    var path = req.files.upFile.path;
    var name = req.files.upFile.name;
    var type = req.files.upFile.type;
    console.log('--------Size:'+size+'  path:'+path+'   name:'+name+'   type:'+type);
    */

    req.setRequestHeader('Authorization','OSS');
    req.setHeader('AccessId','111 ');
    //req.setHeader();
    console.log(req.files.upFile);
    console.log(req.request);
    res.render('index', { title: '首页' });
});
//-------
//var users = [{ name: 'www.csser.com' }];

//app.all('/user/:id/:id?', function(req, res, next){
//    req.user = users[req.params.id];
//    if (req.user) {
//        next();
//    } else {
//        next(new Error('cannot find user ' + req.params.id));
//    }
//});

//app.put('/user/:id', routes.updating());

//------------

/**
app.get('/user/:id', function(req, res){
    res.send('user ' + req.params.id);
});
 */

http.createServer(app).listen(app.get('port'), function() {
  console.log("Express server listening on port " + app.get('port'));
});
