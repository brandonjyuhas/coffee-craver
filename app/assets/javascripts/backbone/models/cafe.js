console.log('cafe model connected');

// Create Global Cafe Model
CafeModel = Backbone.Model.extend({
	defaults: {
		name: "",
		address: "",
		image_url: ""
	}
});

// Create Global Cafe Collection
CafeCollection = Backbone.Collection.extend({

	model: CafeModel,
	url: "/cafes",
	initialize: function(){
		console.log("cafe collection connected");
	}
})