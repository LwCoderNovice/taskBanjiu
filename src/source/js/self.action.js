SELF.action = {
    _autoload: [
        'addNewShipperAddress',
        'removerNewBlock',
        'ajaxSelect2Demo'
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
    },

    ajaxSelect2Demo: function() {
        // select2单选ajax异步加载数据
          // url: ajax 请求地址 返回json
          // data: 请求参数 json 格式 return
          // processResults: 返回结果处理
          // minimumInputLength 触发请求需要的输入数
          $('#select2_ajax').select2({
            placeholder: '-----单选-----',
            ajax: {
                url: "data/ajax_data.json",
                dataType: 'json',
                delay: 250,
                data: function(params) {
                    return {
                        search: params.term,
                        site: "https://ops-coffee.cn"
                    };
                },
                processResults: function(data) {
                    return {
                        results: data.message
                    };
                },
                cache: true
            },
            minimumInputLength: 2
        });
    }
}