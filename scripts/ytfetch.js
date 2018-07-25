const apikey = 'AIzaSyBDOgStTqnuwvgK6_GkxD_CCd00ymR2X2A';

function ytFetch(query, results, done) {
	$.ajax({
		url: 'https://www.googleapis.com/youtube/v3/search',
		data: {
			part: 'snippet',
			key: apikey,
			maxResults: results,
			q: query
		}
	})
	.done(done)
	.fail(() => alert('Error!'));
}

function updateYtFetchResults(data) {
	const list = $('#tftube-results > ul');
	list.empty();
	for(let i of data.items) {
		if(i.id.kind !== 'youtube#video')
			continue;
		list.append('<li></li>');
		const item = list.find('li').last();
		item.attr('ytfetch-url', `https://www.youtube.com/watch?v=${i.id.videoId}`);
		item.append(`
			<img class="tftube-video-thumbnail" src="${i.snippet.thumbnails.default.url}" alt="Video Thumbnail"/>
			<div>
				<span class="tftube-video-title">${i.snippet.title}</span>
				<p class="tftube-video-description">${i.snippet.description ? i.snippet.description : "No description available."}</p>
			</div>`);
	}
}

function handleYtFetchControls() {
	$('#tftube-search').submit(function(evt) {
		evt.preventDefault();
		const query = $('#tftube-search-query').val();
		if(query)
			ytFetch(query, 10, updateYtFetchResults);
	});
	$('#tftube-results').on('click', '.tftube-video-thumbnail', function(evt) {
		evt.preventDefault();
		window.open($(this).closest('li').attr('ytfetch-url'), '_blank');
	});
}

function initYtFetch() {
	handleYtFetchControls();
}

$(initYtFetch);