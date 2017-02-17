define(["utils", "cem_element_set", "config"], function(utils, CEMElementSet, config){
	function CEMTextAreaSet(opt){
		this.init(opt);
	}

	CEMTextAreaSet.prototype = utils.inherit(CEMElementSet.prototype);

	$.extend(CEMTextAreaSet.prototype, {
		constructor: CEMTextAreaSet,
		
		name: "textarea_set",

		init_event: function(){
			var _this = this;
			var prefix = _this.prefix;

			// prefix
			this._bind_text_blur_event("prefix_name", "font");

			// data resource
			this._init_data_resource("text", ".fee-mob-username", "textarea");

			// placeholder
			$(prefix + "placeholder").blur(function(){
				$("textarea", _this.target.dom).attr("placeholder", $.trim($(this).val()));
			});

			// maxlength
			$(prefix + "maxlength").blur(function(){
				var value = $.trim($(this).val());
				value = parseInt(value) || "";
				$("textarea", _this.target.dom).attr("maxlength", value);
			});
			this.common_input_init();
		},

		init_values: function(){
			var _this = this;
			var prefix = _this.prefix;
			var context = _this.target.dom;
			var _prefix = $("font", context);
			var _elem = $("textarea", context);

			
			// 前缀
			if(_prefix.css("display") === "none"){
				$(prefix + "prefix").addClass("actived");
				$(prefix + "prefix_name").attr("disabled", true).val(_prefix.html());
			}else{
				$(prefix + "prefix").removeClass("actived");
				$(prefix + "prefix_name").attr("disabled", false).val(_prefix.html());
			}
			
			// data resource
			this._set_data_resource("text", ".fee-mob-username", "textarea");

			$(prefix + "placeholder").val(_elem.attr("placeholder"));

			$(prefix + "maxlength").val(_elem.attr("maxlength"));
		}
	});

	return CEMTextAreaSet;
});