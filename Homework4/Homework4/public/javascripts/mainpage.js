// var books=[];
var token = "";
var truToken = "";
$(document).ready(function () {

    token = getUrlParam('token');
    // console.log(token);
    // console.log(truToken);
    // truToken = getTrueToken();
    // console.log(truToken == token);
    if (token == undefined || token == "") {
        alert("请登录");
        $(location).attr("href", "./sign_in_index.html")
    }
    //应该在这里判定： 如果没有token就 访问 后端，先跳到登录界面    
    getAllbooks();
    getNotices();
})

$("#login_btn").click(function () {
    window.event.returnValue = false;
    $(location).attr("href", "./sign_in_index.html")
})

$("#regist_btn").click(function () {
    window.event.returnValue = false;
    $(location).attr("href", "./sign_upn_index.html")
})

$("#bt_detail1").click(function () {
    window.location = 'details.html?token=' + token + '';
})

function checkLogin() {

}

async function getTrueToken() {
    var token1 = "";
    await fetch('/sign/getToken', {

        }).then(response => {
            if (response.ok) {
                return response.json();
            } else {
                reject({
                    status: response.status
                })
            }
        })
        .then(data => {
            token1 = data.token;
            // console.log("trutoken", truToken);
        })
        .catch(error => console.error(error))
    return token1;
}

async function getAllbooks() {
    await fetch('/books/allbooks', {
            method: 'GET',
            header: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Token': token
            },
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                reject({
                    status: response.status
                })
            }
        })
        .then(data => {
            loadBooks(data);
            // console.log(data)
        })
        .catch(error => console.error(error))
}


async function getNotices() {
    await fetch('/books/notice', {
            method: 'GET',
            header: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Token': token
            },
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                reject({
                    status: response.status
                })
            }
        })
        .then(data => {
            loadnotices(data);
        })
        .catch(error => console.error(error))
}


function loadBooks(books) {
    var i = 0;
    for (i = 0; i < $('.card').length; i++) {
        var cardstr = ".card" + (i + 1);
        var book = $(cardstr).children('.card-body');
        book.children(".card-text").children("a").text(books[i % 3].title);
        book.children('.intro').text(books[i % 3].msg);
        book.children('.info').children('.s1').text("￥" + books[i % 3].price);
        book.children('.info').children('.s2').text(" • " + books[i % 3].buypersons + "人购买");
        $(cardstr).children('img').attr("src", books[i % 3].imgurl);
    }
}

function loadnotices(noticelist) {
    var ele = $('.main_announce').children('.list-group');

    for (var i = 0; i < ele.children('li').length; i++) {
        var str = ".l" + (i + 1);
        ele.children(str).children('a').text(noticelist[i].msg);
    }

}

function getUrlParam(name) {

    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象

    var r = window.location.search.substr(1).match(reg); //匹配目标参数

    if (r != null) return unescape(r[2]);

    return null; //返回参数值

}