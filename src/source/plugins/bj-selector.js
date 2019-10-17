(function($) {
  $.fn.extend({
    'bjSelect': function(options) {

      var opts = $.extend({}, defaluts, options);
      return this.each(function() {
        var $this = $(this);
        var _htmlSelectSeciton = $('<div/>', {
          'class': 'bj-selector'
        });
        var height = $this.height();
        var className = this.className ?this.className: '';
        var text = $this.find('option:selected').text() ? $this.find('option:selected').text():'';
        createhandler(className, text).appendTo(_htmlSelectSeciton);
        _htmlSelectSeciton.append('<div class="bj-selector-options" style="top: '+ height +'">'+createoptions($this)+'</div>');
        $this.parent().append(_htmlSelectSeciton);
      })
    }
  })
  var defaluts = {
      
  }
  // create handler
  $(document).on('click', '.bj-selector-options span', function(e) {
    e.preventDefault();
    var value = $(this).data('value');
    $(this).parents('.bj-selector').prev('.bj-select').val(value).trigger('change');
    $(this).parents('.bj-selector').find('.bj-selector-handler').text($(this).text());
    $(this).parent('.bj-selector-options').hide();
  })
  var createhandler = function(classname, text) {
        var handlerClass = 'bj-selector-handler ' + (classname?classname:'');
        var handlerText = text ? text: '请选择';
        var _htmlSelectHandler = $('<div />', {
          'class': handlerClass,
          text: handlerText,
          click: function(e) {
            e.preventDefault();
            $(this).next('.bj-selector-options').toggle();
          }
        })
        return _htmlSelectHandler;
  }   
  // create options
  var createoptions = function (selector) {
    var options = '';
    var preOptions = $(selector).find('option');
    
    $.each(preOptions, function(idx, val) {
        options += '<span data-value="'+ $(val).prop('value') +'">' + $(val).html() + '</span>';
    })
    return options;
  }
  // reload
  $.fn.bjSelect.reload = function (obj){
    $(obj).next('.bj-selector').remove();
    $(obj).bjSelect(); 
  }
})(jQuery)