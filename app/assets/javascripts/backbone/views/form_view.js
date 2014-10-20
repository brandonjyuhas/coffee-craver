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
		var target = "";
		console.log(target);
		var target = this.collection;
			this.collection.create({address: this.$("[name='address']").val()}, {success: function(){
					$('input').val('');
					id = target["models"][(target["models"].length -1)]["attributes"]["id"];
					router.navigate('/searches/' + parseInt(id) + '/cafes');
					router.listCafes();
				}
		});
	},

  // Determine if user pressed enter key, and then fire off newSearch
  processKey: function(e) {
  	if(e.which === 13){
  		this.$('span.new-search').click();
	  }
	}
})