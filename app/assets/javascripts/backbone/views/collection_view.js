CollectionView = Backbone.View.extend({
	el: '.show-results',
	className: 'cafe',

	initialize: function(){
		// this.listenTo(this.collection, 'reset', this.render);
		var sourceString = $('#cafe-template').html();
		this.template = Handlebars.compile(sourceString);
		this.render();

	},

	render: function(){
		this.collection.each(function(cafe){
			var cafeView = new CafeView({model: cafe});
		});

	},

})
