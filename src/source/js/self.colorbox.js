SELF.colorbox = {
  _autoload: [
    'initcolorbox',
    'bindcolorbox'
  ],

  initcolorbox: function() {
    SELF.bj_popup = {
      config: {
        maxWidth:"100%",
        width:"auto",
        overlayClose: false,
        trapFocus: false,
        transition:"none",
        closeButton: false,
        onComplete: function() {
          $.colorbox.resize();
        }
      },
    
      open: function(config){
        return $.colorbox(config);
      },
    
      resize: function(){
        $.colorbox.resize();
      },
    
      close: function(){
        $.colorbox.close();
      }
    }
  },

  bindcolorbox: function() {
    $(document).on('click', '.js-get-address', function(e) {
      e.preventDefault();
      SELF.bj_popup.open({
        html: $('#getCurrentAddress').html(),
        width: '800px',
        height: '700px'
      })
    })

    $(document).on('click', '#colorbox .js-close-modal', function() {
      SELF.bj_popup.close();
    })

    // 订单明细弹窗
    $(document).on('click', '.js-show-detail', function(e) {
      e.preventDefault();
      var url = $(this).data('url'); // 请求地址，返回Html片段
      SELF.bj_popup.open( {
        url: url,
        width: '800px',
        height: '700px'
      })
    })
  }
}