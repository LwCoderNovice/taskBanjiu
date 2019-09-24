SELF.action = {
    _autoload: [
        'addNewShipperAddress'
    ],

    addNewShipperAddress: function() {
        $(document).on('click', '.js-add-newline', function(e) {
            e.preventDefault();
            
        })
    }
}