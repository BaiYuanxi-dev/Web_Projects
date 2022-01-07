var express = require('express');
const res = require('express/lib/response');
var router = express.Router();
var books=[
    {
        id:101,
        title:"吊车轨道联结及车档",
        msg:"本图集是在04G325图集的基础上，为便于设计、施工人员的使用，按现行国家标准规范和技术进行了……",
        price: 44.10,
        buypersons: 1125,
        imgurl:"images/main/book1.jpg",
    },
    {
        id:102,
        title:"铝合金复合板建筑幕墙及装饰构造",
        msg:"本图集是在04G325图集的基础上，为便于设计、施工人员的使用，按现行国家标准规范和技术进行了……",
        price: 82.50,
        buypersons: 3425,
        imgurl:"images/main/book2.jpg",
    },
    {
        id:103,
        title:"深海浅说",
        msg:"本书以及简单的形式描绘了深海的奥秘，带你遨游世界大洋，探索未知世界。",
        price: 28.35,
        buypersons: 7998,
        imgurl:"images/main/book3.jpg",
    }
]

var bookmsg=[
    {
        id:101,
        title: "吊车轨道联结及车挡",
        adddetail: "(适用于混凝土结构)",
        state: "现行",
        standardNumber: "-",
        senddate: "2017-09-01",
        usedate: "2017-09-01",
        abolishdate: "-",
        editor: " 中国中元国际工程有限公司",
        price: "34.20",
        pro_price: "44.10",
        eprice: "19.00",
        introduce:"本图集是在04G325图集的基础上，为便于设计、施工人员的使用，按现行国家标准规范和技术进行了统一、精简、优化编制的。 适用范围：适用于设有T型或工字型吊车梁或预应力混凝土吊车梁的工业厂房及露天栈桥，厂房或栈桥跨度≤36m；柱距6m或12m， 抗震设防烈度≤8度地区，正常使用环境类别一类或二类无腐蚀性气体厂房。 主要内容：本图集主要编制了轨道联结及车挡选用表， 不同规格轨道联结的平、立面图，剖面图及材料表，轨道联结件详图，车挡详图及材料表，缓冲板详图及材料表等。为便于工程设 计和施工技术人员选用，并在总说明中提供了选用方法和举例。 图集特点：该图集较详尽地提供了6m、12m柱距钢筋混凝土吊车梁 轨道联结及车挡详图，工程设计和施工技术人员可根据工程需要直接选用或对不同规格的吊车参数，经验算、复核后选用。符合我 国工业化生产要求。该图集发行后将产生很好的社会和经济效益。"
    }
    
]



var noticelist=[
    {msg:" · 元旦纸书发货延迟公告"},
    {msg:" · 受新冠疫情影响，纸质书无法发货"},
    {msg:" · 国庆期间标准电子书暂停销售通知"},
    {msg:" · 国标电子书库商城上线啦!"},
    {msg:" · 注册即有惊喜!!"}
]


router.get('/allbooks', function(req,res){
    res.json(books);
});

router.get('/bookmsg/:id', function(req,res){
    res.json(bookmsg[req.params.id]);
})

router.get('/notice', function(req,res){
    res.json(noticelist);
})
    
module.exports = router;