console.log('collection view connected');

CollectionView = Backbone.View.extend({
	el: '.show-results',
	className: 'cafe',

	initialize: function(){
		console.log('new collection view initalized');
		this.listenTo(this.collection, 'reset', this.render);
		var sourceString = $('#cafe-template').html();
		this.template = Handlebars.compile(sourceString);

	},

	render: function(){
		this.collection.each(function(cafe){
			var cafeView = new CafeView({model: cafe});
		});

	},

})