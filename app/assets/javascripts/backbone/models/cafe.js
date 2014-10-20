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
	},

	byID: function(id) {
    filtered = this.filter(function(cafe) {
      return cafe.get("search_id") === id;
      });
    return new CafeCollection(filtered);
  }
})
