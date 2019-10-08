(function($){
  var _selector = 'select.bj-select';

  var _selectorArray = $(_selector);
 
 // create handler
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

  $.each(_selectorArray, function(idx, val) {
    var _htmlSelectSeciton = $('<div/>', {
      'class': 'bj-selector'
    });
    var height = $(val).height();
    var className = val.className ?val.className: '';
    var text = $(val).find('option:selected').text() ? $(val).find('option:selected').text():'';
    createhandler(className, text).appendTo(_htmlSelectSeciton);
    _htmlSelectSeciton.append('<div class="bj-selector-options" style="top: '+ height +'">'+createoptions($(val))+'</div>');
    $(val).parent().append(_htmlSelectSeciton);
  })
  $('.bj-selector-options').on('click', 'span', function(e) {
    e.preventDefault();
    var value = $(this).data('value');
    $(this).parents('.bj-selector').prev('.bj-select').val(value).trigger('change');
    $(this).parents('.bj-selector').find('.bj-selector-handler').text($(this).text());
    $(this).parent('.bj-selector-options').hide();
  })
})(jQuery)