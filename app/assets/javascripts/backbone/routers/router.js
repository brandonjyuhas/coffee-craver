console.log('router.js connected');

Router = Backbone.Router.extend({
	routes: {
		'cafe' : 'listCafes'
	},

	clearCafe: function(){
		// removes current cafe view
		$('.show-results').html('');
	},

	listCafes: function(){
		console.log('listCafes firing');
		this.clearCafe();

		cafes = new CafeCollection();
		cafes.fetch({reset: true});
		console.log(cafes);

		cafeCollectionView = new CollectionView({collection: cafes});
	}
});

