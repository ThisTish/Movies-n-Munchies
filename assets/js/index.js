
// const searchBtnEl = $('#search-button')

function fetchMovieTitleApi(search){
	const apiKey = "05ee849ca5bf0c7ca64d3561ba1aa9b8"
	const searchMovieTitleApi = `https://api.themoviedb.org/3/search/movie?query=${search}&api_key=${apiKey}`
	
	
	fetch(searchMovieTitleApi)
	.then(response => {
		// Check if the response is successful
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}
		// Parse the JSON from the response
		return response.json();
		console.log(response)
	})
	.then(data => {
		// Work with the data
		console.log(data);
	})
	.catch(error => {
		// Handle any errors that occurred during the fetch
		console.error('Fetch error:', error);
	});

}
$('#search-form').on('submit', function(event){
	event.preventDefault();
	const searchInputEl = $('#search-input').val()
	fetchMovieTitleApi(searchInputEl)

	
}
)