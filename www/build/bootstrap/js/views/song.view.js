  
  SongView = Backbone.View.extend({
    el: $("body"),
    name2:'songview',
    initialize: function () {
    	this.name = "songview";
    },
    events: {

    },

    render: function (model) {
    	// This is dumb, should be able to read template
		$("#song-list").append('<li id="song-'+model.get('id')+'"><a href="' + model.get('link') + '"><img src="' + model.get('images').large + '" class="album" /></a>' +
			'<div class="song">' + model.get('song_name') + '</div>' +
			'<div class="artist">' + model.get('artist_name') + '</div>' +
			'<div class="preview"></div>' +
		'</li>');
/*
		var myCirclePlayer = new CirclePlayer('#song-'+model.get('id') + ' .preview',
		{
			m4a: model.get('song_preview')
		}, {
			cssSelectorAncestor: "#cp_container_1"
		});
*/
    }
  });