define(["jquery"], function($){
	function Preview(opt){
		if(this === window) return;
		this.init(opt);
	};

	Preview.prototype.init = function(opt){
		console.log("%c", "padding:50px 200px; line-height:100px; background:url('http://www.oneesama.cn/case1/images/aaa.gif') no-repeat; background-size:300px;");
		this.load_data(opt);
		this.init_form();
	};

	Preview.prototype.load_data = function(opt){
		var _this = this;
		// 添加loading
		$("#loading").modal("show");
		$.ajax({
			url: opt.url,
			data: opt.data || {},
			type: opt.type || "get",
			dataType: "json",
			success: function(data){
				// 取消loading
				$("#loading").modal("hide");
				$("#edit_area").html(data._html);
				$("#preview_form").removeClass("hide");
				
				var source1 = $("[data-resource='003']");
				var source2 = $("[data-resource='004']");
				var radio_c = $(".fee-form-radio");
				var radio_c_input = $("label", radio_c);
				
				// 添加按钮
				$("#cem_title").after(radio_c);

				if(source1.length > 0 && source2.length > 0){
					radio_c.removeClass("hide");
				}else if(source1.length <= 0 && source2.length > 0){
					radio_c_input.eq(0).hide();
					radio_c.removeClass("hide");
				}else if(source1.length > 0 && source2.length <= 0){
					radio_c_input.eq(1).hide();
					radio_c.removeClass("hide");
				}

				radio_c_input.click(function(){
					var span = $("span", this);
					var resource = $("[data-resource='"+$(this).data('target')+"']")
					span.toggleClass("actived");
					if(span.hasClass("actived")){
						resource.show();
					}else{
						resource.hide();
					}
					return false;
				});

				// 加载select标签中的菜单，并根据不同类型加载不同的菜单
				_load_select_data();
			}
		});
	};

	Preview.prototype.init_form = function(){
		// 绑定验证
		$("#preview_form").tooltip({
			show: false,
			hide: false
		});
		// 表单验证
		$("#preview_form").validate({
			submitHandler: function(){
				alert("验证通过");
			},
			showErrors: function(map, list) {
				var focussed = document.activeElement;
				if (focussed && $(focussed).is("input, textarea")) {
					$(this.currentForm).tooltip("close", {
						currentTarget: focussed
					}, true)
				}
				this.currentElements.removeAttr("title").removeClass("ui-state-highlight");
				$.each(list, function(index, error) {
					$(error.element).attr("title", error.message).addClass("ui-state-highlight");
				});
				if (focussed && $(focussed).is("input, textarea")) {
					$(this.currentForm).tooltip("open", {
						target: focussed
					});
				}
			}
		});

		// 保存单据

		// 删除单据
	};

	function _load_select_data(){
		var modal_ztree = $("#modal_ztree");
		$("#edit_area select").each(function(){
			var _this = $(this);
			var url = _this.data("url");
			var str = "";
			var tree_trigger = null;
			$.ajax({
				url: url,
				type: "get",
				dataType: "json",
				success: function(data){
					tree_trigger = null;
					str = "";
					if(data.type === 0){		// 单层结构
						for(var i=0; i<data.datas.length; i++){
							str += "<option value='"+data.datas[i].value+"'>"+data.datas[i].key+"</option>"
						}
						_this.append(str);
					}else{		// 树形结构
						_this.data("tree-constructor", data.datas);
						tree_trigger = $("<div style='position:absolute;width:100%;height:100%;top:0;left:0;z-index:1;'></div>");
						_this.parent().append(tree_trigger);
						tree_trigger.click(function(){
							var tid = $("option", _this).attr("value");
							modal_ztree.data("target", _this);
							modal_ztree.data("key-value", null);
							
							

							var setting = {
								data: {
									simpleData: {enable: true}
								},
								callback: {
									onClick: function(event, treeId, treeNode){
										var obj = {key: treeNode.name, value: treeNode.tId.split("_")[1]};
										console.log(obj);
										modal_ztree.data("key-value", obj);
									}
								}
							};

							var z_nodes = data.datas;
							$.fn.zTree.init($("#ztreeDetail"), setting, z_nodes);

							// 选中当前
							if(tid){
								var treeObj = $.fn.zTree.getZTreeObj("ztreeDetail");
								var node = treeObj.getNodeByTId("ztreeDetail_" + tid);
								treeObj.selectNode(node);
							}

							modal_ztree.modal("show");
						});
					}
				}
			});
		});
		$("#ztree_save").click(function(){
			var target = modal_ztree.data("target").find("option");
			var obj = modal_ztree.data("key-value");
			
			if(!obj) return;

			target.attr("value", obj.value).html(obj.key);
			modal_ztree.modal("hide");
		});
	};

	return Preview;
});