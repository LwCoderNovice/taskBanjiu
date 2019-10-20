SELF.calendar = {
    _autoload: [
        'bindCommonCalendar',
        'bindSpecialCalendar'
    ],

    bindCommonCalendar: function() {
        $.extend($.fn.datepicker.defaults, {
            format: 'yyyy-mm-dd',
            language: 'zh-CN',
            autoclose: true
        });
        var $dateEle = $('.js-common-calendar');
        if($dateEle.length > 0) {
            $.each($dateEle, function(idx, val) {
                $(val).datepicker()
            })
        }
    },

    bindSpecialCalendar: function() {
        // range date
        var $eleArg = $('.bj-range-date');
        if($eleArg.length > 0) {
            $.each($eleArg, function(idx, val) {
                var $startDate = $(val).find('.date-start input');
                var $endDate = $(val).find('.date-end input');
                $startDate.datepicker({
                }).on('changeDate', function(e) {
                    $endDate.datepicker('setStartDate', e.date);
                })
                $endDate.datepicker({
                    
                })
            })
        }
        // has time 
        var $ele = $('.js-common-time');
        if($ele.length > 0) {
            $.each($ele, function(idx, val) {
                $(val).datepicker({
                    format: 'yyyy-mm-dd',
                })
            })
        }
    }
}