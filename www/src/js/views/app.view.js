
  AppView = Backbone.View.extend({
    el: $("body"),
    initialize: function () {
      this.songs = new Songs( null, { view: new SongView() });

        item = {
/*
                id: data.id.attributes['im:id'],
                song_name: data['im:name'].label,
                link: data['link'][0].attributes.href,
                song_preview: data['link'][1].attributes.href,
                artist_name: data['im:artist'].label,
                images: {
                    small: data['im:image'][0].label,
                    medium: data['im:image'][1].label,
                    large: data['im:image'][2].label

                    I'll either have to follow this pattern or create a whole new one..... Think about it TAS 2014-10-17
*/
        };
        this.songs.add( new Song(item) );

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
