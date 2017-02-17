require.config({
	paths: {
		jquery: "jquery-2.1.4.min",
		bootstrap: "bootstrap.min",
		jq_validate: "jquery.validate.min",
		jq_validata_msg: "messages_zh",
		jq_ui: "jquery-ui.custom.min",
		jq_ztree: "jquery.ztree.all-3.5.min"
	},
	shim: {
		bootstrap: ["jquery"],
		jq_validate: ["jquery"],
		jq_validata_msg: ["jquery", "jq_validate"],
		jq_ui: ["jquery"],
		jq_ztree: ["jquery"]
	}
});

require(["preview", "bootstrap", "jq_validate", "jq_validata_msg", "jq_ui", "jq_ztree"], function(Preview){
	new Preview({
		url: "preview.json"
	});
});