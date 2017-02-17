define(["utils", "cem_element_set", "config"], function(utils, CEMElementSet, config){
	function CEMSelectSet(opt){
		this.init(opt);
	}

	CEMSelectSet.prototype = utils.inherit(CEMElementSet.prototype);

	$.extend(CEMSelectSet.prototype, {
		constructor: CEMSelectSet,
		
		name: "select_set",

		init_event: function(){
			var _this = this;
			var prefix = _this.prefix;

			// 是否必填
			this._bind_requied_event();

			// 默认名称
			this._bind_text_blur_event("name", "option");

			// 字段绑定
			this._init_data_resource("text", ".fee-mob-username", "select");
		},

		init_values: function(){
			var _this = this;
			var prefix = _this.prefix;
			var context = _this.target.dom;
			var _icon = $("span", context);

			// 必填
			if(_icon.css("display") === "none"){
				$(prefix + "required").addClass("actived");
			}else{
				$(prefix + "required").removeClass("actived");
			}

			// 默认名称
			$(prefix + "name").val($("option", context).html());

			// 字段绑定
			this._set_data_resource("text", ".fee-mob-username", "select");
		}
	});

	return CEMSelectSet;
});