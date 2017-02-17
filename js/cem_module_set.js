define(["utils", "cem_element_set", "config"], function(utils, CEMElementSet, config){
	function CEMModuleSet(opt){
		this.init(opt);
	}

	CEMModuleSet.prototype = utils.inherit(CEMElementSet.prototype);

	$.extend(CEMModuleSet.prototype, {
		constructor: CEMModuleSet,
		
		name: "module_set",

		init_event: function(){
			var _this = this;
			var prefix = _this.prefix;

			// 标题
			$(prefix + "title").blur(function(){
				$(".fee-mob-title", _this.target.dom).text(this.value);
			});

			// 模块类型
			this._init_data_resource("type", ".fee-mob-username", "");
		},

		init_values: function(){
			var _this = this;
			var prefix = _this.prefix;
			var context = _this.target.dom;

			// 标题
			$(prefix + "title").val($.trim($(".fee-mob-title", context).text()));
		}
	});

	return CEMModuleSet;
});