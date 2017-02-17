define(["utils", "cem_element", "config"], function(utils, CEMElement, config){
	function CEMText(opt){
		if(this === window) return;
		this.init(opt);
	}

	CEMText.prototype = utils.inherit(CEMElement.prototype);

	$.extend(CEMText.prototype, {
		constructor: CEMText,
		
		name: "cem_text",

		html: '<div class="fee-template-box"><dl class="fee-template-text"><dt><span class="glyphicon glyphicon-exclamation-sign" ></span><font>前缀名称</font></dt><dd><input type="text" class="form-control" disabled="disabled" required="required"></dd><dd>后缀</dd></dl></div>',

		init_event: function(){
			CEMElement.prototype.init_event.call(this);
		}
			
	});

	return CEMText;
});