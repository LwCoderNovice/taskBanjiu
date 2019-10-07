SELF.upload = {
  _autoload: [
    'uploadFunction'
  ],

  uploadFunction: function() {
    $('div.js-upload-way').dropzone({
      url: '/file/post'
    })
    $('.js-upload-way').on('addedfile', function() {
      console.log(1)
    })
  }
}