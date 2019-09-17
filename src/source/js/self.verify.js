SELF.verify = {
  _autoload: [
    'verifyConfig',
    'verifyLoginForm'
  ],
  verifyConfig: function() {
    jQuery.validator.setDefaults({
      errorClass: 'form-error',
      errorPlacement: function(error, element) {
        error.appendTo(element.parents(".form-group"));
      },
    })
  },
  verifyLoginForm: function() {
    $('#loginForm').validate({
      // TODO 密码登录表单验证
      // name : rule
      rules: {
        'account': 'required',
        'pwd': 'required',
        'vcode': 'required'
      }
    });

    $('#phoneLoginForm').validate({
      // TODO 验证码登录表单验证
    });
  }
}