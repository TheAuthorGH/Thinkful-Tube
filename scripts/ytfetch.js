const apikey = 'AIzaSyBDOgStTqnuwvgK6_GkxD_CCd00ymR2X2A';

function ytFetch(query, done) {
	$.ajax({
		url: 'https://www.googleapis.com/youtube/v3/search',
		data: {
			part: 'snippet',
			key: apikey,
			q: query
		}
	})
	.done(done)
	.fail(() => alert('Error!'));
}

function updateYtFetchResults(data) {
	
}

function handleYtFetchControls() {
	$('#tftube-search').submit(function(evt) {
		evt.preventDefault();
		ytFetch($('#tftube-search-query').val(), updateYtFetchResults);
	});
}

function initYtFetch() {
	handleYtFetchControls();
}

$(initYtFetch);