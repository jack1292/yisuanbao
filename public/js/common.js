/**cookie操作*/
var _cookie = {
  _set: function (name, value, expires) {
    var _end = new Date();
    if (expires) {
      _end.setTime(_end.getTime() + (expires * 1000));
    }
    var _url = window.location.href;
    document.cookie = name + "=" + escape(value) + (expires ? (";expires=" + _end.toGMTString()) : "") + ";path=/";
  },
  _get: function (name) {
    var _cookie = document.cookie;
    var _start = _cookie.indexOf(name + "=");
    if (_start != -1) {
      _start += name.length + 1;
      var _end = _cookie.indexOf(";", _start);
      if (_end == -1) {
        _end = _cookie.length;
      }
      return unescape(_cookie.substring(_start, _end));
    }
    return "";
  }
};


var hals = GetRequest();
var urlStr = 'http://suan.emof.cn';
// var urlStr = 'http://192.168.2.251:8090';
var token = _cookie._get('token');
var morglogo = _cookie._get('morglogo');
var morgname = _cookie._get('morgname');
var nick_name = _cookie._get('nick_name');
var pic = _cookie._get('pic');
var sign = _cookie._get('sign');
var allToken = _cookie._get('allToken');
var xmid = ''; // 编辑项目时用



// 获取项目分类
function getFenl(id) {
  var obj = {
    token: token,
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

      var list = res.data;
      if (list) {
        for (var i = 0, strHtml = '', strOne = ''; i < list.length; i++) {
          strHtml += '<option value="' + list[i].id + '">' + list[i].name + '</option>'
          strOne += '<p class="curst" data-title="' + list[i].name + '"  onclick="getXmList(' + list[i].id + ')">' + list[i].name + '</p>'
        }
        // $("#flSel").html('<option value="0">默认分类</option>' + strHtml);
        $("#flSel").html(strHtml);
        $(".otherXm").html(strOne);
      }
      // else {
      //   $("#flSel").html('<option value="0">默认分类</option>');
      // }

    },
    error: function (res) {
      layer.msg(res.msg, {
        time: 1500
      });
    }
  })

}

// 新建项目
function addXm() {
  var flSel = $("#flSel").val();
  var xmName = $("#xmName").val();
  var xmYusuan = $("#xmYusuan").val();
  if (flSel == '' || xmName == '' || xmYusuan == '') {
    layer.msg("请填写完整");
    return false
  }
  flSel = flSel == -1 ? 0 : flSel;
  if (xmid == '') {
    var obj = {
      token: token,
      name: xmName,
      budget: xmYusuan,
      cid: flSel
    }
  } else {
    var obj = {
      token: token,
      name: xmName,
      budget: xmYusuan,
      cid: flSel,
      id: xmid
    }
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
      $(".fenlTan2").hide();
      $("#xmName").val('');
      $("#xmYusuan").val('');
      $(".xmTex").html("新建项目");
      if (res.status == 200) {
        if (xmid == '') {
          window.location.href = 'new.html?id=' + res.data
        } else {
          console.log(fenLid)
          console.log(pageNum)
          getXmList(XmFlId, pageNum)
        }
      }
      layer.msg(res.msg, {
        time: 1500
      });
    },
    error: function (res) {
      $(".mask").hide();
      $(".fenlTan2").hide();
      $("#xmName").val('');
      $("#xmYusuan").val('');
      $(".xmTex").html("新建项目");
      layer.msg(res.msg, {
        time: 1500
      });
    }
  })
}


// 编辑项目弹框打开
function editXm(id, name, flId, yusuan) {
  $("#flSel").val(flId);
  $("#xmName").val(name);
  $("#xmYusuan").val(yusuan);
  $(".mask").show();
  $(".fenlTan2").show();
  $(".xmTex").html("修改项目");
  xmid = id
}


/**
 * [btnCheck 按钮倒计时常用于获取手机登录短信验证码]
 */
function btnCheck() {
  var tel = $("#lgFromAccount2").val();
  if (!(/^1[3456789]\d{9}$/.test(tel))) {
    layer.msg('手机号码有误，请重填');
    return false;
  }
  $(this).addClass("on");
  var time = 60;
  $(this).attr("disabled", true);
  var timer = setInterval(function () {
    if (time == 0) {
      clearInterval(timer);
      $(".forget-b").attr("disabled", false);
      $(".forget-b").html("获取验证码");
      $(".forget-b").removeClass("on");
    } else {
      time--;
      $('.forget-b').html(time + " 秒");
    }
  }, 1000);
  // 获取验证码
  _getCode(tel, 2)
}

/**
 * [btnCheck 按钮倒计时常用于获取手机注册短信验证码]
 */
function btnCheck1() {
  var tel = $("#lgFromAccount2").val();
  if (!(/^1[3456789]\d{9}$/.test(tel))) {
    layer.msg('手机号码有误，请重填');
    return false;
  }
  $(this).addClass("on");
  var time = 60;
  $(this).attr("disabled", true);
  var timer = setInterval(function () {
    if (time == 0) {
      clearInterval(timer);
      $(".forget-b").attr("disabled", false);
      $(".forget-b").html("获取验证码");
      $(".forget-b").removeClass("on");
    } else {
      time--;
      $('.forget-b').html(time + " 秒");
    }
  }, 1000);
  // 获取验证码
  _getCode(tel, 1)
}

/**
 * [btnCheck 按钮倒计时常用于获取修改手机号短信验证码]
 */
function btnCheck2(tel) {
  $(this).addClass("on");
  var time = 60;
  $('#passCode').attr("disabled", true);
  var timer = setInterval(function () {
    if (time == 0) {
      clearInterval(timer);
      $('#passCode').attr("disabled", false);
      $('#passCode').html("获取验证码");
      $('#passCode').removeClass("on");
    } else {
      time--;
      $('#passCode').html(time + " 秒");
    }
  }, 1000);
  // 获取验证码
  _getCode(tel, 3)
}

/**
 * [btnCheck 按钮倒计时常用于获取修改手机号短信验证码]
 */
function btnCheck4() {
  var newTel = $("#newTel").val();
  if (!(/^1[3456789]\d{9}$/.test(newTel))) {
    layer.msg('手机号码有误，请重填');
    return false;
  }
  $(this).addClass("on");
  var time = 60;
  $('#newCode').attr("disabled", true);
  var timer = setInterval(function () {
    if (time == 0) {
      clearInterval(timer);
      $('#newCode').attr("disabled", false);
      $('#newCode').html("获取验证码");
      $('#newCode').removeClass("on");
    } else {
      time--;
      $('#newCode').html(time + " 秒");
    }
  }, 1000);
  // 获取验证码
  _getCode(newTel, 1)
}

// 获取手机验证码
var _getCode = function (tel, type) {
  $.ajax({
    type: 'post',
    url: urlStr + '/Home/Index/sms_send',
    data: {
      phone: tel,
      type: type
    },
    dataType: 'json',
    success: function (res) {
      if (res.status == 1) {
        layer.msg(res.msg, {
          time: 1500
        });
        window.location.href = 'login.html'
      }
      layer.msg(res.msg)
    }
  })
}


// 判断是否登录
function islogin() {
  var _token = _cookie._get('token');
  var _nick_name = _cookie._get('nick_name');
  var _pic = _cookie._get('pic');
  if (_token) {
    if (_nick_name != '') {
      $("#nikname").html(_nick_name);
    }
    if (_pic != '') {
      $("#toux").attr("src", _pic);
    }
    return true
  } else {
    window.location.href = 'login.html';
    return false
  }
}

// 私钥加密 priK: 后台给的私钥 obj：需要穿的参数 json对象
function signEdit(priK, obj) {
  // 给json对象加个键值
  var time = (Date.parse(new Date())) / 1000;
  obj.timestamp = time;
  // 先对json对象进行升序排序
  var newkey = Object.keys(obj).sort(); //先用Object内置类的keys方法获取要排序对象的属性名，再利用Array原型上的sort方法对获取的属性名进行排序，newkey是一个数组
  var newObj = {};//创建一个新的对象，用于存放排好序的键值对
  for (var i = 0; i < newkey.length; i++) {//遍历newkey数组
    newObj[newkey[i]] = obj[newkey[i]];//向新创建的对象中按照排好的顺序依次增加键值对
  }

  // 把升序完的json对象进行转换字符串  name=1&age=2 这种
  var keys = [];
  for (var o in newObj) {
    keys.push(o + '=' + newObj[o]);
  }
  var string = keys.join('&');

  //  进行加密
  var src = string;
  var key = KEYUTIL.getKey(priK);
  // 创建 Signature 对象
  var signature = new KJUR.crypto.Signature({alg: "SHA256withRSA"});
  // 传入key实例, 初始化signature实例
  signature.init(key);
  // 传入待签明文
  signature.updateString(src);
  // 签名, 得到16进制字符结果
  var a = signature.sign();
  var qianM = hextob64(a);

  // 给json对象加个键值
  obj.sign = qianM;

  return obj
}

// 退出
function tuichu() {
  _cookie._set('token', '');
  _cookie._set('nick_name', '');
  _cookie._set('pic', '');
  window.location.href = 'login.html';
}

//截取url数据  GetRequest().code
function GetRequest() {
  var url = location.search; //获取url中"?"符后的字串
  var theRequest = new Object();
  if (url.indexOf("?") != -1) {
    var str = url.substr(1);
    strs = str.split("&");
    for (var i = 0; i < strs.length; i++) {
      theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
    }
  }
  return theRequest;
}

// 时间戳转时间 now：当前时间  type:1 年月日时分秒  else
function ZHDate(now, type) {
  var year = now.getYear();
  var month = now.getMonth() + 1;
  var date = now.getDate();
  var hour = now.getHours();
  var minute = now.getMinutes();
  var second = now.getSeconds();
  if (type == 1) {
    return "20" + year.toString().slice(1, 3) + "-" + getzf(month) + "-" + getzf(date) + "  " + getzf(hour) + ":" + getzf(minute);
  } else if (type == 2) {
    return getzf(hour) + ":" + getzf(minute);
  } else if (type == 6) {
    return "20" + year.toString().slice(1, 3) + "-" + getzf(month) + "-" + getzf(date) + "  " + getzf(hour) + ":" + getzf(minute) + ":" + getzf(second);
  } else if (type == 7) {
    return {
      year: "20" + year.toString().slice(1, 3),
      month: getzf(month),
      date: getzf(date)
    }
  } else {
    return "20" + year.toString().slice(1, 3) + "-" + getzf(month) + "-" + getzf(date);
  }

}

function getzf(num) {
  if (parseInt(num) < 10) {
    num = '0' + num;
  }
  return num;
}

function BumDate(time) {
  var num = new Date(time.replace(/-/g, "/")).getTime(time.replace(/-/g, "/")) / 1000
  return num
}

//设置title
function setTitle() {
  $('title').html($('title').html() + '益算宝');
  var footerHtmlstr = '<div class="act-content">' +
    '    <div class="footer-top">' +
    '        <img src="public/images/tel.png" alt="400-999-6541" class="tel-400">' +
    '        <div class="wx-code-img">' +
    '            <div class="qrcode-box">' +
    '                <img src="public/images/qrcode_gzh.jpg" alt="">' +
    '                <p>微信公众号</p>' +
    '            </div>' +
    '            <div class="qrcode-box">' +
    '                <img src="public/images/qrcode_xcx.jpg" alt="">' +
    '                <p>微信小程序</p>' +
    '            </div>' +
    '        </div>' +
    '    </div>' +
    '</div>' +
    '<div class="footer-bottom">' +
    '    <div class="act-content">' +
    '        <p class="link-list">' +
    '            <a href="javascript:;">关于我们</a>' +
    '            <span></span>' +
    '            <a href="javascript:;">联系我们</a>' +
    '            <span></span>' +
    '            <a href="javascript:;">隐私政策</a>' +
    '            <span></span>' +
    '            <a href="javascript:;">帮助中心</a>' +
    '        </p>' +
    '        <p class="footer-text">' +
    '            Copyright © 益算宝 冀ICP备11046062号 京公网安备110108008324号 北京易魔方科技集团有限公司 版权所有' +
    '        </p>' +
    '    </div>' +
    '</div>';
  $('#footerGray').html(footerHtmlstr);
}

//设置titleTwo
function setTitleTwo() {

  $('title').html($('title').html() + '益算宝');

  var HeaderHtmlstr = '<div class="logoBox">\n' +
    '            <div class="logoImg">\n' +
    '                <img src="public/images/logo.png" alt="">\n' +
    '            </div>\n' +
    '            <div class="lanM">\n' +
    '               <a href="index.html?all=1">' +
    '                   <span class="woD">我的项目</span>\n' +
    '               </a>' +
    '                <span class="xinJ tex2">新建项目</span>\n' +
    '            </div>\n' +
    '            <div class="txBox">\n' +
    '                <div class="zongh">\n' +
    '                    <a href="javascript:void(0);"  target="_blank" id="e"><span class="jgsz">机构设置</span></a>\n' +
    '                    <span class="Shux">|</span>\n' +
    '                    <span class="xxzx">消息中心</span>\n' +
    '                    <span>服务电话：400-999-6541</span>\n' +
    '                </div>\n' +
    '                <div class="tx"><img src="public/images/mrTx.png" id="toux" alt=""></div>\n' +
    '                <div class="name"><span id="nikname"></span></div>\n' +
    '                <div class="tuiC" onclick="tuichu()"><img src="public/images/guanb.png" alt=""></div>\n' +
    '                <a class="fanH" href="javascript:void(0);" target="_blank" id="g">返回益魔方首页</a>\n' +
    '            </div>\n' +
    '        </div>'
  $('.headTab').html(HeaderHtmlstr);

  var footerHtmlstr = '<div class="footer-bottomTwo">' +
    // '    <div class="act-content">' +
    // '        <p class="link-list">' +
    // '            <a href="javascript:;">关于我们</a>' +
    // '            <span></span>' +
    // '            <a href="javascript:;">联系我们</a>' +
    // '            <span></span>' +
    // '            <a href="javascript:;">隐私政策</a>' +
    // '            <span></span>' +
    // '            <a href="javascript:;">帮助中心</a>' +
    // '        </p>' +
    '        <p class="footer-text">' +
    '           版权所有：北京易魔方科技集团有限公司   冀ICP备18043421号-1' +
    '        </p>' +
    // '    </div>' +
    '</div>';
  $('#footerGray').html(footerHtmlstr);

  $("#d").attr("href","http://www.emof.cn/tiaoz.html?code=" + allToken + "&path=index.html")
  $("#e").attr("href","http://www.emof.cn/tiaoz.html?code=" + allToken + "&path=home.html")
  $("#g").attr("href","http://www.emof.cn/tiaoz.html?code=" + allToken + "&path=index.html")
}


$("#f").attr("href","http://www.emof.cn/index.html")