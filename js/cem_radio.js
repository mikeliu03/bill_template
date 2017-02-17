define(["utils", "cem_element", "config"], function(utils, CEMElement, config){
	function CEMRadio(opt){
		if(this === window) return;
		this.init(opt);
	}

	CEMRadio.prototype = utils.inherit(CEMElement.prototype);

	$.extend(CEMRadio.prototype, {
		constructor: CEMRadio,
		
		name: "cem_text",

		html: '<div class="fee-template-box"><dl class="fee-template-text"><dt><font>前缀名称</font></dt><dd><input type="radio" disabled="disabled"><span>名称1</span><input type="radio" disabled="disabled"><span>名称2</span></dd></dl></div>',

		init_event: function(){
			CEMElement.prototype.init_event.call(this);
		}
			
	});

	return CEMRadio;
});