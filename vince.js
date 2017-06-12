$('#submitButton').on("click", function(){
	
		var userSearch = $('#searchTerm').val();
		// console.log(userSearch);

		var key = "AIzaSyD3EEt-S9l6v2SWmsHC8mXGPcvG_Xtb6FY";
		var queryURL = "https://www.googleapis.com/youtube/v3/search?key=" + key;
		
		var parameters = $.param({
			maxResults: 6,
			part: "snippet",
			q: userSearch
		});

		$.ajax({
			method: "GET",
			url: "https://www.googleapis.com/youtube/v3/search?" + parameters + "&key=" + key,
			//this url below is the one
			//https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyD3EEt-S9l6v2SWmsHC8mXGPcvG_Xtb6FY&q=keyboart+cat
			
		}).done(function(response){

			for(var i = 0; i < response.items.length; i++){
				// console.log(response.items[i].id.videoId);
				var currentVideoId = response.items[i].id.videoId;
				console.log(currentVideoId);

				var embedURL = "https://www.youtube.com/embed/";

				var videoTitle = response.items[i].snippet.title;

				var titlHeading = $('<h3>' + videoTitle + '</h3>');

				var iframe = $('<iframe id="player" type="text/html" width="320" height="195" src="' + embedURL + currentVideoId + '" frameborder="0"></iframe>');

				$('#attachVideos').append(titlHeading);
				$('#attachVideos').append(iframe);
			}

			
		})

	});

