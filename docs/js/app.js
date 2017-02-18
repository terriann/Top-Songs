var Item = Backbone.Model.extend({
    defaults: {
        part1: 'hello',
        part2: 'world'
    }
});
Song = Backbone.Model.extend({
    defaults: {
        song_name: null,
        images: null,
        link: null,
        artist_name: null,
        song_preview: null
    },
    initialize: function (data) {

        this.view = new SongView({song_model: this});

    }
});
var List = Backbone.Collection.extend({
    model: Item
});
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
AppView = Backbone.View.extend({
    el: "#song-list",
    events: {},
    initialize: function () {
        this.songs = new Songs(null, {view: this});
        this.fetchJson();

    },

    fetchJson: function () {

        var self = this;

        var api = "https://itunes.apple.com/us/rss/topsongs/limit=100/explicit=true/json?callback=?";
        $.getJSON(api, {})
            .done(function (dataset) {
                $.each(dataset.feed.entry, function (key, data) {
                    if (key > 10) {
                        //return false;
                    }
                    var model_data = {
                        id: data.id.attributes['im:id'],
                        song_name: data['im:name'].label,
                        link: data['link'][0].attributes.href,
                        song_preview: data['link'][1].attributes.href,
                        artist_name: data['im:artist'].label,
                        images: {
                            small: data['im:image'][0].label,
                            medium: data['im:image'][1].label,
                            large: data['im:image'][2].label
                        }
                    };
                    var song_model = new Song(model_data);
                    self.songs.add(song_model);
                });

                $('#song-list').masonry({
                    itemSelector: '.card'
                });


            });

    }
});
var ItemView = Backbone.View.extend({
    tagName: 'li', // name of tag to be created
    // `ItemView`s now respond to two clickable actions for each `Item`: swap and delete.

    tplID: 'item_tpl',
    events: {
        'click span.swap': 'swap',
        'click span.delete': 'remove'
    },
    // `initialize()` now binds model change/removal to the corresponding handlers below.
    initialize: function () {
        _.bindAll(this, 'render', 'unrender', 'swap', 'remove'); // every function that uses 'this' as the current object should be in here

        this.model.bind('change', this.render);
        this.model.bind('remove', this.unrender);
    },
    // `render()` now includes two extra `span`s corresponding to the actions swap and delete.
    render: function () {
        var template = twig({data: $('#' + this.tplID).html()});

        $(this.el).html(template.render(this.model.toJSON()));
        return this; // for chainable calls, like .render().el
    },
    // `unrender()`: Makes Model remove itself from the DOM.
    unrender: function () {
        $(this.el).remove();
    },
    // `swap()` will interchange an `Item`'s attributes. When the `.set()` model function is called, the event `change` will be triggered.
    swap: function () {
        var swapped = {
            part1: this.model.get('part2'),
            part2: this.model.get('part1')
        };
        this.model.set(swapped);
    },
    // `remove()`: We use the method `destroy()` to remove a model from its collection. Normally this would also delete the record from its persistent storage, but we have overridden that (see above).
    remove: function () {
        this.model.destroy();
    }
});
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
SongView = Backbone.View.extend({
    tagName: "div", //this defaults to div if you don't declare it.
    className: 'card',
    events: { //none of these work
        'hover': 'handleHover',
        'mouseover': 'handleHover',
        'click .preview': 'clickPreview'
    },
    initialize: function (data) {
        this.song_model = data.song_model;
        this.id = data.song_model.get('id');
        this.render();

    },

    render: function () {
        // This is dumb, should be able to read template
        var tpl = '<a href="' + this.song_model.get('link') + '"><img src="' + this.song_model.get('images').large + '" class="album" /></a>' +
            '<div class="song">' + this.song_model.get('song_name') + '</div>' +
            '<div class="artist">' + this.song_model.get('artist_name') + '</div>' +
            '<div class="preview"></div>' +
            '';

        this.el.innerHTML = tpl;
        return this;

    },

    handleHover: function (ev) {
        console.debug("Hovering! " + ev + this);
        console.debug(ev);


        return false;
    },

    clickPreview: function (e) {
        alert('play!');
        var myCirclePlayer = new CirclePlayer('#song-' + this.song_model.get('id') + ' .preview',
            {
                m4a: this.song_model.get('song_preview')
            }, {
                cssSelectorAncestor: "#cp_container_1"
            });

        myCirclePlayer.play();
    }
});
// **This example introduces two new Model actions (swap and delete), illustrating how such actions can be handled within a Model's View.**
//
// _Working example: [5.html](../5.html)._

//
(function ($) {
    // `Backbone.sync`: Overrides persistence storage with dummy function. This enables use of `Model.destroy()` without raising an error.
    Backbone.sync = function (method, model, success, error) {
        success();
    }
//  var listView = new ListView();
    var appview = new AppView();


})(jQuery);

// <div style="float:left; margin-bottom:40px;"><img style="width:36px; margin:5px 10px 0 5px;" src="https://g.twimg.com/Twitter_logo_blue.png"/></div> <div style="background:rgb(245,245,255); padding:10px;">Follow me on Twitter: <a target="_blank" href="http://twitter.com/r2r">@r2r</a> </div>
// <script>
//   if (window.location.href.search(/\?x/) < 0) {
//     var _gaq = _gaq || [];
//     _gaq.push(['_setAccount', 'UA-924459-7']);
//     _gaq.push(['_trackPageview']);
//     (function() {
//       var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
//       ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
//       var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
//     })();
//   }
// </script>