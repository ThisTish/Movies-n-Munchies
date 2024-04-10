

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

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

