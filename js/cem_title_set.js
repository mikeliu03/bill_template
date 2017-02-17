define(["utils", "cem_element_set", "config"], function(utils, CEMElementSet, config){
	function CEMTitleSet(opt){
		this.init(opt);
	}

	CEMTitleSet.prototype = utils.inherit(CEMElementSet.prototype);

	$.extend(CEMTitleSet.prototype, {
		constructor: CEMTitleSet,
		
		name: "title_set",

		init_event: function(){
			var _this = this;
			var prefix = _this.prefix;

			// 标题
			this._bind_text_blur_event("title", ".fee-mob-header-title");

			// 申请人
			this._init_data_resource("order", ".fee-mob-username", ".fee-mob-username span:eq(0)");

			// 申请人部门
			this._init_data_resource("part", ".fee-mob-username", ".fee-mob-username span:eq(1)");

			// 申请人公司
			this._init_data_resource("company", ".fee-mob-cont:eq(0)", ".fee-mob-cont:eq(0) font");

			// 申请金额
			this._init_data_resource("money", ".fee-mob-sum", ".fee-mob-sum b");

			// 单据编号
			this._init_data_resource("form", ".fee-mob-cont:eq(1)", ".fee-mob-cont:eq(1) font");

			// 条形码
			this._init_data_resource("barcode", ".fee-mob-tcode > img", ".fee-mob-tcode > img");

			// 二维码
			this._init_data_resource("qrcode", ".fee-mob-tcode > span", ".fee-mob-tcode > span");
		},

		init_values: function(){
			// 标题
			this._set_text_value("title", ".fee-mob-header-title");

			// 申请人
			this._set_data_resource("order", ".fee-mob-username", ".fee-mob-username span:eq(0)");

			// 申请人部门
			this._set_data_resource("part", ".fee-mob-username", ".fee-mob-username span:eq(1)");

			// 申请人公司
			this._set_data_resource("company", ".fee-mob-cont:eq(0)", ".fee-mob-cont:eq(0) font");

			// 申请金额
			this._set_data_resource("money", ".fee-mob-sum", ".fee-mob-sum b");

			// 单据编号
			this._set_data_resource("form", ".fee-mob-cont:eq(1)", ".fee-mob-cont:eq(1) font");

			// 条形码
			this._set_data_resource("barcode", ".fee-mob-tcode > img", ".fee-mob-tcode > img");

			// 二维码
			this._set_data_resource("qrcode", ".fee-mob-tcode > span", ".fee-mob-tcode > span");
		}
	});

	return CEMTitleSet;
});