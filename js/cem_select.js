define(["utils", "cem_element", "config"], function(utils, CEMElement, config){
	function CEMSelect(opt){
		if(this === window) return;
		this.init(opt);
	}

	CEMSelect.prototype = utils.inherit(CEMElement.prototype);

	$.extend(CEMSelect.prototype, {
		constructor: CEMSelect,
		
		name: "cem_select",

		html: '<div class="fee-template-box"><dl class="fee-template-select"><dt><span class="glyphicon glyphicon-exclamation-sign"></span></dt><dd><select disabled="disabled" required="required" class="form-control"><option value="">请选择</option></select></dd></dl></div>',

		init_event: function(){
			CEMElement.prototype.init_event.call(this);
		}
			
	});

	return CEMSelect;
});