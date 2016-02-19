var app = app || {};

(function($) {
	app.SearchBoxView = Backbone.View.extend({
		
		el: $("#search_container"),
		events: {
		 	"click .search_button" : "displayOut"  
		},

		displayOut : function() {
			$(".allimages").html('');
			app.data_id = 0;
			new app.PhotoAlbumView({input_value : $(".search_input").val(), per_page : $(".per_page").val()});
		}
	});
}) (jQuery);