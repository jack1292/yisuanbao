/**
 * @author yan st
 * @date 2019-12-05 14:17
 * @Description:
 */
var kmId = ''; // 编辑单挑科目id


// 获取项目详情
function getDetail(id) {
    var obj = {
        token: token,
        id: id
    }
    obj = signEdit(sign, obj);
    $.ajax({
        type: 'post',
        url: urlStr + '/Home/Project/detail',
        data: obj,
        dataType: 'json',
        success: function (res) {
            if (res.status == 1) {
                layer.msg(res.msg, {
                    time: 1500
                });
                window.location.href = 'login.html'
            }
            var list = res.data;

            // 编辑标题弹框内容填写
            list.cid == 0 ? -1 : list.cid
            console.log(list.cid)
            $("#flSel").val(list.cid == 0 ? '-1' : list.cid);
            $("#xmName").val(list.name)
            $("#xmYusuan").val(list.budget)
            $("#flnow").html($("#flSel").find("option:selected").text());
            if (res.status == 200) {
                $(".h3").html(res.data.name);
                $("#xiangmuName").html(res.data.name);
                $("#ylTit").html(res.data.name);
                $(".xmYus").html(res.data.budget);
                $(".dqYus").html(res.data.total);
                $("#ylSun").html(res.data.total + '万元');
                $("#ylBfb").html(res.data.ratio + '%');
                $(".syYus").html(res.data.balance);
            }
            if (list.son.length >= 0) {
                for (var i = 0, strHtmlOne = '', strHtmlTwo = '', strYl = ''; i < list.son.length; i++) {
                    for (var j = 0; j < list.son[i].son.length; j++) {
                        strHtmlOne += '<tr align="center">' +
                            '  <td>' + list.son[i].name + '</td>' +
                            '  <td>' + list.son[i].son[j].name + '</td>' +
                            '  <td class="min-W">' + list.son[i].son[j].unit + '</td>' +
                            '  <td class="min-W">' + list.son[i].son[j].num + '</td>' +
                            '  <td class="min-W">' + list.son[i].son[j].price + '元</td>' +
                            '  <td class="min-W">' + list.son[i].son[j].total + '元</td>' +
                            '  <td>' + list.son[i].son[j].remark + '</td>' +
                            '  <td class="min-W">' +
                            '      <span class="edit" onclick="getkmDetail(' + list.son[i].son[j].id + ')">编辑</span>' +
                            '      <span class="del" onclick="kmDel(' + list.son[i].son[j].id + ')">删除</span>' +
                            '  </td>' +
                            '</tr>'
                    }
                    strHtmlTwo += '<tr align="center">' +
                        '   <td>' + (i + 1) + '</td>' +
                        '   <td>' + list.son[i].name + '</td>' +
                        '   <td>' + list.son[i].total + '</td>' +
                        '</tr>'


                    strYl += '<div class="tabel">' +
                        '<div class="thead clearfix">' +
                        '    <div class="th">' + list.son[i].name + '</div>' +
                        '    <div class="th">' + list.son[i].total + '万元</div>' +
                        '    <div class="th">' + list.son[i].ratio + '%</div>' +
                        '    <div class="thtwo Ss">' +
                        '        <span>展开</span>' +
                        '        <img src="public/images/sanjiao.png" class="zkSanj" alt="">' +
                        '    </div>' +
                        '</div>' +
                        '<div class="tbody">' +
                        (function () {
                            for (var x = 0, ylSon = ''; x < list.son[i].son.length; x++) {
                                ylSon += ' <div class="bdBox">' +
                                    '    <div class="th">' + list.son[i].son[x].name + '</div>' +
                                    '    <div class="th">' + list.son[i].son[x].total + '元</div>' +
                                    '    <div class="th">' + list.son[i].son[x].ratio + '%</div>' +
                                    '    <div class="thtwo">-</div>' +
                                    '</div>'
                            }
                            return ylSon

                        })() +
                        '   </div>' +
                        '</div>'


                }
                $("#yusuanB").html(strHtmlOne);
                $("#huizongB").html(strHtmlTwo);
                $("#cenBox").html(strYl);

            }
        },
        error: function (res) {
            layer.msg(res.msg, {
                time: 1500
            });
        }
    })
}

// 添加科目接口
function addKemu() {
    var kaizKem = $("#kaizKem").find("option:selected").text();
    var kmInpVal = $("#kmInpVal").val();
    var zhicName = $("#zhicName").find("option:selected").text();
    var otherInpVal = $("#otherInpVal").val();
    var jjDanw = $("#jjDanw").val();
    var shuL = $("#shuL").val();
    var danJ = $("#danJ").val();
    var shuoM = $("#shuoM").val();
    console.log(kaizKem)
    console.log(kmInpVal)
    console.log(zhicName)
    console.log(otherInpVal)
    console.log(jjDanw)
    console.log(shuL)
    console.log(danJ)
    console.log(shuoM)
    if (kaizKem != '其他') {
        kmInpVal = kaizKem
    }
    if (zhicName != '其他') {
        otherInpVal = zhicName
    }

    if (kaizKem == '' || kmInpVal == '' || zhicName == '' || otherInpVal == '' || jjDanw == '' || shuL == '' || danJ == '' || shuoM == '') {
        layer.msg("请填写完整")
        return false
    }
    var obj = {
        token: token,
        preset_pname: kaizKem,
        pname: kmInpVal,
        preset_name: zhicName,
        name: otherInpVal,
        unit: jjDanw,
        num: shuL,
        price: danJ,
        remark: shuoM,
        pro_id: hals.id
    }
    obj = signEdit(sign, obj);
    $.ajax({
        type: 'post',
        url: urlStr + '/Home/Project/setDetail',
        data: obj,
        dataType: 'json',
        success: function (res) {
            if (res.status == 1) {
                layer.msg(res.msg, {
                    time: 1500
                });
                window.location.href = 'login.html'
            }
            layer.msg(res.msg, {
                time: 1500
            });
            $("#kmInpVal").val('');
            $("#otherInpVal").val('');
            $("#jjDanw").val('');
            $("#shuL").val('');
            $("#danJ").val('');
            $("#shuoM").val('');
            $(".mask").hide();
            $(".fenlTan2").hide();
            // 获取项目详情
            getDetail(hals.id)
        },
        error: function (res) {
            layer.msg(res.msg, {
                time: 1500
            });
            $(".mask").hide();
            $(".fenlTan2").hide();
        }
    })
}

// 获取经费开支科目
function kemuKaiz() {
    var obj = {
        token: token,
        id: 0
    }
    obj = signEdit(sign, obj);
    $.ajax({
        type: 'post',
        url: urlStr + '/Home/Project/getPresetList',
        data: obj,
        dataType: 'json',
        success: function (res) {
            if (res.status == 1) {
                layer.msg(res.msg, {
                    time: 1500
                });
                window.location.href = 'login.html'
            }
            var list = res.data;
            // 获取支出项目名称

            $("#kmInpVal").val(res.data[0].name);
            for (var i = 0, strHtml = ''; i < list.length; i++) {
                strHtml += '<option value="' + list[i].id + '">' + list[i].name + '</option>'
            }
            var end = '<option value="-1">其他</option>';
            $("#kaizKem").html(strHtml + end)
            kemuKaizName(res.data[0].id)
        },
        error: function (res) {
            layer.msg(res.msg, {
                time: 1500
            });
        }
    })
}

// 获取支出项目名称
function kemuKaizName(id) {
    var val = $("#kaizKem").val();
    if (val == -1) {
        $("#kmInpVal").val('');
        $("#otherInpVal").val('');
        $("#kmInp").show();
        $("#zcXmName").hide();
        $("#otherInp").show();
        var other = '<option value="-1">其他</option>';
        $("#zhicName").html(other);
        return false
    } else {
        $("#kmInpVal").val($("#kaizKem").find("option:selected").text());
        $("#kmInp").hide();
        $("#zcXmName").show();
        $("#otherInp").hide();
    }
    var obj = {
        token: token,
        id: id ? id : val
    }
    obj = signEdit(sign, obj);
    $.ajax({
        type: 'post',
        url: urlStr + '/Home/Project/getPresetList',
        data: obj,
        dataType: 'json',
        success: function (res) {
            if (res.status == 1) {
                layer.msg(res.msg, {
                    time: 1500
                });
                window.location.href = 'login.html'
            }
            var list = res.data;
            if (list.length > 0) {
                $("#otherInpVal").val(list[0].name);
                for (var i = 0, strHtml = ''; i < list.length; i++) {
                    strHtml += '<option value="' + list[i].id + '">' + list[i].name + '</option>'
                }
                var other = '<option value="-1">其他</option>';
                $("#zhicName").html(strHtml + other)
            } else {
                $("#zhicName").html('<option value="-1">其他</option>')
                $("#otherInp").show()
            }
            shuoM()
        },
        error: function (res) {
            layer.msg(res.msg, {
                time: 1500
            });
        }
    })

}

// 其他弹框显示隐藏
function otherShow() {
    var val = $("#zhicName").val();
    console.log(val)
    if (val == -1) {
        $("#otherInp").show();
        $("#otherInpVal").val('')
        $("#ysTit").html('');
        $("#ysCon").html('');
    } else {
        //  获取预设枯木说明
        shuoM()
    }
}

// 删除科目详情
function kmDel(id) {
    var obj = {
        token: token,
        id: id
    }
    obj = signEdit(sign, obj)
    $.ajax({
        type: 'post',
        url: urlStr + '/Home/Project/delDetail',
        data: obj,
        dataType: 'json',
        success: function (res) {
            if (res.status == 1) {
                layer.msg(res.msg, {
                    time: 1500
                });
                window.location.href = 'login.html'
            }
            layer.msg(res.msg, {
                time: 1500
            });
            getDetail(hals.id)
        },
        error: function (res) {
            layer.msg(res.msg, {
                time: 1500
            });
        }
    })
}

// 获取单挑科目详情
function getkmDetail(id) {
    var obj = {
        token: token,
        id: id
    }
    obj = signEdit(sign, obj)
    $.ajax({
        type: 'post',
        url: urlStr + '/Home/Project/find',
        data: obj,
        dataType: 'json',
        success: function (res) {
            if (res.status == 1) {
                layer.msg(res.msg, {
                    time: 1500
                });
                window.location.href = 'login.html'
            }
            if (res.status == 200) {
                $(".mask").show();
                $(".fenlTan2").show();
                $("#btn2").show();
                $("#btn1").hide();
            }
            if (res.data.preset_pname == '其他') {
                $("#kmInp").show();
                $("#zcXmName").hide();
                $("#otherInp").show();
            }
            if (res.data.preset_pname != '其他' && res.data.preset_name == '其他') {
                $("#otherInp").show();
                $("#kmInp").hide();
            }

            $("#kaizKem option:contains('" + res.data.preset_pname + "')").attr("selected", true);
            $("#zhicName option:contains('" + res.data.preset_name + "')").attr("selected", true);
            $("#kmInpVal").val(res.data.pname);
            $("#otherInpVal").val(res.data.name);
            $("#jjDanw").val(res.data.unit);
            $("#shuL").val(res.data.num);
            $("#danJ").val(res.data.price);
            $("#shuoM").val(res.data.remark);
            kmId = res.data.id;
        },
        error: function (res) {
            layer.msg(res.msg, {
                time: 1500
            });
        }
    })
}

// 编辑科目接口
function editKemu() {
    var kaizKem = $("#kaizKem").find("option:selected").text();
    var kmInpVal = $("#kmInpVal").val();
    var zhicName = $("#zhicName").find("option:selected").text();
    var otherInpVal = $("#otherInpVal").val();
    var jjDanw = $("#jjDanw").val();
    var shuL = $("#shuL").val();
    var danJ = $("#danJ").val();
    var shuoM = $("#shuoM").val();
    if (kaizKem != '其他') {
        kmInpVal = kaizKem
    }
    if (zhicName != '其他') {
        otherInpVal = zhicName
    }

    if (kaizKem == '' || kmInpVal == '' || zhicName == '' || otherInpVal == '' || jjDanw == '' || shuL == '' || danJ == '' || shuoM == '') {
        layer.msg("请填写完整")
        return false
    }
    var obj = {
        token: token,
        preset_pname: kaizKem,
        pname: kmInpVal,
        preset_name: zhicName,
        name: otherInpVal,
        unit: jjDanw,
        num: shuL,
        price: danJ,
        remark: shuoM,
        pro_id: hals.id,
        id: kmId
    }
    obj = signEdit(sign, obj);
    $.ajax({
        type: 'post',
        url: urlStr + '/Home/Project/setDetail',
        data: obj,
        dataType: 'json',
        success: function (res) {
            if (res.status == 1) {
                layer.msg(res.msg, {
                    time: 1500
                });
                window.location.href = 'login.html'
            }
            layer.msg(res.msg, {
                time: 1500
            });
            $("#kmInpVal").val('');
            $("#otherInpVal").val('');
            $("#jjDanw").val('');
            $("#shuL").val('');
            $("#danJ").val('');
            $("#shuoM").val('');
            $(".mask").hide();
            $(".fenlTan2").hide();
            // 获取项目详情
            getDetail(hals.id)
        },
        error: function (res) {
            layer.msg(res.msg, {
                time: 1500
            });
            $(".mask").hide();
            $(".fenlTan2").hide();
        }
    })
}

// 编辑项目标题预算
function saveXm() {
    var flSel = $("#flSel").val();
    var xmName = $("#xmName").val();
    var xmYusuan = $("#xmYusuan").val();
    if (flSel == '' || xmName == '' || xmYusuan == '') {
        layer.msg("请填写完整");
        return false
    }
    flSel = flSel == -1 ? 0 : flSel;
    var obj = {
        token: token,
        name: xmName,
        budget: xmYusuan,
        cid: flSel,
        id: hals.id
    }
    obj = signEdit(sign, obj)
    $.ajax({
        type: 'post',
        url: urlStr + '/Home/Project/edit',
        data: obj,
        dataType: 'json',
        success: function (res) {
            if (res.status == 1) {
                layer.msg(res.msg, {
                    time: 1500
                });
                window.location.href = 'login.html'
            }
            $(".mask").hide();
            $(".fenlTan").hide();
            // 获取项目详情
            getDetail(hals.id)
            layer.msg(res.msg, {
                time: 1500
            });
        },
        error: function (res) {
            $(".mask").hide();
            $(".fenlTan").hide();
            $("#xmName").val('');
            $("#xmYusuan").val('');
            layer.msg(res.msg, {
                time: 1500
            });
        }
    })
}

//  获取预设枯木说明
function shuoM() {
    var val = $("#zhicName").val();
    if (val == -1) {
        $("#otherInp").show();
        return false
    }
    $("#otherInp").hide();
    $("#otherInpVal").val($("#zhicName").find("option:selected").text())
    var obj = {
        token: token,
        id: val
    }
    obj = signEdit(sign, obj)
    $.ajax({
        type: 'post',
        url: urlStr + '/Home/Project/getPresetDetail',
        data: obj,
        dataType: 'json',
        success: function (res) {
            if (res.status == 1) {
                layer.msg(res.msg, {
                    time: 1500
                });
                window.location.href = 'login.html'
            }
            $("#ysTit").html(res.data.title);
            $("#ysCon").html(res.data.basis);
        },
        error: function (res) {
            layer.msg(res.msg, {
                time: 1500
            });
        }
    })
}

// 导出
function daoC(type) {
    var obj = {
        token: token,
        id: hals.id,
        type: type
    }
    obj = signEdit(sign, obj)
    $.ajax({
        type: 'post',
        url: urlStr + '/Home/Project/export',
        data: obj,
        dataType: 'json',
        success: function (res) {
            if (res.status == 1) {
                layer.msg(res.msg, {
                    time: 1500
                });
                window.location.href = 'login.html'
            }
            if (res.status == 200) {
                var a = document.createElement('a');
                var url = urlStr + res.data;
                a.href = url;
                a.click()
                $(".mask").hide();
                $(".daocTan").hide();
            }
        },
        error: function (res) {
            layer.msg(res.msg, {
                time: 1500
            });
        }
    })
}

















