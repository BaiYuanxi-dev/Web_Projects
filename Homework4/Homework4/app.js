var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var booksRouter = require('./routes/books');
var signRouter = require('./routes/sign');


//引入插件
var vertoken=require('./token/token')
var expressJwt=require('express-jwt')


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/books', booksRouter);
app.use('/sign', signRouter);


app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')));
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));

var $ = require("jquery");

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


app.use(function (req, res, next) {
    // 我这里知识把登陆和注册请求去掉了，其他的多有请求都需要进行token校验 
    if (req.url != '/sign/login' && req.url != '/sign/register') {
        let token = req.headers.token;
        let jwt = new JwtUtil(token);
        let result = jwt.verifyToken();
        // 如果考验通过就next，否则就返回登陆信息不正确
        if (result == 'err') {
            console.log(result);
            res.send({status: 403, msg: '登录已过期,请重新登录'});
            // res.render('login.html');
        } else {
            next();
        }
    } else {
        next();
    }
});






// //解析token获取用户信息
// app.use(function(req, res, next) {
//     var token = req.headers['authorization'];
//     if(token == undefined){
//         return next();
//     }else{
//         vertoken.getToken(token).then((data)=> {
//             req.data = data;
//             return next();
//         }).catch((error)=>{
//             return next();
//         })
//     }
// });

// //验证token是否过期并规定那些路由不需要验证
// app.use(expressJwt({
//     secret:'zgs_first_token',
//     algorithms:['HS256']
// }).unless({
//     path:['/sign/login', '/sign/regist']  //不需要验证的接口名称
// }))

//设置托管静态目录; 项目根目录+ public.可直接访问public文件下的文件eg:http://localhost:3000/images/url.jpg



//token失效返回信息
app.use(function(err,req,res,next){
    if(err.status==401){
        return res.status(401).send('token失效')
         //可以设置返回json 形式  res.json({message:'token失效'})
    }
})



module.exports = app;

