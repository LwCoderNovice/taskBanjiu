SELF.common = {
  _autoload: [
    'bindNav'
  ],

  bindNav: function() {
    $('.menu li').hover(function() {
      $(this).find('.sub-menu').show();
    }, function() {
      $(this).find('.sub-menu').hide();
    })
  }
}