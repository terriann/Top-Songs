  
  AppView = Backbone.View.extend({
    el: $("body"),
    initialize: function () {
      this.songs = new Songs( null, { view: new SongView() });

      	this.fetchJson();

    },
    events: {

    },

    fetchJson: function() {

  		var self = this;

		  var api = "https://itunes.apple.com/us/rss/topsongs/limit=100/explicit=true/json?callback=?";
		  $.getJSON( api, {
		  })
		    .done(function( data ) {
				$.each(data.feed.entry, function(key,item) {
					console.log('item', item);
					var song_model = new Song(item);
					self.songs.add( song_model );
				});

				$('#song-list').masonry({
					itemSelector: 'li'
				});
		    });

	}
  });