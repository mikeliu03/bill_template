define(["jquery", "config", "spectrum"], function($, config, spectrum){
	/**
	 * 页面元素对应设置对象的父类: new editor element set
	 */
	function CEMElementSet(){}

	CEMElementSet.prototype = {
		constructor: CEMElementSet,

		dom: null,				// 与设置对象绑定的DOM对象

		target: null,			// 当前正在设置的对象

		name: "",

		prefix: "",

		data_resource: null,		// 数据源

		/**
		 * 初始化方法
		 */
		init: function(opt){
			for(var i in opt){
				if(this[i] !== undefined){
					this[i] = opt[i];
				}
			}

			this.dom = $("#" + this.name);
			this.prefix = "#" + this.name + "_";

			// 样式初始化
			this.init_style();

			// 事件初始化
			this.init_event();

			// 绑定对象
			$(this.dom).data("target", this);
		},

		/**
		 * 初始化事件
		 */
		init_event: function(){},

		/**
		 * 初始化样式
		 */
		init_style: function(){},
		
		/**
		 * 显示设置对象
		 */
		set: function(target){
			this.target = target;
			this.init_style();
			this.init_values();
			// 控制面板
			$("#edit_area").removeClass("status");
			$("#set_area").removeClass("status");
			$("#set_area > div").hide();
			this.dom.show();
		},

		/**
		 * 初始化当前设置的对象的值
		 */
		init_values: function(){},

		/**
		 * 销毁设置对象
		 */
		destroy: function(){
			$(this.dom).removeData().remove();
			this.dom = null;
			this.target = null;
		},

		/**
		 * 通用必填click事件
		 */
		_bind_requied_event: function(){
			var _this = this;
			$(this.prefix + "required").click(function(){
				var context = _this.target.dom;
				var _req = $("dt span", context);
				var _input = $("input, select", context);

				$(this).toggleClass("actived");
				if($(this).hasClass("actived")){
					_req.hide();
					_input.removeAttr("required");
				}else{
					_req.show();
					_input.attr("required", "required");
				}
			});
		},
		
		/**
		 * 绑定文本框 blur 事件
		 * @params name 文本框id后缀
		 * @params selector 需要操作的DOM对象的选择器
		 */
		_bind_text_blur_event: function(name, selector){
			var _this = this;
			$(_this.prefix + name).on("blur", function(){
				$(selector, _this.target.dom).html(this.value);
			});
		},
		
		/**
		 * 绑定文本框 blur 事件 +radio click 事件
		 */
		_bind_text_radio_event: function(text_name, radio_name, selector){
			var _this = this;
			_this._bind_text_blur_event(radio_name, selector);

			$(_this.prefix + text_name).click(function(){
				var text_dom = $(selector, _this.target.dom);
				var radio_dom = $(_this.prefix + radio_name);
				$(this).toggleClass("actived");
				if($(this).hasClass("actived")){
					text_dom.hide();
					radio_dom.attr("disabled", "disabled");
				}else{
					text_dom.show();
					radio_dom.removeAttr("disabled");
				}
			});
		},

		/**
		 * 设置文本框的值
		 * @params name 文本框id后缀
		 * @params selector 需要操作的DOM对象的选择器
		 */
		_set_text_value: function(name, selector){
			$(this.prefix + name).val($.trim($(selector, this.target.dom).html()));
		},
		
		/**
		 * 初始化数据源插件
		 */
		_init_data_resource: function(name, selectors, resource_elem){
			var _this = this;
			var chk = $(_this.prefix + name + "_required");
			var resource = $(_this.prefix + name + "_resource");
			var drop = $(".fee-select-con", resource);
			
			// checkbox click event
			chk.click(function(){
				var context = _this.target.dom;
				$(this).toggleClass("actived");
				if($(this).hasClass("actived")){
					resource.addClass("disabled");
					$(selectors, context).hide();
				}else{
					resource.removeClass("disabled");
					$(selectors, context).show();
				}
			});
			
			$("p", resource).click(function(){
				if(resource.hasClass("disabled")) return false;
				drop.toggle();
			});
			resource.on("click", "ul li", function(){
				var elem = resource_elem ? $(resource_elem, _this.target.dom) : $(_this.target.dom);
				$(this).addClass("actived").siblings().removeClass("actived");
				drop.hide();
				$("font", resource).html($(this).html());

				// 数据绑定
				if(resource_elem === "select" || resource_elem === ".fee-mob-username span:eq(0)"){
					elem.attr({
						"data-url": $(this).data("url") || ""
					});
				}
				elem.attr({
					"data-resource": $(this).data("value") || "",
					"name": $(this).data("value") || ""
				});
				
			});
			resource.mouseleave(function(){
				drop.hide();
			});
		},

		/**
		 * 设置数据源的值
		 */
		_set_data_resource: function(name, selectors, resource_elem){
			var _this = this;
			var chk = $(_this.prefix + name + "_required");
			var context = _this.target.dom;
			var resource = $(_this.prefix + name + "_resource");
			var drop = $(".fee-select-con", resource);
			var value = $(resource_elem, context).attr("data-resource");

			if($(selectors, context).css("display") === "none"){
				chk.addClass("actived");
				resource.addClass("disabled");
			}else{
				chk.removeClass("actived");
				resource.removeClass("disabled");
			}

			if(!value){
				$("font", resource).html("请选择");
			}else{
				$("font", resource).html($("ul li[data-value='"+value+"']", resource).html());
			}
		},
		
		/**
		 * 通用设置验证事件
		 */
		_bind_valid_event: function(name, valid_name){
			var _this = this;
			$(_this.prefix + name).click(function(){
				var value = "true";
				$(this).toggleClass("actived");
				if($(this).hasClass("actived")){
					value = "";
				}
				if(value){
					$("input", _this.target.dom).attr(valid_name, value);
				}else{
					$("input", _this.target.dom).removeAttr(valid_name);
				}
			});
		},
		
		/**
		 * 通用input事件处理
		 */
		common_input_init: function(){
			$(this.prefix + "maxlength")[0].addEventListener("textInput", function(e){
				if(!/^\d$/.test(e.data)) e.preventDefault();
			}, false);
		}
	};

	return CEMElementSet;
});