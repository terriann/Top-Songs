Songs = Backbone.Collection.extend({
    //This is our Songs collection and holds our Song models
    initialize: function (models, options) {

        this.view = options.view;


        //Listen for new additions to the collection and call a view function if so
        this.bind("add", function (model) {
            this.view.$el.append(model.view.render().el);
        });
    }
});