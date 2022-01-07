var express = require('express');
var vertoken = require('../token/token');

var router = express.Router();

var validAccounts = [{
        username: "1@qq.com",
        password: "111111"
    },
    {
        username: "11111@qq.com",
        password: "123456"
    }
]
var mytoken = "";
router.get('/getToken',  function (req, res) {
    res.json({token: mytoken});
});
/* GET users listing. */
router.post('/login', function (req, res) {
    var exists = 0;
    var newuser = req.body;
    for (var i = 0; i < validAccounts.length; i++) {
        //优化就是二分等查找
        if (newuser.username == validAccounts[i].username) {
            exists = 1;
            if (newuser.password == validAccounts[i].password) {
                exists = 2;
            }
            break;
        }
    }
    if (exists == 1) {
        //存在但密码错误
        res.json({
            result:0,
            status: 401,
            message:"密码错误"
        });
    } else if (exists == 0) {
        //不存在
        res.json({
            result:0,
            status: 404,
            message:'用户不存在'
        });
    } else if (exists == 2) {
        //存在且密码正确
        // res.json({status: 200});
        
        vertoken.setToken(newuser.username).then(token => {
            mytoken = token;
            res.json({
                code: 200,
                status: 200,
                message: '登录成功',
                token:mytoken
                //前端获取token后存储在localStroage中,
                //**调用接口时 设置axios(ajax)请求头Authorization的格式为`Bearer ` +token
            })
            
        })
        
    }
});


router.post('/regist', function (req, res) {
    var exists = 0;
    var newuser = req.body;
    for (var i = 0; i < validAccounts.length; i++) {
        //优化就是二分等查找
        if (newuser.username == validAccounts[i].username) {
            exists = 1;
            break;
        }
    }

    if (exists == 0) {
        //没有，注册
        validAccounts.push(newuser);
        res.json({
            status: 200
        });
    } else if (exists == 1) {
        res.json({
            status: 404
        });
    }
});

module.exports = router;