var loginType = 1;
// $(function () {
//   var _phone = _cookie._get('phone');
//   if (_phone) {
//     $('#lgFromAccount1').val(_phone);
//     $('#lgFromAccount2').val(_phone);
//   }
//   if (mid) {
//     window.location.href = 'home.html';
//   }
// })
var _ratio = {
  _phone: function (tel) {
    if (tel == "") {
      layer.msg("请输入手机号");
      return false;
    } else if (!tel.match(/^1\d{10}$/)) {
      layer.msg("请输入正确的手机号");
      return false;
    } else {
      return true
    }
  },
  _account: function (tel) {
    if (tel == "") {
      layer.msg("请输入帐号");
      return false;
    } else if (tel.length < 6) {
      layer.msg("请输入正确的帐号");
      return false;
    } else {
      return true
    }
  },
  _password: function (text) {
    if (text == "") {
      layer.msg("请输入密码");
      return false;
    } else if (text.length < 6) {
      layer.msg("密码输入错误");
      return false;
    } else {
      return true
    }
  },
  _code: function (num) {
    if (num == "") {
      layer.msg("请输入验证码");
      return false;
    } else if (num.length != 6) {
      layer.msg("验证码输入错误");
      return false;
    } else {
      return true
    }
  }
}

// 登录切换
function modeTab(num) {
  loginType = num;
  $('.login-tab a').removeClass('active');
  $('.login-tab a.t' + num).addClass('active');
  $('.login-mode').hide();
  $('#loginMode' + num).show();
}

// 登录
function login() {
  var _account = '',
    _code = '';

  if (loginType == 1) {
    _account = $.trim($('#lgFromAccount1').val());
    _code = $.trim($('#passWord').val());
    if (_ratio._account(_account) && _ratio._password(_code)) {
      var _load = layer.load(2,{
        shade: [0.6,'#000']
      });
      $.ajax({
        type: 'post',
        url: urlStr + '/Home/User/login',
        data: {
          phone: _account,
          pass: _code
        },
        dataType: 'json',
        success: function (res) {
          layer.close(_load);
          if(res.status == 1) {
            layer.msg(res.msg, {
              time: 1500
            });
            window.location.href = 'login.html'
          }
          if(res.status != 200) {
            layer.msg(res.msg)
            return false
          }
          _cookie._set('token', res.data.token, 36000);
          _cookie._set('nick_name', res.data.nick_name, 36000);
          _cookie._set('pic', res.data.pic, 36000);
          _cookie._set('sign', res.data.privatekey, 36000);
          _cookie._set('allToken', res.data.emofUserTokenSafer, 36000);
          _cookie._set('morglogo', res.data.morglogo, 36000);
          _cookie._set('morgname', res.data.morgname, 36000);
          window.location.href = 'index.html';
        },
        error: function (res) {
          layer.msg(res.msg)
        }
      })
    } else {
      layer.msg("请正确输入")
      return
    }
  } else {
    _account = $.trim($('#lgFromAccount2').val());
    _code = $.trim($('#passCode').val());
    if (_ratio._phone(_account) && _ratio._code(_code)) {
      var _load = layer.load(2,{
        shade: [0.6,'#000']
      });
      $.ajax({
        type: 'post',
        url: urlStr + '/Home/User/sms_login',
        data: {
          phone: _account,
          code: _code
        },
        dataType: 'json',
        success: function (res) {
          layer.close(_load);
          if(res.status == 1) {
            layer.msg(res.msg, {
              time: 1500
            });
            window.location.href = 'login.html'
          }
          if(res.status != 200) {
            layer.msg(res.msg)
            return false
          }
          _cookie._set('token', res.data.token, 36000);
          _cookie._set('nick_name', res.data.nick_name, 36000);
          _cookie._set('pic', res.data.pic, 36000);
          _cookie._set('sign', res.data.privatekey, 36000);
          _cookie._set('morglogo', res.data.morglogo, 36000);
          _cookie._set('morgname', res.data.morgname, 36000);
          _cookie._set('allToken', res.data.emofUserTokenSafer, 36000);
          window.location.href = 'index.html';
        },
        error: function (res) {
          layer.msg(res.msg)
        }
      })

    } else {
      layer.msg("请正确输入")
      return

    }
  }

}

// 注册
function register() {
  var _account = $.trim($('#lgFromAccount2').val());
  var _code = $.trim($('#yzmCode').val());
  var _pass = $.trim($('#password').val());
  var _mpass = $.trim($('#twoPassword').val());
  if (!_ratio._phone(_account) || !_ratio._code(_code)) {
    return
  }
  if (_pass.length < 6 || _mpass < 6) {
    layer.msg("密码格式不正确");
    return
  }
  if (_pass != _mpass) {
    layer.msg("两次密码不相同");
    return
  }
  var _load = layer.load(2);
  $.ajax({
    type: 'post',
    url: urlStr + '/Home/User/signup',
    data: {
      phone: _account,
      code: _code,
      pass:_pass,
      repass: _mpass
    },
    dataType: 'json',
    success: function (res) {
      layer.close(_load);
      if(res.status == 1) {
        layer.msg(res.msg, {
          time: 1500
        });
        window.location.href = 'login.html'
      }
      layer.msg(res.msg)
      if(res.status != 200) {
        return false
      }
      window.location.href = 'login.html'

    },
    error: function (res) {
      layer.msg(res.msg)
    }
  })
}


// 找回密码
function findPass() {
  var _account = $.trim($('#lgFromAccount2').val());
  var _code = $.trim($('#yzmCode').val());
  var _pass = $.trim($('#password').val());
  var _mpass = $.trim($('#twoPassword').val());
  if (!_ratio._phone(_account) || !_ratio._code(_code)) {
    return
  }
  if (_pass.length < 6 || _mpass < 6) {
    layer.msg("密码格式不正确");
    return
  }
  if (_pass != _mpass) {
    layer.msg("两次密码不相同");
    return
  }
  var _load = layer.load(2);
  $.ajax({
    type: 'post',
    url: urlStr + '/Home/User/forget',
    data: {
      phone: _account,
      code: _code,
      pass:_pass,
      repass: _mpass
    },
    dataType: 'json',
    success: function (res) {
      layer.close(_load);
      if(res.status == 1) {
        layer.msg(res.msg, {
          time: 1500
        });
        window.location.href = 'login.html'
      }
      layer.msg(res.msg)
      if(res.status != 200) {
        return false
      }
      window.location.href = 'login.html'
    },
    error: function (res) {
      layer.msg(res.msg)
    }
  })
}