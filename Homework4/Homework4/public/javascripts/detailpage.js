var token = "";
$(document).ready(function () {
    token = getUrlParam('token');
    if(token == undefined || token == ""){
        alert("请登录");
        $(location).attr("href", "./sign_in_index.html")
    }
    getBookmsg(0);
    // loadDetails();

 })

 $("#login_btn").click(function () {
    window.event.returnValue = false;
    $(location).attr("href", "./sign_in_index.html")
})

$("#regist_btn").click(function () {
    window.event.returnValue = false;
    $(location).attr("href", "./sign_upn_index.html")
})
 
async function getBookmsg(id){
    await fetch(`/books/bookmsg/${id}`)
        .then(response=>response.json())
        .then(data=>{
            //loadDetails(data);
            loadDetails(data);
        })
        .catch(error=>console.error(error))
}

function loadDetails(bookmsg){
    console.log(bookmsg);
    $('.curLocation').children('.curPosition').children('a').children('.det1').text(bookmsg.id + ": " +bookmsg.title + bookmsg.adddetail );
    var mainDetail = $('.maindetail').children('.container').children('.sailMsg');
    mainDetail.children('a').children('img').attr("src", bookmsg.imgsrc);
    mainDetail.children('.e-bookInfo').children('div').children('h5').text(bookmsg.id + ": " +bookmsg.title + bookmsg.adddetail);
    var chi1 = mainDetail.children('.e-bookInfo').children('.bookIntro');
    chi1.children('.col1').children('.col1col1').text("资源状态: "+ bookmsg.state);
    chi1.children('.col1').children('.col1col2').text("代替标准号: " + bookmsg.standardNumber);

    chi1.children('.col2').children('.col2col1').text("发布日期:  "+ bookmsg.senddate);
    chi1.children('.col2').children('.col2col2').text("实施日期:  " + bookmsg.usedate);
    chi1.children('.col2').children('.col2col3').text("废止日期:  " + bookmsg.abolishdate);

    chi1.children('.col3').children('.col-md-8').text("主编单位: "+ bookmsg.editor);

    var buyinfos = mainDetail.children('.e-bookInfo').children('.priceInfo');
    buyinfos.children('.c1').text("￥ "+ bookmsg.price);
    buyinfos.children('.c2').text("原价: "+ bookmsg.pro_price);
    buyinfos.children('.c2').css('text-decoration','line-through');
    buyinfos.children('.col-md-4').text('电子书: ￥' + bookmsg.eprice);

    $('.maindetail').children('.container').children('.briefIntro').children('.col-md-12').children('.texts').text(bookmsg.introduce);


}

function getUrlParam(name) {

    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象

    var r = window.location.search.substr(1).match(reg); //匹配目标参数

    if (r != null) return unescape(r[2]);

    return null; //返回参数值

}