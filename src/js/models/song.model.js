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