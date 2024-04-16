const modalSubmitSearchBtn = $('#submitSearch')
const movieResultsArea= $('#movieResults')


//* for search modal
var modal = document.getElementById("searchModal");
var modalSearchBtn = document.getElementById("searchBtn");
var searchCloseBtn = document.getElementsByClassName("searchCloseBtn")[0];
modalSearchBtn.onclick = function() {
	modal.style.display = "block";
}
searchCloseBtn.onclick = function() {
	modal.style.display = "none";
}
window.onclick = function(event) {
	if (event.target == modal) {
		modal.style.display = "none";
	}
}

// todo tie to searchmodalform
$('#searchForm').on('submit', function(event){
	event.preventDefault()
	const searchInputEl = $('#searchInput').val()
	fetchMovieTitleApi(searchInputEl)
})

// *function for MOVIE TITLE search button CLICK
// todo need the searchInput to work
$('#harryPotter').on('click', () =>{
	console.log("you're a wizard harry")
	fetchMovieTitleApi()
})

// *function for MOVIE TITLE FETCH
function fetchMovieTitleApi(search){
	const apiKey = "05ee849ca5bf0c7ca64d3561ba1aa9b8"
	const searchMovieTitleApi = `https://api.themoviedb.org/3/search/movie?query=harry%20potter&api_key=${apiKey}`
	
	fetch(searchMovieTitleApi)
	.then(response => {
		if (!response.ok) {
			throw new Error('Network response was not ok')
		}
		return response.json()
		console.log(response)
	})
	.then(harry => {
		console.log(harry)
		displayMovieResults(harry)
	})
	.catch(error => {
		console.error('Fetch error:', error)
	})
	
}

// *function for RANDOM MOVIE button click
$('#randomMoviesBtn').on('click', function(event){
	event.preventDefault()
	movieResultsArea.empty()
	fetchRandomMovies()
})

// *function for FETCH random MOVIES
// todo change all to "movies" or "lists"
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

// * function for a random movie
function fetchARandomMovie(){
	const apiKey = "05ee849ca5bf0c7ca64d3561ba1aa9b8"
	const randomPage = Math.floor(Math.random() * 500) + 1
	const randomMovieApi = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=true&language=en-US&region=United%20States&api_key=${apiKey}&page=${randomPage}`

	return fetch(randomMovieApi)
	.then(response => {
		if (!response.ok) {
			throw response.json()
		}
		return response.json()
		})
	.then(page => {
		console.log(page)
		return page
	})
	.catch(error => {
		console.error('Fetch error:', error)
	});

}
// *function to get random movie from array
function randomMovie(movies){
	const randomIndex = Math.floor(Math.random()*20 + 1)
	const atRandomMovie = movies.results[randomIndex]
	console.log(atRandomMovie)
	return atRandomMovie 

}

$('#randomMovieBtn').on('click', function(event){
	event.preventDefault()
	singleMovieArea.empty()
	fetchARandomMovie()
		.then(movies => {
			const randomMovieDetails = randomMovie(movies)
		displaySingleMovie(randomMovieDetails)

		})
		.catch(error =>{
			console.error('fetch error', error)
		})
})

// *function to display single random movie
const singleMovieArea = $('#singleMovie')
function displaySingleMovie(movieDetails){
	$('#movie').show()
	console.log(movieDetails)
	const movieCard = $('<div>')
		movieCard.addClass('card')

	const backDropBtn = $('<button>')
	backDropBtn.addClass('rounded-lg relative overflow-hidden')
	backDropBtn.attr({
		'data-movie-id': movieDetails.id,
		'id':'selectedMovieBtn',
		'type':'button'
	})

	const backdrop = $('<img>')
	.attr('src', `https://image.tmdb.org/t/p/w154/${movieDetails.backdrop_path}`)
	.addClass('w-full h-auto')

	const titleOverlay = $('<div>')
	.addClass('absolute bottom-0 left-0 right-0 text-white px-4 py-2 hover:bg-black hover:bg-opacity-50')
	.text(movieDetails.title)
		

	backDropBtn.append(backdrop, titleOverlay)
	movieCard.append(backDropBtn)
	singleMovieArea.append(movieCard)


}
// * function to FETCH by ID for selectedMOVIE MODAL with movie click
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

// *function for POPULATE MOVIE RESULTS area
function displayMovieResults(page){
	$('#movies').show()
	for(let i = 0; i<10; i++){
		const movieDetails = page.results[i]
		const movieCard = $('<div>')
		movieCard.addClass('card')
		// console.log(movieDetails)

		const backDropBtn = $('<button>')
		backDropBtn.addClass('rounded-lg relative overflow-hidden')
		backDropBtn.attr({
			'data-movie-id': movieDetails.id,
			'id':'selectedMovieBtn',
			'type':'button'
		})

		const backdrop = $('<img>')
		.attr('src', `https://image.tmdb.org/t/p/w154/${movieDetails.backdrop_path}`)
		.addClass('w-full h-auto')

		const titleOverlay = $('<div>')
		.addClass('absolute bottom-0 left-0 right-0 text-white px-4 py-2 hover:bg-black hover:bg-opacity-50')
		.text(movieDetails.title)
		

		backDropBtn.append(backdrop, titleOverlay)
		movieCard.append(backDropBtn)
		movieResultsArea.append(movieCard)
	}
}


// *function to POPULATE MOVIE details in selectedMOVIE MODAL
function displaySelectedMovie(movie){
	const movieModal = $('#movieModal')
	const dynamicElements = $('<div>')
	dynamicElements.addClass('movieModalDynamic p-3 text-white')

	const movieModalHeader = $('<header>')

	const movieTitle = $('<h2>')
	movieTitle.addClass('text-pink')
	movieTitle.text(movie.title) 
	movieTitle.attr('id', 'movieModalTitle')

	const close = $('<span>')//might add back to html
	close.addClass('close absolute text-white top-0 right-0 p-4 cursor-pointer')
	close.html('&times;')

	const moviePoster = movie.poster_path
	const posterUrl = `https://image.tmdb.org/t/p/w92/${moviePoster}`
	const poster = $('<img>')
	poster.addClass('w-50 h-auto')
	poster.attr({
		'src': posterUrl,
		'id' :'moviePoster'
	})
	
	const movieModalDetails = $('<div>')
	movieModalDetails.attr({
		'id':'movieDeets',
		'data-movie-id': movie.id

	})


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
	homepage.text('Homepage')//could make the image the anchor...maybe
	
	movieModalDetails.append(poster, year, overview, rating, genre, runtime, homepage)
	movieModalHeader.append(movieTitle, close)
	dynamicElements.append(movieModalHeader, movieModalDetails)
	movieModal.prepend(dynamicElements)
	
	selectedMovieModal.show()
	
}


//* Selected MOVIE MODAL BUTTONS Functions
// todo make these one liners
const selectedMovieModal = $('#movieModal')
const goBackBtn = $('#go-back')
const closeBtn = $('.close')
const saveForLaterBtnM = $('#saveForLaterM')
const getRandomRecipeBtn =$('#getRandomRecipe')
// !go back button not working
goBackBtn.on('click',function(event){
	event.preventDefault()
	selectedMovieModal.hide()
})
$(document).on('click', '.close', function() {
	selectedMovieModal.hide()
})
saveForLaterBtnM.on('click', function(event){
	event.preventDefault()
	setMovieLocalStorage()
	selectedMovieModal.hide()
	displaySavedMovies()
})
getRandomRecipeBtn.on('click', function(event){ 
	event.preventDefault()
	selectedMovieModal.hide()
	fetchRandomRecipe()
})
// * function for closing modal when you click off modal/don't want right now.
// $(document).click(function(event){
// 	if(!selectedMovieModal.is(event.target) && selectedMovieModal.has(event.target).length === 0){
// 		selectedMovieModal.hide()}})




// *function to get MOVIE LOCALSTORAGE
function getMovieLocalStorage(){
	// console.log(`localStorage${localStorage.movies}`)
	let movies = (JSON.parse(localStorage.getItem('movies')))
	if(!movies){
		movies=[]
	}
	return movies
}
// *function to set MOVIE LOCALSTORAGE
function setMovieLocalStorage(){
	let movies = getMovieLocalStorage()
	
	const savedMovieObject = {
		title: ($('#movieModalTitle').text()),
		poster: ($('#moviePoster').attr('src')),
		id: ($('#movieDeets').attr('data-movie-id'))
	}
	
	movies.push(savedMovieObject)
	
	localStorage.setItem('movies', JSON.stringify(movies))
	console.log(savedMovieObject)
	console.log(localStorage.movies)
	
}
// *function POPULATE SAVED MOVIES
function displaySavedMovies(){
	const movies = 	getMovieLocalStorage()
	const savedMoviesArea = $('#savedMoviesArea')

	savedMoviesArea.empty()

	if(Array.isArray(movies)){
		for(let movie of movies){
		
		const movieCard = $('<card>')
		movieCard.addClass('card')
		movieCard.attr({
			'id': 'movieCard',
			'data-movie-id': movie.id
		})

		const savedMovieTitle = $('<h2>')
		savedMovieTitle.addClass('font-bold')
		savedMovieTitle.text(movie.title)

		const savedMoviePoster = $('<img>')
		savedMoviePoster.addClass('border-light')
		savedMoviePoster.attr('src', movie.poster)


	movieCard.append(savedMoviePoster, savedMovieTitle)
	savedMoviesArea.append(movieCard)	
	}
}
}




// todo getMatchLocalStorage()


// todo setMatchLocalStorage()




// todo displaySavedMatches()


// todo searchRecipe()
// *fetch recipe api's not in use yet.
// const fetchRecipeByTypeApi = `www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
// const fetchRecipeByIdApi = `www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`

// *function for RANDOM RECIPE button click
const randomRecipeBtn = $('#randomRecipeBtn')
$('#randomRecipeBtn').on('click', function(event){
	event.preventDefault();
	fetchRandomRecipe();
})

// *function to FETCH RANDOM RECIPE
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
	.then(randomRecipe => {
		console.log(randomRecipe)
		displayRandomRecipe(randomRecipe)
	})
		
	.catch(error => {
		console.error('Error fetching recipe:', error)
	}) 
}

// * function to POPULATE RANDOM RECIPE
function displayRandomRecipe (randomRecipe){

	$('#recipe').show()

	const recipeArray = randomRecipe.meals[0]

	const recipeResultArea = $('#recipeResults')
	const resultsCard = $('<div>')
	resultsCard.appendTo(recipeResultArea)
	
	const mealName = $('<h4>')
	mealName.appendTo(resultsCard)
	mealName.text(`Meal: ${recipeArray.strMeal}`)
	mealName.addClass('underline decoration-1')
	mealName.attr('id', 'mealNameResult')

	const category = $('<p>')
	category.appendTo(resultsCard)
	category.text(`Category: ${recipeArray.strCategory}`)
	
	// need for loop to get all ingredients and measurements
	
	const ingredientsList = $('<ul>')
	ingredientsList.text(`Ingredients & Measurements:`)
	for (let  i=1; i<=20; i++){
		const ingredient = recipeArray['strIngredient' + i];
		const measurement = recipeArray['strMeasure' + i];
		if (ingredient) {
            const listItem = $('<li>').text(`${measurement} ${ingredient}`);

            listItem.appendTo(ingredientsList);
        } else {
            // If there are no more ingredients, break the loop
            break;
        }
    }
	ingredientsList.appendTo(resultsCard);

	// const measurements = $('<p>')
	// measurements.appendTo(resultsCard)
	// measurements.text(recipeArray.strMeasure)

	const instructions = $('<p>')
	instructions.appendTo(resultsCard)
	instructions.text(`Instructions: ${recipeArray.strInstructions}`)

	// padding margin tailwind 

	const source = $('<a>');
	source.appendTo(resultsCard);
	// Check if recipeArray.strSource exists and is not an empty string
	if (recipeArray.strSource && recipeArray.strSource.trim() !== ""){
		source.text(`Source: ${recipeArray.strSource}`)
	source.attr('href', recipeArray.strSource);
	source.attr('target', '_blank')
	source.attr('id', 'sourceResultLink')
	source.addClass('text-green-200')
	} else {
		// Handle the case where the source link is not provided
		source.text('Source not available')
		source.addClass('text-red-600')
	}
	
	resultsCard.append('<br>');

	const youTube = $('<a>');
	youTube.appendTo(resultsCard);
	if (recipeArray.strYoutube && recipeArray.strYoutube.trim() !== "") {
		youTube.text(`YouTube Video: ${recipeArray.strYoutube}`)
		youTube.attr('href', recipeArray.strYoutube);
		youTube.attr('target', '_blank')
		youTube.addClass('text-red-700')
	}else {
		// Handle the case where the youtube link is not provided
		youTube.text('YouTube link not available');
		youTube.addClass('text-red-600')
	}

	const saveRecipeLaterBtn = $('#saveRecipe')

	saveRecipeLaterBtn.on('click', function(event) {
	event.preventDefault();
	saveRecipe();
	});
}

// *function for RECIPE SEARCH button click
$('#mainIngredientBTN').on('click', function(event){
	event.preventDefault();
	fetchRecipeByMainIngredient();
	displayList();
})

// todo filter by main ingredient
// todo not working 4/16 810am
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
	})
}



// *array to save recipes
let savedRecipes = JSON.parse(localStorage.getItem('savedmeal')) || [];
console.log(savedRecipes);

//* function to save meal id to array
function saveRecipe(){

	const savedmeal = {
		mealName: ($('#mealNameResult').text()),
		mealUrl: ($('#sourceResultLink').text()),
	}
	console.log(savedmeal)
	savedRecipes.push(savedmeal)
	localStorage.setItem('savedmeal', JSON.stringify(savedRecipes));
	displaySavedRecipes();
}

//* function to GET and POPULATE recipes as link list in div
// todo needs work 4/16 820am
function displaySavedRecipes (){
	localStorage.getItem('savedMeal')

	const savedRecipesList = $('#savedRecipesList')

	savedRecipes.forEach()
}


// todo list for recipe by main ingridient
//todo needs work
function displayList () {
	
	const recipeResultArea = $('#recipeResults');
	if (list.meals){
		list.meals.forEach ( meal => {
		
		});
	}
	
}

// todo displaySelectedRecipe()


// todo nowPickMovies()

$(document).ready(function(){
	displaySavedMovies()
	// displaySavedRecipes()
	// fetchRecipeByArea()

})



// // *mess, working on genre's and categories
// function fetchRecipeByArea(){
// 	const genreName = 'American'
// 	if (genreName === 'Action' ) {
// 			let area = 'American'
// 		}
// 	const fetchRecipeByAreaApi = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
// 	fetch(fetchRecipeByAreaApi)
// 	.then(response => {
// 		if (!response.ok){
// 			throw response.json()
// 		}
// 		console.log(response);
// 		return response.json()
		
// 	})
// 	.then(recipes => console.log(recipes))
// 	.catch(error => {
// 		console.error('Error fetching recipe:', error)
// 	}) 
// }




// todo nowPickMunchies()
// todo fetchRecipesFromMovie()**
// todo click function for findRecipeBtn
// todo function to pull genre
// todo if statements to pair genres with types of food
// *if statements to match genre's with keywords.
// const genre = movie.genre[0]

	// else if (genre.name === 'Adventure' || genre.id === 12) {
		// 	let category = 'Miscellaneous'
		// }
		
		// else if (genre.name === 'Animation' || genre.id === 16) {
			// 	let category = 'Breakfast'
			// }
			
			// else if (genre.name === 'Comedy' || genre.id === 35 || genre.name === 'Music' || genre.id === 10402) {
				// 	let category = 'Starter'
				// }
				
				// else if (genre.name === 'Crime' || genre.id === 80 || genre.name === 'War' || genre.id === 10752) {
					// 	let area = 'British'
					// }
					
					// else if (genre.name === 'Documentary' || genre.id === 99) {
						// 	let category = 'Vegetarian'
						// }
						
						// else if (genre.name === 'Drama' || genre.id === 18) {
							// 	let category = 'Pasta'
							// }

							// else if (genre.name === 'Family' || genre.id === 10751) {
								// 	let category = 'Side'
								// }

								// else if (genre.name === 'Fantasy' || genre.id === 14) {
									// 	let area = 'Greek'
// }

// else if (genre.name === 'History' || genre.id === 36) {
	// 	let category = 'Lamb'
// }

// else if (genre.name === 'Horror' || genre.id === 27) {
// 	let area = 'Chinese'
// }

// else if (genre.name === 'Mystery' || genre.id === 9648) {
	// 	let Area = 'Italian'
	// }
	
	// else if (genre.name === 'Romance' || genre.id === 10749) {
		// 	let category = 'Dessert'
		// }

		// else if (genre.name === 'Science Fiction' || genre.id === 878) {
			// 	let category = 'Chicken'
			// }
			
// else if (genre.name === 'TV Movie' || genre.id === 10770) {
// 	let category = 'Pork'
// }

// else if (genre.name === 'Thriller' || genre.id === 53) {
// 	let area = 'Japanese'
// }

// else if (genre.name === 'Western' || genre.id === 37) {
// 	let category = 'Beef'
// }

// !searching by name doesn't give much.
// // todo fetchRecipeByName
// $('#recipeByName').on('click', function(event){
// 	event.preventDefault()
// 	const keyword = $('#recipeName').val()
// 	console.log(keyword)
// 	function fetchRecipeByName(){
// 		const searchRecipeAPI = `www.themealdb.com/api/json/v1/1/search.php?s=${keyword}`
	
// 		fetch(searchRecipeAPI)
// 		.then(response => {
// 			if (!response.ok) {
// 				throw response.json()
// 			}
// 			return response.json()
// 			console.log(response)
// 		})
// 		.then(movie => {
// 			console.log(recipes)
// 			// displayRecipes(recipes)
// 		})
// 		.catch(error => {
// 			console.error('Fetch error:', error)
// 		});
// 	}
// 	fetchRecipeByName()
	
// })



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

// more functions to search by sliders/checkboxes