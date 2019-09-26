SELF.colorbox = {
  _autoload: [
    'initcolorbox',
    'bindcolorbox'
  ],

  initcolorbox: function() {
    SELF.bj_popup = {
      config: {
        maxWidth:"100%",
        opacity:0.7,
        width:"auto",
        overlayClose: false,
        trapFocus: false,
        transition:"none",
        close:'<span class="glyphicon glyphicon-remove-circle"></span>',
        title:'<div class="headline"><span class="headline-text">{title}</span></div>',
        onComplete: function() {
          $.colorbox.resize();
        }
      },
    
      open: function(title,config){
        var config = $.extend({},SELF.bj_popup.config,config);
        if ( typeof config.title === "string" ) {
          config.title = config.title.replace(/{title}/g,title);
        } 
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
      SELF.bj_popup.open('获取地址', {

      })
    })
  }
}