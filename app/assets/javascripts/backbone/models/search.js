// Create Global Cafe Model
SearchModel = Backbone.Model.extend({
	defaults: {
		address: ""
	}
});

// Create Global Cafe Collection
SearchCollection = Backbone.Collection.extend({

	model: SearchModel,
	url: "/searches",
	initialize: function(){
	}
})