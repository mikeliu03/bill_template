define(["utils", "cem_element_set", "config"], function(utils, CEMElementSet, config){
	function CEMTextSet(opt){
		this.init(opt);
	}

	CEMTextSet.prototype = utils.inherit(CEMElementSet.prototype);

	$.extend(CEMTextSet.prototype, {
		constructor: CEMTextSet,
		
		name: "text_set",

		init_event: function(){
			var _this = this;
			var prefix = _this.prefix;

			// 是否必填
			this._bind_requied_event();

			// 数据源绑定
			this._init_data_resource("text", ".fee-mob-username", "input");

			// 前缀，后缀
			this._bind_text_radio_event("prefix", "prefix_name", "dt font");
			this._bind_text_radio_event("suffix", "suffix_name", "dd:last");

			// placeholder
			$(prefix + "placeholder").blur(function(){
				$("input", _this.target.dom).attr("placeholder", $.trim($(this).val()));
			});

			// maxlength
			$(prefix + "maxlength").blur(function(){
				var value = $.trim($(this).val());
				value = parseInt(value) || "";
				$("input", _this.target.dom).attr("maxlength", value);
			});
			this.common_input_init();

			// valid
			this._bind_valid_event("valid_number", "data-rule-number");
			this._bind_valid_event("valid_url", "data-rule-url");
			this._bind_valid_event("valid_email", "data-rule-email");
		},

		init_values: function(){
			var _this = this;
			var prefix = _this.prefix;
			var context = _this.target.dom;
			var _icon = $("span", context);
			var _prefix = $("font", context);
			var _elem = $("input", context);
			var _suffix = $("dd:last", context);

			// 必填
			if(_icon.css("display") === "none"){
				$(prefix + "required").addClass("actived");
			}else{
				$(prefix + "required").removeClass("actived");
			}

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
			
			// 后缀
			if(_suffix.css("display") === "none"){
				$(prefix + "suffix").addClass("actived");
				$(prefix + "suffix_name").attr("disabled", true).val(_suffix.html());
			}else{
				$(prefix + "suffix").removeClass("actived");
				$(prefix + "suffix_name").attr("disabled", false).val(_suffix.html());
			}

			$(prefix + "placeholder").val(_elem.attr("placeholder"));

			$(prefix + "maxlength").val(_elem.attr("maxlength"));

			if(!!_elem.attr("data-rule-number")){
				$(prefix + "valid_number").removeClass("actived")
			}else{
				$(prefix + "valid_number").addClass("actived")
			}

			if(!!_elem.attr("data-rule-url")){
				$(prefix + "valid_url").removeClass("actived")
			}else{
				$(prefix + "valid_url").addClass("actived")
			}

			if(!!_elem.attr("data-rule-email")){
				$(prefix + "valid_email").removeClass("actived")
			}else{
				$(prefix + "valid_email").addClass("actived")
			}
		}
	});

	return CEMTextSet;
});