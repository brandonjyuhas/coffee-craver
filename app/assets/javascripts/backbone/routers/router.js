Router = Backbone.Router.extend({
	routes: {
		'': 'index',
		'searches/:id/cafes': 'listCafes'
	},

	initialize: function() {
		searchCollection = new SearchCollection();

		searchFormView = new FormView({collection: searchCollection});
	},

	index: function() {
		$('#search-form').show();
	},

	clearCafe: function(){
		// removes current cafe view
		$('.show-results').html('');
	},

	listCafes: function(){
		this.clearCafe();

		cafes = new CafeCollection();
		// Get URL to get search_id using purl
		var url = $.url();
		var id = url.fsegment(2);
		cafes.fetch({reset: true,
			success: function(){
				search_cafes = cafes.byID(parseInt(id));
				cafeCollectionView = new CollectionView({collection: search_cafes});
			}
		});
	}
});

