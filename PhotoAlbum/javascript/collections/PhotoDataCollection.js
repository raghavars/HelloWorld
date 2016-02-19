var app = app || {};

app.pages = 1;
app.data_id = 0;
(function() {
	var PhotoDataCollection = Backbone.Collection.extend({

		model : app.PhotoModel,
		parse : function(response) {
			self = this;
			var photos = response.photos.photo;
			app.pages = response.photos.pages;
			var i = 0;
			_.each(photos, function(photo){
				photo.url = "http://farm"+photo.farm+".staticflickr.com/"+photo.server+"/"+photo.id+"_"+photo.secret+".jpg|gif|png";
				photo.data_id = app.data_id++;
			});
			return photos;
		},
	});
	app.photo_collection = new PhotoDataCollection(); 
}) ();
		