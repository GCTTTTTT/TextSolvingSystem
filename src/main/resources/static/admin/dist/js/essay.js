$(function () {
    $("#jqGrid").jqGrid({
        url: '/admin/essay/list',
        datatype: "json",
        colModel: [
            {label: 'id', name: 'adminEssayId', index: 'adminEssayId', width: 50, key: true, hidden: true},
            {label: '创建用户id', name: 'adminUserId', index: 'adminUserId', width: 50, hidden: true},
            {label: '作文题目', name: 'essayTitle', index: 'essayTitle', width: 120},
            {label: '作文要求', name: 'essayRequire', index: 'essayRequire', width: 120},
            {label: '范文参考', name: 'essayExample', index: 'essayExample', width: 120}
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

function essayAdd() {
    reset();
    $('.modal-title').html('添加作文');
    $('#essayModal').modal('show');
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
        url = '/admin/essay/update';
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
    reset();
    var id = getSelectedRow();
    if (id == null) {
        return;
    }
    alert(id)
    location.replace("view/index1?id="+id);
    //请求数据
    $.get("/admin/essay/info/" + id, function (r) {
        if (r.resultCode == 200 && r.data != null) {
            //填充数据至modal
            $("#essayTitle").val(r.data.essayTitle);
            $("#essayRequire").val(r.data.essayRequire);
            $("#essayExample").val(r.data.essayExample);
        }
    });
    $('.modal-title').html('作文修改');
    $('#essayModal').modal('show');
}

function deleteEssay() {
    var ids = getSelectedRows();
    if (ids == null) {
        return;
    }
    Swal.fire({
        title: "确认弹框",
        text: "确认要删除数据吗?",
        icon: "warning",iconColor:"#dea32c",
        showCancelButton: true,
        confirmButtonText: '确认',
        cancelButtonText: '取消'
    }).then((flag) => {
            if (flag.value) {
                $.ajax({
                    type: "POST",
                    url: "/admin/essay/delete",
                    contentType: "application/json",
                    data: JSON.stringify(ids),
                    success: function (r) {
                        if (r.resultCode == 200) {
                            Swal.fire({
                                text: "删除成功",
                                icon: "success",iconColor:"#1d953f",
                            });
                            $("#jqGrid").trigger("reloadGrid");
                        } else {
                            Swal.fire({
                                text: r.message,
                                icon: "error",iconColor:"#f05b72",
                            });
                        }
                    }
                });
            }
        }
    )
    ;
}


function reset() {
    $("#essayTitle").val('');
    $("#essayRequire").val('');
    $("#essayExample").val('');

}