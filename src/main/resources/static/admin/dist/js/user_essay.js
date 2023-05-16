$(function () {
    $("#jqGrid").jqGrid({
        url: '/user/essay/list',
        datatype: "json",
        colModel: [
            {label: '作文id', name: 'adminEssayId', index: 'adminEssayId', width: 50, key: true},
            {label: '创建用户id', name: 'adminUserId', index: 'adminUserId', width: 50, hidden: true},
            {label: '作文题目', name: 'essayTitle', index: 'essayTitle', width: 120},
            {label: '作文要求', name: 'essayRequire', index: 'essayRequire', width: 120},
            {label: '范文参考', name: 'essayExample', index: 'essayExample', width: 120, hidden: true}
        ],
        height: 560,
        rowNum: 10,
        rowList: [10, 20, 50],
        styleUI: 'Bootstrap',
        loadtext: '信息读取中...',
        rownumbers: false,
        rownumWidth: 20,
        autowidth: true,
        multiselect: true,
        pager: "#jqGridPager",
        jsonReader: {
            root: "data.list",
            page: "data.currPage",
            total: "data.totalPage",
            records: "data.totalCount"
        },
        prmNames: {
            page: "page",
            rows: "limit",
            order: "order",
        },
        gridComplete: function () {
            //隐藏grid底部滚动条
            $("#jqGrid").closest(".ui-jqgrid-bdiv").css({"overflow-x": "hidden"});
        }
    });


    $(window).resize(function () {
        $("#jqGrid").setGridWidth($(".card-body").width());
    });


});

/**
 * jqGrid重新加载
 */
function reload() {
    var page = $("#jqGrid").jqGrid('getGridParam', 'page');
    $("#jqGrid").jqGrid('setGridParam', {
        page: page
    }).trigger("reloadGrid");
}



//绑定modal上的保存按钮
$('#saveButton').click(function () {
    var essayTitle = $("#essayTitle").val();
    var essayRequire = $("#essayRequire").val();
    var essayExample = $('#essayExample').val();
    var data = {
        "essayTitle": essayTitle,
        "essayRequire": essayRequire,
        "essayExample": essayExample
    };
    var url = '/admin/essay/save';
    var id = getSelectedRowWithoutAlert();
    if (id != null) {
        url = '/user/essay/update';
        data = {
            "adminEssayId": id,
            "essayTitle": essayTitle,
            "essayRequire": essayRequire,
            "essayExample": essayExample
        };
    }
    $.ajax({
        type: 'POST',//方法类型
        url: url,
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: function (result) {
            if (result.resultCode == 200) {
                $('#essayModal').modal('hide');
                Swal.fire({
                    text: "保存成功",
                    icon: "success",iconColor:"#1d953f",
                });
                reload();
            } else {
                $('#essayModal').modal('hide');
                Swal.fire({
                    text: result.message,
                    icon: "error",iconColor:"#f05b72",
                });
            }
            ;
        },
        error: function () {
            Swal.fire({
                text: "操作失败",
                icon: "error",iconColor:"#f05b72",
            });
        }
    });
});

function essayEdit() {
    // alert("111")
    reset();
    var id = getSelectedRow();
    // alert("222")
    if (id == null) {
        return;
    }
    // alert(id)
    // alert(r.data.essayRequire)
    // location.replace("/view/index1?id="+id+"&require="+r.data.essayRequire);
    //请求数据
    $.get("/user/essay/info/" + id, function (r) {
        if (r.resultCode == 200 && r.data != null) {
            //填充数据至modal
            // $("#essayTitle").val(r.data.essayTitle);
            // $("#essayRequire").val(r.data.essayRequire);
            // $("#essayExample").val(r.data.essayExample);

            // alert(id)
            // alert(r.data.essayRequire)
            location.replace("/view/index1?title="+r.data.essayTitle+"&require="+r.data.essayRequire+"&example="+r.data.essayExample);
        }
    });
    $('.modal-title').html('作文修改');
    // $('#essayModal').modal('show');
}


function reset() {
    $("#essayTitle").val('');
    $("#essayRequire").val('');
    $("#essayExample").val('');

}