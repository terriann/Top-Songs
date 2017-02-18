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