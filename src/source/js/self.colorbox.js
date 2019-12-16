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
    $(document).on('click', '.js-show-detail', function(e) {
      e.preventDefault();
      //var $url = 'baidu.com'; // 请求地址  返回html 为#showDetail中的所有html
      //var $url ='Shipper/Requirement/RequirementDetailPartial';// 'baidu.com'; // 请求地址  返回html 为#showDetail中的所有html
      var id=$(e.target).parents('tr').find("td.idclass").html();
      var $url = '/Shipper/Requirement/RequirementDetailPartial/'+id; // 请求地址  返回html 为#showDetail中的所有html
      SELF.bj_popup.open( {
        href: $url,
        className: 'special-pop',
        width: '1200px',
        height: '700px',
        onComplete: function() {
          SELF.calendar.bindSpecialCalendar();
        },
        onClose: function($html) {
          $('#showDetail').html($html);
        }
      })
    })
    // 权限管理
    $(document).on('click', '.js-permission-edit', function(e) {
      e.preventDefault();
      SELF.bj_popup.open({
        href: 'permission_edit.html',
        className: 'space-popup',
        width: '800px'
      })
    })
    $(document).on('click', '.js-permission-add', function(e) {
      e.preventDefault();
      SELF.bj_popup.open({
        href: 'permission_add.html',
        className: 'space-popup',
        width: '800px'
      })
    })
    $(document).on('click', '.js-permission-remove', function(e) {
      e.preventDefault();
      SELF.bj_popup.open({
        href: 'permission_remove.html',
        className: 'space-popup',
        width: '800px'
      })
    })
    // 合同管理
    $(document).on('click', '.js-contract-add', function(e) {
      e.preventDefault();
      SELF.bj_popup.open({
        href: 'contract_add.html',
        className: 'space-popup',
        width: '800px',
        onComplete: function() {
          $('.bj-select').bjSelect();
          SELF.upload.bindUploadEvent();
        }
      })
    })
  }
}