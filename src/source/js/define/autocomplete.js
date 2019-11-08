SELF.autocomplete = {

  _autoload: [
    'verifyConfig'
  ],

  verifyConfig: function() {
    jQuery.autocomplete.setDefaults({
      _renderItem: function() {
        // reset ui
      }
    })
  },
  bindAutoCompleteInput: function() {
    $('.bj-autocomplete').autocomplete({
      
    })
  }
}