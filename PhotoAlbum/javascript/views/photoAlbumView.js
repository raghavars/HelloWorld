var app = app || {};

app.page = 1;
app.search_string1 = "";

(function($){
	app.PhotoAlbumView = Backbone.View.extend({
		
		el: $("#search_container"),
		resultTemplate : _.template($("#out_result").html()),
		carouselTemplate : _.template($("#carousel_template").html()),
		events : {
			"click img" : "popOver"
		},
		initialize : function(search_string) {

			$(window).scroll(function() {
				var self = this;
				if($(window).scrollTop() + $(window).height() === $(document).height()) {
								app.photo_collection.fetch({
									url : "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=a25376b8e0e5d3bdd93d03059b188320&text="+app.search_string1+"&per_page="+search_string.per_page+"&page="+(app.page = app.page <= app.pages? ++app.page : '')+"&format=json&nojsoncallback=1",
									success : function (data) {
										console.log(data);
										app.photo_collection.reset(data.toJSON());
									}
								});
							}	
			});
			$(".photodata").empty();
			this.listenTo(app.photo_collection, "reset", this.addAllImages);
			app.search_string1 = search_string.input_value;
			app.photo_collection.fetch({
				url : " https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=a25376b8e0e5d3bdd93d03059b188320&text="+search_string.input_value+"&per_page="+search_string.per_page+"&format=json&nojsoncallback=1",
					success : function (data) {
						console.log(data);
						app.photo_collection.reset(data.toJSON());
					}
				});
			},

		render : function(model) {
			var self = this;
			var photo_data = model.toJSON();
			$(".allimages").append(self.resultTemplate(model.toJSON()));	
			$(".photodata").append(self.carouselTemplate(model.toJSON()));
		},

		popOver : function(ev){
			var content = $(".carousel-inner");
			content.empty();
			var pd = $(".photodata .item").clone();
			pdcopy = pd.filter("#"+ev.target.id);
			var active = pdcopy.first();
			active.addClass("active");
			content.append(pd);
			$('#myModal').modal("show");
			$("#carousel-photo").carousel();
			$('#myModal').on('hide.bs.modal', function () {
				debugger;
				$("#carousel-photo").carousel("pause");		
				var active_class = $(".carousel-inner .item");
				active_copy = active_class.filter(".active");
			  	active_copy.removeClass("active");
			});
		},

		addAllImages : function() {
			if(app.photo_collection.length != 0) {
				app.photo_collection.each(this.render, this);
			}
			else {
			}
		}
	});
}) (jQuery);