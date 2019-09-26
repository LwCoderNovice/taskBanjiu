SELF.action = {
    _autoload: [
        'addNewShipperAddress',
        'removerNewBlock'
    ],

    addNewShipperAddress: function() {
        $(document).on('click', '.js-add-newline', function(e) {
            e.preventDefault();
            var _template = template('requestBlock', {blockNum: '-todo 表单元素区分标识'});
            $(_template).appendTo($('#shipment-block'));
        })

        $(document).on('click', '.js-add-newunload', function(e) {
            e.preventDefault();
            var _template = template('uploadBlock', {blockNumber: '-todo 表单元素区分标识'});
            $(_template).appendTo($('#unload-block'));
        })
    },

    removerNewBlock: function() {
        $(document).on('click', '.js-remove-block', function(e) {
            e.preventDefault();
            $(this).parents('.request-block').remove();
        })
    }
}