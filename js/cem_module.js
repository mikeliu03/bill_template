define(["utils", "cem_element", "config"], function(utils, CEMElement, config){
	function CEMModule(opt){
		if(this === window) return;
		this.init(opt);
	}

	CEMModule.prototype = utils.inherit(CEMElement.prototype);

	$.extend(CEMModule.prototype, {
		constructor: CEMModule,
		
		name: "cem_module",

		html: '<div class="fee-mob"><div class="fee-mob-title" data-edit_area="edit">模板名称</div><div class="fee-mob-main"><div class="prompt"><span class="glyphicon glyphicon-plus"></span>左侧控件拖放至此处添加</div></div></div>',

		init_event: function(){
			CEMElement.prototype.init_event.call(this);
		},

		mark: function(){
			$("#edit_area .fee-actived").removeClass("fee-actived");
			$(".fee-mob-title", this.dom).addClass("fee-actived");
		}
	});

	return CEMModule;
});