// Because the new features (swap and delete) are intrinsic to each `Item`, there is no need to modify `ListView`.
var ListView = Backbone.View.extend({
    el: $('body'), // el attaches to existing element
    tplID: 'list_tpl',
    events: {
        'click button#add': 'addItem'
    },
    initialize: function () {
        _.bindAll(this, 'render', 'addItem', 'appendItem'); // every function that uses 'this' as the current object should be in here

        this.collection = new List();
        this.collection.bind('add', this.appendItem); // collection event binder

        this.counter = 0;
        this.render();
    },
    render: function () {
        var self = this;
        var template = twig({data: $('#' + this.tplID).html()});

        $(this.el).append(template.render());
        _(this.collection.models).each(function (item) { // in case collection is not empty
            self.appendItem(item);
        }, this);
    },
    addItem: function () {
        this.counter++;
        var item = new Item();
        item.set({
            part2: item.get('part2') + this.counter // modify item defaults
        });
        this.collection.add(item);
    },
    appendItem: function (item) {
        var itemView = new ItemView({
            model: item
        });
        $('ul', this.el).append(itemView.render().el);
    }
});