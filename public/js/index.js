/**
 * @author yan st
 * @date 2019-12-19 16:27
 * @Description:
 */
// 分类id 分类删除修改用
var fenLid = '';
//  分类ID   删除项目用
var XmFlId = '';
// 分页
var pageNum = '';

// 获取最近编辑列表
function getLastEdit() {
  var obj = {
    token: token,
  }
  obj = signEdit(sign, obj)
  $.ajax({
    type: 'post',
    url: urlStr + '/Home/Project/getLastEdit',
    data: obj,
    dataType: 'json',
    success: function (res) {
      if (res.status == 1) {
        layer.msg(res.msg, {
          time: 1500
        });
        window.location.href = 'login.html'
      }
      console.log(res)
      for (var i = 0, strHtml = ''; i < res.data.length; i++) {
        strHtml += '<p>' +
          '          <a href="new.html?id=' + res.data[i].id + '" class="s1">' + res.data[i].name + '</a>' +
          '          <span class="s2">' + ZHDate(new Date(res.data[i].add_time * 1000), 6) + '</span>' +
          '      </p>'

      }
      $("#bjList").html(strHtml)
    },
    error: function (res) {
      layer.msg(res.msg, {
        time: 1500
      });
    }
  })
}


// 新建分类
function addFenl() {
  var fenlName = $("#fenlName").val();
  if (fenlName == '') {
    layer.msg("请填写分类名称");
    return false
  }

  if (fenLid == '') {
    var obj = {
      token: token,
      name: fenlName
    }
  } else {
    var obj = {
      token: token,
      name: fenlName,
      id: fenLid
    }
  }

  obj = signEdit(sign, obj)
  $.ajax({
    type: 'post',
    url: urlStr + '/Home/Project/setCat',
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
      $("#fenlName").val('');
      $(".flTex").html("新建分类");
      layer.msg(res.msg, {
        time: 1500
      });
      // 获取项目分类
      getFenl()
      if (fenLid == '') {
        // 新建分类
        getFlList()
      } else {
        // 编辑分类
        getFlList(pageNum)
      }
      fenLid = ''
    },
    error: function (res) {
      $(".mask").hide();
      $(".fenlTan").hide();
      $("#fenlName").val('');
      $(".flTex").html("新建分类");
      layer.msg(res.msg, {
        time: 1500
      });
      fenLid = ''
    }
  })

}

// 获取分类下的项目列表 home页面
function getXmList(id, page) {
  XmFlId = id
  var obj = {
    token: token,
    page: page ? page : 1,
    limit: 10,
    cid: id
  }
  obj = signEdit(sign, obj)
  $.ajax({
    type: 'post',
    url: urlStr + '/Home/Project/getList',
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
        $(".pageBox").show();
        $("#lieB").show();
        $(".notList").hide();
        var list = res.data.list;
        for (var i = 0, strHtml = ''; i < list.length; i++) {
          strHtml += '<div class="tit">' +
            '          <div class="name">' +
            '               <a href="new.html?id=' + list[i].id + '" class="s1">' + list[i].name + '</a>' +
            '          </div>' +
            '          <div class="time">' + ZHDate(new Date(list[i].add_time * 1000)) + '</div>' +
            '          <div class="caoz">' +
            '              <span class="edit" onclick="editXm(' + list[i].id + ',\'' + list[i].name + '\',' + list[i].cid + ',' + list[i].budget + ')">修改</span>' +
            '              <span class="shux">|</span>' +
            '              <span class="del" onclick="delXm(' + list[i].id + ')">删除</span>' +
            '              <span class="shux">|</span>' +
          '                <a href="new.html?id=' + list[i].id + '">明细</a>' +
            '          </div>' +
            '      </div>'
        }
        $("#lieB").html(strHtml)

        $("#page").paging({
          pageNum: page ? page : 1, // 当前页面
          totalNum: res.data.page_count, // 总页码
          totalList: res.data.count, // 记录总数量
          callback: function (num) { //回调函数
            pageNum = num
            getXmList(id, num)
          }
        });
      }
      if (res.status == 201) {
        layer.msg(res.msg, {
          time: 1500
        });
        $("#lieB").hide();
        $(".pageBox").hide();
        $(".notList").show();
      }
    },
    error: function (res) {
      layer.msg(res.msg, {
        time: 1500
      });
    }
  })

}

// 获取分类列表 home页面
function getFlList(page) {
  xmid = '' // 编辑使用到的项目ID设置为空
  var obj = {
    token: token,
    page: page ? page : 1,
    limit: 10,
  }
  obj = signEdit(sign, obj);
  $.ajax({
    type: 'post',
    url: urlStr + '/Home/Project/getCatList',
    data: obj,
    dataType: 'json',
    success: function (res) {
      console.log(res)
      if (res.status == 1) {
        layer.msg(res.msg, {
          time: 1500
        });
        window.location.href = 'login.html'
      }
      if (res.status == 200) {
        $(".pageBox").show();
        $("#lieB").show();
        $(".notList").hide();
        var list = res.data.list;
        for (var i = 0, strHtml = ''; i < list.length; i++) {
          strHtml += '<div class="tit">' +
            '          <div class="name">' + list[i].name + '</div>' +
            '          <div class="time">' + ZHDate(new Date(list[i].add_time * 1000)) + '</div>' +
            '          <div class="caoz">' +
            '              <span class="edit" onclick="editFl(' + list[i].id + ',\'' + list[i].name + '\')">修改</span>' +
            '              <span class="shux">|</span>' +
            '              <span class="del" onclick="delFl(' + list[i].id + ')">删除</span>' +
            '          </div>' +
            '      </div>'
        }
        $("#lieB").html(strHtml)

        $("#page").paging({
          pageNum: page ? page : 1, // 当前页面
          totalNum: res.data.page_count, // 总页码
          totalList: res.data.count, // 记录总数量
          callback: function (num) { //回调函数
            console.log(num);
            getFlList(id, num)
          }
        });
      }
      if (res.status == 201) {

        $("#lieB").hide();
        $(".pageBox").hide();
        $(".notList").show();
      }
    },
    error: function (res) {
      layer.msg(res.msg, {
        time: 1500
      });
    }
  })

}


// 编辑分类弹框打开
function editFl(id, name) {
  fenLid = id;
  $(".mask").show();
  $(".fenlTan").show();
  $("#fenlName").val(name)
  $(".flTex").html("修改分类");
}


// 删除分类
function delFl(id) {
  layer.confirm(' 确认删除此项目分类？', {
    btn: ['取消','删除'] //按钮
  }, function(){
    layer.msg("已取消",
      {
        time: 1000
      })
  }, function(){
    var obj = {
      token: token,
      id: id
    }
    obj = signEdit(sign, obj)
    $.ajax({
      type: 'post',
      url: urlStr + '/Home/Project/delCat',
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
        if (res.status == 200) {
          // 获取项目分类
          getFenl()
          getFlList(pageNum)
        }

      },
      error: function (res) {
        layer.msg(res.msg, {
          time: 1500
        });
      }
    })
  });



}


// 删除项目
function delXm(id) {


  layer.confirm('执行项目删除操作后，和项目相关的数据都将被删除，您确认执行删除操作么？', {
    btn: ['取消','删除'] //按钮
  }, function(){
    layer.msg("已取消",
      {
        time: 1000
      })
  }, function(){
    var obj = {
      token: token,
      id: id
    }
    obj = signEdit(sign, obj)
    $.ajax({
      type: 'post',
      url: urlStr + '/Home/Project/del',
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
        if (res.status == 200) {
          // 获取项目分类
          getXmList(XmFlId, pageNum)
        }

      },
      error: function (res) {
        layer.msg(res.msg, {
          time: 1500
        });
      }
    })
  });

}


// toFenl
 function toFenl() {

   $(".curst").removeClass("act");
   $(".fenLguanl").addClass("act");
   getFlList()

 }


// toAllxm
function toAllxm() {

  $(".curst").removeClass("act");
  $(".allxm").addClass("act");

  setTimeout(function () {
    getXmList(0,1)
  },500)
}

//
function xinj() {
  $(".mask").show();
  $(".fenlTan2").show();
}