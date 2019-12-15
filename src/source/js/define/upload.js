SELF.upload = {
  _autoload: [
    'uploadConfig',
    'bindUploadEvent'
  ],

  uploadConfig: function() {
    // Global config
    // upload taget, if not define, please set in each call 
    Dropzone.prototype.defaultOptions.url = '/file/post';
    // limit number of file upload
    Dropzone.prototype.defaultOptions.maxFiles = 1;
    // bind the init events
    Dropzone.prototype.defaultOptions.init = function() {
      // when upload the second file trigger this event
      this.on("maxfilesexceeded", function(file) {
        this.removeAllFiles();
        this.addFile(file);
      });
      // after add file
      this.on('addedfile', function() {
        console.log(1)
      })
      // remov file
      this.on('removedfile', function() {
        // removefile 
        console.log('Removed');
        // todo: if want to delete the file from server
      })
      var _this = this;
      this.on('complete', function(file) {
        // has bug
        console.log('complete');
        $(this.element).find('.remove').on('click', function(file) {
          console.log('remove');
          _this.removeAllFiles(true);

        })
      })
    }

    $('.bj-upload-block').on('click', 'span.bj-message', function(e) {
      e.preventDefault();
      $(this).parents('.bj-upload-block').trigger('click');
    })
  },

  bindUploadEvent: function() {
    // 实例
    $('div.js-upload-example').dropzone({
      // individuality configuration
      // url: '',
      // chunkSize: 20000  // then this defines the chunk size in bytes.
    })
    
    // 道路运输许可证
    $('div.js-upload-way').dropzone({
    })
    
    // 经营许可证
    $('div.js-upload-operation').dropzone({

    })

    // 营业执照
    $('div.js-upload-license').dropzone({

    })
    // 驾驶证
    $('div.js-upload-driver-sheet').dropzone({

    })

    // 多图片
    $('div.js-upload-multiple-example').dropzone({
      uploadMultiple: true,
      clickable: false
    })
  }
}