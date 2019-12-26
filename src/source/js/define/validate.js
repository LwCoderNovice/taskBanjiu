SELF.validate = {

  _autoload: [
    'verifyConfig',
    'formValidate'
  ],

  verifyConfig: function() {
    jQuery.validator.setDefaults({
      errorClass: 'form-error',
      errorPlacement: function(error, element) {
        error.appendTo(element.parents(".form-group"));
        element.parents(".form-group").addClass('form-validate');
      },
    })
  },

  formValidate: function() {
    $('.formEaxmple').validate({
      rules: {
        exampleInput: {
          required:  true
        }
      }
    })
  }
}