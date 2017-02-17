define(["utils", "cem_element", "config"], function(utils, CEMElement, config){
	function CEMTextArea(opt){
		if(this === window) return;
		this.init(opt);
	}

	CEMTextArea.prototype = utils.inherit(CEMElement.prototype);

	$.extend(CEMTextArea.prototype, {
		constructor: CEMTextArea,
		
		name: "cem_textarea",

		html: '<div class="fee-mob-main"><div class="fee-textarea"><p><span class="glyphicon glyphicon-exclamation-sign"></span><font>备注</font></p><textarea disabled="disabled" class="form-control" placeholder="备注内容" rows="5"></textarea></div></div>',

		init_event: function(){
			CEMElement.prototype.init_event.call(this);
		}
			
	});

	return CEMTextArea;
});