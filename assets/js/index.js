const searchBtnEl = $('#search-button')

// *function for movie title search
function fetchMovieTitleApi(search){
	const apiKey = "05ee849ca5bf0c7ca64d3561ba1aa9b8"
	const searchMovieTitleApi = `https://api.themoviedb.org/3/search/movie?query=${search}&api_key=${apiKey}`
	
	// todo cleanup
	fetch(searchMovieTitleApi)
	.then(response => {
		if (!response.ok) {
			throw new Error('Network response was not ok')
		}
		return response.json()
		console.log(response)
	})
	.then(data => {
		console.log(data)
	})
	.catch(error => {
		console.error('Fetch error:', error)
	})

}

$('#search-form').on('submit', function(event){
	event.preventDefault()
	const searchInputEl = $('#search-input').val()
	fetchMovieTitleApi(searchInputEl)
})

// *function for random movie
function fetchRandomMovie(random){
	const apiKey = "05ee849ca5bf0c7ca64d3561ba1aa9b8"
	const randomPage = Math.floor(Math.random() * 500) + 1//might need to change number-only goes to 500 
	const randomMovieApi = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=true&language=en-US&region=United%20States&api_key=${apiKey}&page=${randomPage}`

	fetch(randomMovieApi)
	.then(response => {
		if (!response.ok) {
			throw response.json()
		}
		return response.json()
		console.log(response)
	})
	.then(page => {
		console.log(page)
		displayMovieResults(page)
	})
	.catch(error => {
		console.error('Fetch error:', error)
	});

}

// function for random button fetch
$('#random-button').on('click', function(event){
	event.preventDefault()
	fetchRandomMovie()
})




//* for search modal

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


// function for populating movie results area
// todo add poster to button, title on top or below poster?
// todo create area when (random)btn is clicked
function displayMovieResults(page){
	const movieResultsArea= $('#movieResults')
	
	for(let i = 0; i<9; i++){
		const movieDetails = page.results[i]
		const movieCard = $('<div>')
		// console.log(movieDetails)

		const titleBtn = $('<button>')
		titleBtn.addClass('rounded-full')
		titleBtn.attr({
			'data-movie-id': movieDetails.id,
			'id': 'selectMovieBtn',
			'type': 'button'})
		titleBtn.text(movieDetails.original_title)
		console.log(movieDetails.id)


		movieCard.append(titleBtn)
		movieResultsArea.append(movieCard)
	}
}

$(document).on('click','#selectMovieBtn', function() {
	const movieId = $(this).attr('data-movie-id')
	console.log(movieId)
	function fetchMovieId(){
		const apiKey = "05ee849ca5bf0c7ca64d3561ba1aa9b8"
		const movieIdApi = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US&api_key=${apiKey}`
	
		fetch(movieIdApi)
		.then(response => {
			if (!response.ok) {
				throw response.json()
			}
			return response.json()
			console.log(response)
		})
		.then(movie => {
			console.log(movie)
			// displayMovieResults(page)
		})
		.catch(error => {
			console.error('Fetch error:', error)
		});
	
	}
	fetchMovieId()
	selectedMovieModal.show()
}
)


//* Selected Movie Modal Functions
// todo selected movie modal. still need to populate
// displaySelectedMovie()
console.log()


const selectedMovieModal = $('#movieModal')
const goBackBtn = $('#go-back')
const closeBtn = $('.close')
const saveForLaterBtn = $('#save-for-later')
// todo make these one liners
goBackBtn.on('click', () =>{
	selectedMovieModal.hide()
})

closeBtn.on('click', () =>{
	selectedMovieModal.hide()
})

saveForLaterBtn.on('click', () =>{
	// setLocalStorage() not done
	selectedMovieModal.hide()
	
})



// todo getLocalStorage()



// todo setLocalStorage()



// todo displaySavedCards()



// todo openSearchModal()



// todo searchMovie()



// todo searchRecipe()



// todo fetchRecipeApi()



// todo displayRecipeResults()



// todo makeLater()



// todo displaySelectedRecipe()



// todo nowPickMunchies()



// todo nowPickMovies()



// todo fetchRecipesFromMovie()



// todo fetchMoviesFromRecipes()



// todo displayMovieFilmCombination




// OPTIONAL FOR NOW
// todo displayPickedMovie()

// OPTIONAL
// todo displayPickedMovie()

// OPTIONAL
// todo startOver()

// OPTIONAL
// todo deleteSavedBtn()

// OPTIONAL
// todo doneBtns()

// OPTIONAL
// todo slidingResults()

// more functions for searching random....


// more functions to search by sliders/checkboxes