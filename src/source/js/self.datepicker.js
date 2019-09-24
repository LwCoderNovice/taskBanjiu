SELF.datepicker = {
    _autoload: [
        'bindSingleInput'
    ],

    bindSingleInput: function() {
        $.extend($.fn.datepicker.defaults, {
            format: 'yyyy-mm-dd',
            language: 'zh-CN'
        });
        $('.js-assess-date').datepicker();
    }
}