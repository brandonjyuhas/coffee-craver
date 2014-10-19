console.log("cafe view connected");

// Create Global Cafe View
CafeView = Backbone.View.extend({
	className: 'cafe',
	el: '.show-results',

	initialize: function(){
		var sourceString = $('#cafe-template').html();
		this.template = Handlebars.compile(sourceString);
		this.render();
	},

	render: function(){
		this.$el.append(this.template(this.model.toJSON()));
	}
})