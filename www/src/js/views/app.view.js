  
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

		$.ajax({
	        type: "GET",
	        url: '/itunes-music.json',
	        data: "album=" + this.albumName,
	        dataType: "json",
	        success: function(data){
				$.each(data.feed.entry, function(key,value) {
					var song_model = new Song(value);
					self.songs.add( song_model );
					if(key>10) {
						return false;
					}
				});

				console.log('songliest', $('#song-list'));
				
				$('#song-list').masonry({
					itemSelector: 'li'
				});

	        },
	        error: function(jqXHR, textStatus, errorThrown){
	            console.error("FETCH FAILED: " + errorThrown);
	        }
	    });
	}
  });