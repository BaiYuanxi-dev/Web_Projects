var valid1 = false;
var valid2 = false;
var valid3 = false;
var token = "";
window.token = "22";
$('#username').bind('input propertychange', function () {
    var $username = $(this).val();

    if (!$username.match(/^([0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/)) {
        $('#usernamelab').html('请输入正确的邮箱');
        $('#usernamelab').css('color', 'red');
    } else {
        $('#usernamelab').html('用户名');
        $('#usernamelab').css('color', 'black');
        valid1 = true;
    }
});

$('#password').bind('input propertychange', function () {
    var $password = $(this).val();
    // var length = 
    if ($password.length < 6) {
        $('#passwordlab').html('密码不少于6位');
        $('#passwordlab').css('color', 'red');
    } else {
        $('#passwordlab').html('密码');
        $('#passwordlab').css('color', 'black');
        valid2 = true;
    }
});





$('#makesure_passwd').bind('input propertychange', function () {
    var $makesure_passwd = $(this).val();
    var $passwd = $('#password').val();
    // var length = 
    if ($makesure_passwd != $passwd) {
        $('#makesurepasswdlab').html('密码不一致');
        $('#makesurepasswdlab').css('color', 'red');
    } else {
        if ($passwd.length < 6) {
            $('#passwordlab').html('密码不少于6位');
            $('#passwordlab').css('color', 'red');
        } else {
            $('#makesurepasswdlab').html('确认密码');
            $('#makesurepasswdlab').css('color', 'black');
            valid3 = true;
        }
    }
});


$("#login").click(function () {
    window.event.returnValue = false;
    if (valid1 && valid2) {
        //还要判断有没有这个用户名
        var userid = $('#username').val();
        var passwd = $('#password').val();
        loginSent(userid, passwd);


        // $(location).attr("href","./index.html")
    } else {
        console.log("爬！")
        return;
    }

});


$("#regist").click(function () {
    window.event.returnValue = false;
    if (valid1 && valid2 && valid3) {
        //还要判断有没有这个用户名
        regist($("#username").val(), $("password").val());
        var userid = $('#username').val();
        var passwd = $('#password').val();
        regist(userid, passwd);

        // alert("注册成功");
        // $(location).attr("href", "./sign_in_index.html");
        // console.log("注册成功");
    } else {
        console.log("爬！")
        return;
    }
});

$('#gotoregist').click(function () {
    window.event.returnValue = false;
    $(location).attr("href", "./sign_up_index.html");
});

async function loginSent(userid, passwd) {
    var params = {
        username: userid,
        password: passwd
    };
    var status = 0;
    await fetch('/sign/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Token': window.token
            },
            body: JSON.stringify(params)
        })
        .then(response => response.json())
        .then(data => {

            status = data.status;

            if (status == 200) {
                alert("登录成功");
                token = data.token;
                window.token = token;
                // localStorage.setItem('token', token);
                // console.log("token", token);
                window.location='./index.html?token='+token+'';
                // $(location).attr("href", "./index.html")
            } else if (status == 401) {
                alert("密码错误")
            } else if (status == 404) {
                alert("账号不存在")
            }
        })
        .catch(error => console.error(error));
}



async function regist(userid, passwd) {
    var params = {
        username: userid,
        password: passwd
    };
    var status = 0;
    await fetch('/sign/regist', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        })
        .then(response => response.json())
        .then(data => {
            status = data.status;
            console.log("status", status);
            if (status == 200) {
                alert("注册成功");
                $(location).attr("href", "./sign_in_index.html");
            } else if (status == 404) {
                alert("账号已存在")
            }
        })
        .catch(error => console.error(error));
}
