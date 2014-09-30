  
  AppView = Backbone.View.extend({
    el: "#song-list",
    events: {

    },
    initialize: function () {
      this.songs = new Songs( null, { view: this });
      	this.fetchJson();

    },

    fetchJson: function() {

  		var self = this;

		  var api = "https://itunes.apple.com/us/rss/topsongs/limit=100/explicit=true/json?callback=?";
		  $.getJSON( api, {
		  })
		    .done(function( dataset ) {
				$.each(dataset.feed.entry, function(key, data) {
					if(key >10) {
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
				       	}};
					var song_model = new Song(model_data);
					self.songs.add( song_model );
				});

				$('#song-list').masonry({
					itemSelector: '.card'
				});




		    });

	}
  });