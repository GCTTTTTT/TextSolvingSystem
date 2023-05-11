// $(function ())是文档document加载完自动调用的函数
$(function () {
    /*
     获取form元素，调用其ajaxForm(...)方法
     内部的function(data)的data就是后台返回的数据
    */
    $("#form1").ajaxForm(function (data) {
            console.log(data);
            console.log("str:" + JSON.stringify(data));
        }
    );
});
