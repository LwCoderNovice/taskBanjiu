SELF.verify = {
  _autoload: [
    'verifyConfig'
  ],
  verifyConfig: function() {
    jQuery.validator.setDefaults({
      errorClass: 'form-error',
      errorPlacement: function(error, element) {
        error.appendTo(element.parents(".form-group"));
      },
    })
  }
}