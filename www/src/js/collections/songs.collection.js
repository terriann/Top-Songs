
	Songs = Backbone.Collection.extend({
		//This is our Songs collection and holds our Song models
		initialize: function (models, options) {
			//Listen for new additions to the collection and call a view function if so
			this.bind("add", options.view.render);
		}
	});