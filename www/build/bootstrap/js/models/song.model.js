	Song = Backbone.Model.extend({
		defaults: {
			song_name: null,
			images: null,
			link: null,
			artist_name: null,
			song_preview: null
		},
		initialize: function(data){
           this.set({
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
           	});
		}
	});