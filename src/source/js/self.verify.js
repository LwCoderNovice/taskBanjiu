SELF.verify = {
  _autoload: [
    'verifyLoginForm'
  ],

  verifyLoginForm: function() {
    $('#loginForm').validate({
      // TODO 密码登录表单验证
      errorClass: 'form-error',
      errorPlacement: function(error, element) {
        error.appendTo(element.parent(".form-group"));
      },
      rules: {
        'username': 'required',
        'password': 'required'
      },
      messages: {
        'username': '请输入用户名',
        'password': '请输入密码'
      }
    });

    $('#phoneLoginForm').validate({
      // TODO 验证码登录表单验证
    });
  }
}