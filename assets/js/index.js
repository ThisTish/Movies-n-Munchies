// const searchBtnEl = $('#search-button')
// * for search modal

// // Get the modal
// var modal = document.getElementById("myModal");

// // Get the button that opens the modal
// var btn = document.getElementById("myBtn");

// // Get the <span> element that closes the modal
// var span = document.getElementsByClassName("close")[0];

// // When the user clicks on the button, open the modal
// btn.onclick = function() {
// 	modal.style.display = "block";
// }

// // When the user clicks on <span> (x), close the modal
// span.onclick = function() {
// 	modal.style.display = "none";
// }

// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
// 	if (event.target == modal) {
// 		modal.style.display = "none";
// 	}
// }

// // todo tie to searchmodal
// $('#search-form').on('submit', function(event){
// 	event.preventDefault()
// 	const searchInputEl = $('#search-input').val()
// 	fetchMovieTitleApi(searchInputEl)
// })

// *function for movie title search
// todo need the searchInput to work
function fetchMovieTitleApi(search){
	const apiKey = "05ee849ca5bf0c7ca64d3561ba1aa9b8"
	const searchMovieTitleApi = `https://api.themoviedb.org/3/search/movie?query=${search}&api_key=${apiKey}`
	
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


// *function to fetch random movies
function fetchRandomMovies(){
	const apiKey = "05ee849ca5bf0c7ca64d3561ba1aa9b8"
	const randomPage = Math.floor(Math.random() * 500) + 1
	const randomMovieApi = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=true&language=en-US&region=United%20States&api_key=${apiKey}&page=${randomPage}`

	fetch(randomMovieApi)
	.then(response => {
		if (!response.ok) {
			throw response.json()
		}
		return response.json()
		console.log(andomesponse)
	})
	.then(page => {
		console.log(page)
		displayMovieResults(page)
	})
	.catch(error => {
		console.error('Fetch error:', error)
	});

}

const movieResultsArea= $('#movieResults')

// *function for random movie button
$('#randomMoviesBtn').on('click', function(event){
	event.preventDefault()
	movieResultsArea.empty()
	fetchRandomMovies()
})

// *function for populating movie results area
// todo add poster to button, title on top or below poster?
// todo create area when (random)btn is clicked instead of having it already displaying
function displayMovieResults(page){
	
	for(let i = 0; i<9; i++){
		const movieDetails = page.results[i]
		const movieCard = $('<div>')
		movieCard.addClass('card')
		// console.log(movieDetails)

		const backDropBtn = $('<button>')
		backDropBtn.addClass('rounded-lg')
		backDropBtn.attr({
			'data-movie-id': movieDetails.id,
			'id':'selectedMovieBtn',
			'type':'button'
		})

		const backDrop = movieDetails.backdrop_path
		const backdropUrl = `https://image.tmdb.org/t/p/w92/${backDrop}`
		const backdrop = $('<img>')
		// backdrop.addClass('w-10 h-auto')
		backdrop.attr('src', backdropUrl)


		const titleBtn = $('<button>')
		titleBtn.addClass('rounded-full')
		titleBtn.attr({
			'data-movie-id': movieDetails.id,
			'id': 'selectMovieBtn',
			'type': 'button'})
		titleBtn.text(movieDetails.title)
		// console.log(movieDetails.id)

		backDropBtn.append(backdrop)
		movieCard.append(backDropBtn,titleBtn)
		movieResultsArea.append(movieCard)
	}
}

// *function to fetch by id to get selectedMovieModal details by title button
$(document).on('click','#selectMovieBtn', function() {
	const movieId = $(this).attr('data-movie-id')
	console.log(movieId)

	function clearModal() {
		$('.movieModalDynamic').empty()
	}
	clearModal()

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
			displaySelectedMovie(movie)
		})
		.catch(error => {
			console.error('Fetch error:', error)
		});
	}
	fetchMovieId()
})
// * function to fetch by id to get selected movie modal details by backdrop button
$(document).on('click','#selectedMovieBtn', function() {
	const movieId = $(this).attr('data-movie-id')
	console.log(movieId)

	function clearModal() {
		$('.movieModalDynamic').empty()
	}
	clearModal()

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
			displaySelectedMovie(movie)
		})
		.catch(error => {
			console.error('Fetch error:', error)
		});
	}
	fetchMovieId()
})


// *function to display movie details in selectedMovieModal
// todo clear appropriate info before repopulating.
// todo figure out poster/backdrop
function displaySelectedMovie(movie){
	const movieModal = $('#movieModal')
	const dynamicElements = $('<div>')
	dynamicElements.addClass('movieModalDynamic p-3')

	const movieModalHeader = $('<header>')

	const movieTitle = $('<h2>')
	movieTitle.addClass('text-pink')
	movieTitle.text(movie.title) 

	const close = $('<span>')//might add back to html
	close.addClass('close absolute text-white top-0 right-0 p-4 cursor-pointer')
	close.html('&times;')

	const moviePoster = movie.poster_path
	const posterUrl = `https://image.tmdb.org/t/p/w92/${moviePoster}`
	const poster = $('<img>')
	poster.addClass('w-10 h-auto')
	poster.attr('src', posterUrl)

	console.log(posterUrl)//poster--how to get to show? maybe backdrop_path?
	// console.log(backdropUrl)//poster--how to get to show? maybe backdrop_path?
	
	const movieModalDetails = $('<div>')

	if(movie.tagline){
		const tagline = $('<p>')
		tagline.addClass('text-green')
		tagline.text(movie.tagline)
		movieModalDetails.append(tagline)
	}

	
	const date = movie.release_date
	const justYear = date.split('-')[0]
	const year = $('<p>')
	year.addClass('text-purple')
	year.text(`${justYear}`)

	const overview = $('<p>')
	overview.addClass('tracking-tight')
	overview.text(movie.overview)

	const rating = $('<p>')
	rating.addClass('text-orange')
	rating.text(movie.vote_average)//could find star rating image that goes with this, but that's a whole other function for a whole other day.

	const genre = $('<p>')
	genre.addClass('font-bold')
	genre.text(movie.genres[0].name)//could add more IF they have more...later

	const runtime = $('<p>')
	runtime.addClass('text-sm')
	runtime.text(`${movie.runtime} min`)

	const homepage = $('<a>')
	homepage.addClass('text-center')
	homepage.attr('href', movie.homepage)
	homepage.text('Hompage')//could make the image the anchor...maybe
	
	movieModalDetails.append(poster, year, overview, rating, genre, runtime, homepage)
	movieModalHeader.append(movieTitle, close)
	dynamicElements.append(movieModalHeader, movieModalDetails)
	movieModal.prepend(dynamicElements)
	
	selectedMovieModal.show()
	
}

//* Selected Movie Modal Button Functions
// todo make these one liners
const selectedMovieModal = $('#movieModal')//can go up top and get rid of one in displaySelectedMovie function
const goBackBtn = $('#go-back')
const closeBtn = $('.close')
const saveForLaterBtn = $('#save-for-later')
const getRandomRecipeBtn =$('#getRandomRecipe')
goBackBtn.on('click', () =>{
	selectedMovieModal.hide()
})

$(document).on('click', closeBtn, function() {
	selectedMovieModal.hide()
})

saveForLaterBtn.on('click', () =>{
	// setLocalStorage() not done
	selectedMovieModal.hide()
})

getRandomRecipeBtn.on('click', fetchRandomRecipe())

// * function for closing modal when you click off modal
$(document).click(function(event){
	if(!selectedMovieModal.is(event.target) && selectedMovieModal.has(event.target).length === 0){
		selectedMovieModal.hide()
	}
})



// todo getLocalStorage()



// todo setLocalStorage()



// todo displaySavedCards()



// todo openSearchModal()



// todo searchMovie()



// todo searchRecipe()


// *function to fetch random recipe
function fetchRandomRecipe() {
	const randomRecipeUrl = `https://www.themealdb.com/api/json/v1/1/random.php?`
	
	fetch(randomRecipeUrl)
	.then(response => {
		if (!response.ok){
			throw response.json()
		}
		console.log(response);
		return response.json()
		
	})
	.then(randomRecipe => console.log(randomRecipe))
	.catch(error => {
		console.error('Error fetching recipe:', error)
	}) 
}

const randomRecipeBtn = $('#randomRecipeBtn')

$('#randomRecipeBtn').on('click', function(event){
	event.preventDefault();
	fetchRandomRecipe();
	displayRandomRecipe();
})

// // todo filter by main ingredient
function fetchRecipeByMainIngredient() {
	let mainIngredient = document.getElementById("#mainIngredient").value.trim()
	const mainIngredientUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${mainIngredient}`
	
	fetch(mainIngredientUrl)
	.then(response => {
		console.log(response);
			return response.json()
		})
		.then(list => console.log(list))
		.catch(error => {
            console.error('Error fetching list:', error)
		})}

$('#mainIngredientBTN').on('click', function(event){
	event.preventDefault();
	fetchRecipeByMainIngredient();
	displayList();
})



// todo RANDOM displayRecipeResults()
// do we want to make the random recipe populate the recipe modal?
function displayRandomRecipe (meals){

	const recipeResultArea = $('#recipeResults')
	const resultsCard = $('<div>')
	resultsCard.appendTo(recipeResultArea)
	
	const mealName = $('<h4>')
	mealName.appendTo(resultsCard)
	mealName.text(meals[0].strMeal)

	const category = $('<p>')
	category.appendTo(resultsCard)
	category.text(meals[0].strCategory)

	const instructions = $('<p>')
	instructions.appendTo(resultsCard)
	instructions.text(meals[0].strInstructions)

	// need for loop to get all ingredients and measurements

	const ingredients = $('<p>')
	ingredients.appendTo(resultsCard)
	instructions.text(meals[0].strIngredient)

	const measurements = $('<p>')
	measurements.appendTo(resultsCard)
	measurements.text(meals[0].strMeasure)

	const source = $('<a>')
	source.appendTo(resultsCard)
	source.text(meals[0].strSource)

	const youTube = $('<a>')
	youTube.appendTo(resultsCard)
	youTube.text(meals[0].strYoutube)

}



// todo list for recipe by main ingridient
function displayList () {

	const recipeResultArea = $('#recipeResults');
	if (list.meals){
	list.meals.forEach ( meal => {
		
	});
}

}

// todo makeLater()



// todo displaySelectedRecipe()




// todo nowPickMovies()





// todo nowPickMunchies()
// todo fetchRecipesFromMovie()**
// todo click function for findRecipeBtn
// todo function to pull genre
// todo if statements to pair genres with types of food
const genre = movie.genre[0]
if (genre.name === 'Action' || genre.id === 28) {
}

if (genre.name === 'Adventure' || genre.id === 12) {
}

if (genre.name === 'Animation' || genre.id === 16) {
}

if (genre.name === 'Comedy' || genre.id === 35) {
}

if (genre.name === 'Crime' || genre.id === 80) {
}

if (genre.name === 'Documentary' || genre.id === 99) {
}

if (genre.name === 'Drama' || genre.id === 18) {
}

if (genre.name === 'Family' || genre.id === 10751) {
}

if (genre.name === 'Fantasy' || genre.id === 14) {
}

if (genre.name === 'History' || genre.id === 36) {
}

if (genre.name === 'Horror' || genre.id === 27) {
}

if (genre.name === 'Music' || genre.id === 10402) {
}

if (genre.name === 'Mystery' || genre.id === 9648) {
}

if (genre.name === 'Romance' || genre.id === 10749) {
}

if (genre.name === 'Science Fiction' || genre.id === 878) {
}

if (genre.name === 'TV Movie' || genre.id === 10770) {
}

if (genre.name === 'Thriller' || genre.id === 53) {
}

if (genre.name === 'War' || genre.id === 10752) {
}

if (genre.name === 'Western' || genre.id === 37) {
}

// todo fetchRecipesByType
const keyword = 
const searchRecipeAPI = `www.themealdb.com/api/json/v1/1/search.php?s=${keyword}`



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