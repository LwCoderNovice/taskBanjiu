function _autoload(){
	$.each(SELF,function(section,obj){
		if($.isArray(obj._autoload)){
			$.each(obj._autoload,function(key,value){
				if($.isArray(value)){
					if(value[1]){
						SELF[section][value[0]]();
					}else{
						if(value[2]){
							SELF[section][value[2]]()
						}
					}
				}else{
					SELF[section][value]();
				}
			})
		}
	})
}

$(function(){
	_autoload();
});