define(["utils", "cem_element_set", "config"], function(utils, CEMElementSet, config){
	function CEMRadioSet(opt){
		this.init(opt);
	}

	CEMRadioSet.prototype = utils.inherit(CEMElementSet.prototype);

	$.extend(CEMRadioSet.prototype, {
		constructor: CEMRadioSet,
		
		name: "radio_set",

		init_event: function(){
			var _this = this;
			var prefix = _this.prefix;


			// 数据源绑定
			this._init_data_resource("text", ".fee-mob-username", "input");

			// 前缀
			this._bind_text_radio_event("prefix", "prefix_name", "font");

			// 名称1
			this._bind_text_blur_event("text1", "span:eq(0)");

			// 名称2
			this._bind_text_blur_event("text2", "span:eq(1)");
		},

		init_values: function(){
			var _this = this;
			var prefix = _this.prefix;
			var context = _this.target.dom;
			var _prefix = $("font", context);
			var _elem = $("span", context);

			// 数据源
			this._set_data_resource("text", ".fee-mob-username", "input");
			
			// 前缀
			if(_prefix.css("display") === "none"){
				$(prefix + "prefix").addClass("actived");
				$(prefix + "prefix_name").attr("disabled", true).val(_prefix.html());
			}else{
				$(prefix + "prefix").removeClass("actived");
				$(prefix + "prefix_name").attr("disabled", false).val(_prefix.html());
			}
			

			$(prefix + "text1").val(_elem.eq(0).html());
			$(prefix + "text2").val(_elem.eq(1).html());
		}
	});

	return CEMRadioSet;
});