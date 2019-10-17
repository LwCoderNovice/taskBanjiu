SELF.common = {
  _autoload: [
    'bindNav',
    'bindSelect'
  ],

  bindNav: function() {
    $('.menu li').hover(function() {
      $(this).find('.sub-menu').show();
    }, function() {
      $(this).find('.sub-menu').hide();
    })
  },
  bindSelect: function() {
    var _selectorArray = $('select.bj-select');
    $.each(_selectorArray, function(idx, val) {
      $(val).bjSelect();
    })
  }
}