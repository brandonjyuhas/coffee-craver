FormView = Backbone.View.extend({
	el: '#search-form',

	initialize: function(){
		var sourceString = $('#search-form-template').html();
		this.template = Handlebars.compile(sourceString);
		this.render();
	},

	render: function(){
		this.$el.html(this.template());
	},

	// Event Listeners
	events: {
		'click span.new-search': 'newSearch',
		'keypress input': 'processKey'
	},

	newSearch: function(){
		var target = this.collection;
		this.collection.create({address: this.$("[name='address']").val()}, {success: function(){
				$('input').val('');
				var id = target["models"][0]["id"];
				router.navigate('/searches/' + id + '/cafes');
				router.listCafes();
			},
		});
	},

  // Determine if user pressed enter key, and then fire off newSearch
  processKey: function(e) {
  	if(e.which === 13){
  		this.$('span.new-search').click();
	  }
	}
})