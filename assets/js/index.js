const modalSubmitSearchBtn = $('#submitSearch')
const movieResultsArea= $('#movieResults')
const submitSearch = $('#submitSearch');
const searchForm = $('#searchForm')
const matchUpArea = $('#matchContainer')

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

$('#searchForm').on('submit', function(event){
	event.preventDefault()
	$('#searchModal').hide()
	const searchInputEl = $('#searchInput').val()
	if($('#movieRadio').prop('checked')){
		fetchMovieTitleApi(searchInputEl)
	}
	else if($('#recipeRadio').prop('checked')){
		fetchRecipeByMainIngredient(searchInputEl)
	}
})

// *function for MOVIE TITLE FETCH
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
	.then(movie => {
		displayMovieResults(movie)
	})
	.catch(error => {
		console.error('Fetch error:', error)
	})
	
}

function fetchRecipeByMainIngredient(search) {
	const mainIngredientUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${search}`
	
	fetch(mainIngredientUrl)
	.then(response => {
		return response.json()
	})
	.then(list => {
		displayRecipeResults(list)
	})
	.catch(error => {
		console.error('Error fetching list:', error)
		alert('no recipes found with that main ingredient')
	})
}


// *function for RANDOM MOVIE button click
$('#randomMoviesBtn').on('click', function(event){
	event.preventDefault()
	matchUpArea.hide()
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
	return atRandomMovie 

}

// *function for random movie clicks modal
$('#getRandomMovie').on('click', function(event){
	event.preventDefault()
	singleMovieArea.empty()
	fetchARandomMovie()
		.then(movies => {
			const randomMovieDetails = randomMovie(movies)
		displaySingleMovie(randomMovieDetails)
		$('#matchContainer').show()


		})
		.catch(error =>{
			console.error('fetch error', error)
		})
})
// same as above but for the movie area
$('#randomMovieBtnAgain').on('click', function(event){
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



// *function to display SINGLE RANDOM MOVIE
const singleMovieArea = $('#singleMovie')
function displaySingleMovie(movie){
	singleMovieArea.empty()

	const movieModalHeader = $('<header>')

	const movieTitle = $('<h2>')
	movieTitle.addClass('text-pink')
	movieTitle.text(movie.title)
	movieTitle.attr('id', 'movieModalTitle')


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
	// genre.text(movie.genres[0].name)//could add more IF they have more...later

	const runtime = $('<p>')
	runtime.addClass('text-sm')
	runtime.text(`${movie.runtime} min`)

	const homepage = $('<a>')
	homepage.addClass('text-center')
	homepage.attr('href', movie.homepage)
	homepage.text('Homepage')//could make the image the anchor...maybe
	
	movieModalDetails.append(poster, year, overview, rating, genre, runtime, homepage)
	movieModalHeader.append(movieTitle)
	singleMovieArea.append(movieModalHeader,movieModalDetails)
}
// * function to FETCH by ID for selectedMOVIE MODAL with movie click
function fetchMovieId(movieId){
	const apiKey = "05ee849ca5bf0c7ca64d3561ba1aa9b8"
	const movieIdApi = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US&api_key=${apiKey}`

	return fetch(movieIdApi)
	.then(response => {
		if (!response.ok) {
			throw response.json()
		}
		return response.json()
	})
	.catch(error => {
		console.error('Fetch error:', error)
	});
}

$(document).on('click','#selectedMovieBtn', function() {
	const movieId = $(this).attr('data-movie-id')

	function clearModal() {
		$('.movieModalDynamic').empty()
	}
	clearModal()
	fetchMovieId(movieId)
		.then(movie =>{
			displaySelectedMovie(movie)
		})
})

// *function for POPULATE MOVIE RESULTS area
function displayMovieResults(page){
	$('#movies').show()
	for(let i = 0; i<7; i++){
		const movieDetails = page.results[i]
		const movieCard = $('<div>')
		movieCard.addClass('card')
		
		if(movieDetails.backdrop_path){
			const backdrop = $('<img>')
			.attr('src', `https://image.tmdb.org/t/p/w154/${movieDetails.backdrop_path}`)
			.addClass('w-full h-auto')
			
			const backDropBtn = $('<button>')
			backDropBtn.addClass('rounded-lg relative overflow-hidden')
			backDropBtn.attr({
				'data-movie-id': movieDetails.id,
				'id':'selectedMovieBtn',
				'type':'button'
			})
			
			const titleOverlay = $('<div>')
			.addClass('absolute bottom-0 left-0 right-0 text-white px-4 py-2 hover:bg-black hover:bg-opacity-50')
			.text(movieDetails.title)
	
			backDropBtn.append(backdrop, titleOverlay)
			movieCard.append(backDropBtn)
			movieResultsArea.append(movieCard)
		}
	
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

	const close = $('<span>')
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
	rating.text(movie.vote_average)

	const genre = $('<p>')
	genre.addClass('font-bold')
	genre.text(movie.genres[0].name)

	const runtime = $('<p>')
	runtime.addClass('text-sm')
	runtime.text(`${movie.runtime} min`)

	const homepage = $('<a>')
	homepage.addClass('text-center')
	homepage.attr('href', movie.homepage)
	homepage.text('Homepage')
	
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
goBackBtn.on('click', function(event){
	event.preventDefault()
	selectedMovieModal.hide()
	
})
$(document).on('click', '.close', function() {
	selectedMovieModal.hide()
	selectedRecipeModal.hide()

})
saveForLaterBtnM.on('click', function(event){
	event.preventDefault()
	setMovieLocalStorage()
	selectedMovieModal.hide()
	displaySavedMovies()
	
})
// same as above but for movie area
$('#saveMovie').on('click', function(event){
	event.preventDefault()
	setMovieLocalStorage()
	selectedMovieModal.hide()
	displaySavedMovies()
	
})


getRandomRecipeBtn.on('click', function(event){ 
	event.preventDefault()
	// $('#recipeResults').empty()
	fetchRandomRecipe()
		.then(recipe =>{
			displayRandomRecipe(recipe)
		})
	const movieId = $('#movieModal').find('#movieDeets').attr('data-movie-id')
	console.log(movieId)
	fetchMovieId(movieId)
		.then(movie =>{
			console.log(movie)
			displaySingleMovie(movie)
			$('#matchContainer').show()
			
	})
	selectedMovieModal.hide()
})

$(document).click(function(event){
	if(!selectedMovieModal.is(event.target) && selectedMovieModal.has(event.target).length === 0){
		selectedMovieModal.hide()}
})

		$(document).click(function(event){
	if(!selectedRecipeModal.is(event.target) && selectedRecipeModal.has(event.target).length === 0){
		selectedRecipeModal.hide()}
})




// *function to get MOVIE LOCALSTORAGE
function getMovieLocalStorage(){
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

}
// *function POPULATE SAVED MOVIES
function displaySavedMovies(){
	const savedMoviesArea = $('#savedMoviesArea')
	const movies = 	getMovieLocalStorage()

	savedMoviesArea.empty()

	if(Array.isArray(movies)){
		for(let movie of movies){
			
		const movieCard = $('<div>').addClass('flex flex-col items-center overflow-hidden h-full p-1 m-1 rounded bg-black bg-opacity-50')
		movieCard.attr({
			'id': 'selectedMovieBtn',
			'type': 'button',
			'data-movie-id': movie.id
		})
		
		const movieButton = $('<button>')
		movieButton.addClass('hover:grow hover:scale-110')

		const titleContainer = $('<div>').addClass('w-full h-17 overflow-hidden pt-1')

		const savedMovieTitle = $('<h2>')
		savedMovieTitle.addClass(' text-white opacity-50 text-xs p-2 text-center w-full')
		savedMovieTitle.text(movie.title)

		// const div = $('<div>').addClass('px-6 py-4')

		const savedMoviePoster = $('<img>')
		savedMoviePoster.addClass('w-full h-auto ')
		savedMoviePoster.attr('src', movie.poster)


	movieButton.append(savedMoviePoster)
	titleContainer.append(savedMovieTitle)	
	movieCard.append(movieButton, titleContainer)
	savedMoviesArea.append(movieCard)	
	}
}
}






// *function for RANDOM RECIPE button click
const randomRecipeBtn = $('#randomRecipeBtn')
$('#randomRecipeBtn').on('click', function(event){
	event.preventDefault();
	fetchRandomRecipe();
})
// same thing but for the one in the results area
$('#randomRecipeAgain').on('click', function(event){
	event.preventDefault()
	fetchRandomRecipe()
		.then(recipe =>{
			
			displayRandomRecipe(recipe)
		})
})

// *function to FETCH RANDOM RECIPE
function fetchRandomRecipe() {
	const randomRecipeUrl = `https://www.themealdb.com/api/json/v1/1/random.php?`
	
	return fetch(randomRecipeUrl)
	.then(response => {
		if (!response.ok){
			throw response.json()
		}
		console.log(response);
		return response.json()
		
	})
	.then(randomRecipe => {
		return randomRecipe
	})
		
	.catch(error => {
		console.error('Error fetching recipe:', error)
	}) 
}


// * function to POPULATE RANDOM RECIPE w/ details
function displayRandomRecipe (randomRecipe){
	
	$('#matchContainer').show()
	
	
	const recipeArray = randomRecipe.meals[0]
	
	const recipeResultArea = $('#recipeResults')
	recipeResultArea.empty()
	const resultsCard = $('<div>')
	.attr({
		'id': 'resultsCard',
		'data-recipe-id' : recipeArray.idMeal
	})
	resultsCard.appendTo(recipeResultArea)
	
	const mealName = $('<h4>')
	mealName.appendTo(resultsCard)
	mealName.text(recipeArray.strMeal)
	mealName.addClass('underline decoration-1')
	mealName.attr('id', 'mealNameResult')

	const recipeThumb = $('<img>')
	.attr({
		'src': recipeArray.strMealThumb,
		'id': 'recipeImg'
	})
	.addClass('w-40 h-auto')
	recipeThumb.appendTo(resultsCard)

	
	const category = $('<p>')
	category.appendTo(resultsCard)
	category.text(`Category: ${recipeArray.strCategory}`)
	
	
	const ingredientsList = $('<ul>')
	ingredientsList.text(`Ingredients & Measurements:`)
	for (let  i=1; i<=20; i++){
		const ingredient = recipeArray['strIngredient' + i];
		const measurement = recipeArray['strMeasure' + i];
		if (ingredient) {
			const listItem = $('<li>').text(`${measurement} ${ingredient}`);
			
			listItem.appendTo(ingredientsList);
		} else {
			break;
		}
	}
	ingredientsList.appendTo(resultsCard);
	
	const instructions = $('<p>')
	instructions.appendTo(resultsCard)
	instructions.text(`Instructions: ${recipeArray.strInstructions}`)
	
	
	const source = $('<a>');
	source.appendTo(resultsCard);
	if (recipeArray.strSource && recipeArray.strSource.trim() !== ""){
		source.text(`Source: ${recipeArray.strSource}`)
		source.attr('href', recipeArray.strSource);
		source.attr('target', '_blank')
		source.attr('id', 'sourceResultLink')
		source.addClass('text-green-200')
	} else {
		source.text('Source not available')
		source.addClass('text-black')
	}
	
	resultsCard.append('<br>');
	
	const youTube = $('<a>');
	youTube.appendTo(resultsCard);
	if (recipeArray.strYoutube && recipeArray.strYoutube.trim() !== "") {
		youTube.text(`YouTube Video: ${recipeArray.strYoutube}`)
		youTube.attr('href', recipeArray.strYoutube);
		youTube.attr('target', '_blank')
		youTube.addClass('text-black')
	}else {
		youTube.text('YouTube link not available');
		youTube.addClass('text-black')
	}

	const saveRecipeLaterBtn = $('#saveRecipe')
	
	saveRecipeLaterBtn.on('click', function(event) {
		event.preventDefault();
		saveRecipe();
	});
}





//*functions for random recipe card.........to be used to make random recipe list
function fetchRandomRecipeCard() {
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
		displayRecipeCard(randomRecipe)
	})
	
	.catch(error => {
		console.error('Error fetching recipe:', error)
	}) 
}

$('#recipeCardBtn').on('click', function(event){
    event.preventDefault()
    recipeCardArea.empty()
    for (let i = 0; i < 5; i++) {
        fetchRandomRecipeCard()
    }
	matchUpArea.hide()
})

// *function to POPULATE RANDOM RECIPE CARD
const recipeCardArea = $('#randomRecipeArea')
function displayRecipeCard(recipeDetails){
	$('#recipeCardArea').show()
	const recipeList = recipeDetails.meals[0]
	
	const recipeCard = $('<div>')
	recipeCard.addClass('card')

	const backDropBtn = $('<button>')
	backDropBtn.addClass('rounded-lg relative overflow-hidden')
	backDropBtn.attr({
		'data-recipe-id': recipeList.idMeal,
		'id':'selectedRecipeModalBtn',
		'type':'button'
	})
	
	const backdrop = $('<img>')
	.attr('src', recipeList.strMealThumb)
	.addClass('w-40 h-auto')

	const titleOverlay = $('<div>')
	.addClass('absolute bottom-0 left-0 right-0 text-white px-4 py-2 hover:bg-black hover:bg-opacity-50')
	.text(recipeList.strMeal)
	
	backDropBtn.append(backdrop, titleOverlay)
	recipeCard.append(backDropBtn)
	recipeCardArea.append(recipeCard)
}

function displayRecipeResults(recipes) {
	// $('#recipeCardArea').empty()
	$('#recipeCardArea').show()

	for(let i=0; i< 5; i++){
		const recipeCard = $('<div>')
		recipeCard.addClass('card')
		const backDropBtn = $('<button>')
		backDropBtn.addClass('rounded-lg relative overflow-hidden')
		backDropBtn.attr({
			'data-recipe-id': recipes.meals[i].idMeal,
			'id':'selectedRecipeModalBtn',
			'type':'button'
		})
		
		const backdrop = $('<img>')
		.attr('src', recipes.meals[i].strMealThumb)
		.addClass('w-40 h-auto')
	
		const titleOverlay = $('<div>')
		.addClass('absolute bottom-0 left-0 right-0 text-white px-4 py-2 bg-black bg-opacity-50')
		.text(recipes.meals[i].strMeal)
		
		backDropBtn.append(backdrop, titleOverlay)
		recipeCard.append(backDropBtn)
		recipeCardArea.append(recipeCard)
	}

}


// * function to FETCH by ID for selectedRecipe MODAL(card click)
const selectedRecipeModalBtn = $('#selectedRecipeModalBtn')

$(document).on('click','#selectedRecipeModalBtn', function() {
	const recipeID = $(this).attr('data-recipe-id')

	function clearModal() {
		$('#recipeModalDynamics').empty()
	}
	clearModal()
	
	fetchRecipebyId(recipeID)
		.then(recipe =>{
	displaySelectedRecipe(recipe)
		})
})

function fetchRecipebyId(recipeID){
	const recipeIdApi = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeID}`

	return fetch(recipeIdApi)
	.then(response => {
		if (!response.ok) {
			throw response.json()
		}
		return response.json()
	})
	.then(recipe => {
		return recipe
	})
	.catch(error => {
		console.error('Fetch error:', error)
	});
}

// * function for Selected Recipe Modal.
function displaySelectedRecipe(randomRecipe){
	const recipeArray = randomRecipe.meals[0]
	const selectedRecipeBody = $('.recipeModalBody')

	const recipeModalDynamics = $('<div>')
	recipeModalDynamics.addClass('recipeElements p-3 text-white').attr('id', 'recipeModalDynamics')
	
	
	const resultsCard = $('<div>')
	resultsCard.addClass('card')
	resultsCard.attr({
		'id':'recipeModalCard',
		'data-recipe-id': recipeArray.idMeal

	})

	const recipeDetailsHeader = $('<header>').addClass('header')
	
	const mealName = $('<h4>')
	mealName.text(recipeArray.strMeal)
	mealName.addClass('underline decoration-1')
	mealName.attr('id', 'mealNameResult')

	const close = $('<span>')//might add back to html
	close.addClass('close absolute text-white top-0 right-0 p-4 cursor-pointer')
	close.html('&times;')
	
	const category = $('<p>')
	category.text(`Category: ${recipeArray.strCategory}`)

	const recipeThumb = $('<img>')
	.attr({
		'src': recipeArray.strMealThumb,
		'id': 'recipeImg'
	})
	.addClass('w-40 h-auto')
	recipeThumb.appendTo(resultsCard)


	const ingredientsList = $('<ul>')
	ingredientsList.text(`Ingredients & Measurements:`)
	for (let  i=1; i<=20; i++){
		const ingredient = recipeArray['strIngredient' + i];
		const measurement = recipeArray['strMeasure' + i];
		if (ingredient) {
			const listItem = $('<li>').text(`${measurement} ${ingredient}`);
			
		} else {
			break;
		}
	}
	
	const instructions = $('<p>')
	instructions.text(`Instructions: ${recipeArray.strInstructions}`)

	const source = $('<a>');
	if (recipeArray.strSource && recipeArray.strSource.trim() !== ""){
		source.text(`Source: ${recipeArray.strSource}`)
	source.attr('href', recipeArray.strSource);
	source.attr('target', '_blank')
	source.attr('id', 'sourceResultLink')
	source.addClass('text-green-200')
	} else {
		source.text('Source not available')
		source.addClass('text-red-600')
	}
	// *added another set of parenthesis
	resultsCard.append($('<br>'));
	
	const youTube = $('<a>');
	if (recipeArray.strYoutube && recipeArray.strYoutube.trim() !== "") {
		youTube.text(`YouTube Video: ${recipeArray.strYoutube}`)
		youTube.attr('href', recipeArray.strYoutube);
		youTube.attr('target', '_blank')
		youTube.addClass('text-red-700')
	}else {
		youTube.text('YouTube link not available');
		youTube.addClass('text-red-600')
	}
	
	
	
	
	recipeDetailsHeader.append(mealName, close)
	resultsCard.append(recipeDetailsHeader, category, ingredientsList, instructions, source, youTube)
	recipeModalDynamics.append(resultsCard)
	selectedRecipeBody.prepend(recipeModalDynamics) 
	
	selectedRecipeModal.show()
}

// *recipe modal buttons
const selectedRecipeModal = $('#recipeModal')
const saveForLaterBtnR = $('#saveForLaterR')
saveForLaterBtnR.on('click', function(event){
	event.preventDefault()
	selectedRecipeModal.hide()
	saveRecipe()

	displaySavedRecipes()
})
const goBackBtnR = $('#goBack')
goBackBtnR.on('click', function(event){
	event.preventDefault()
	selectedRecipeModal.hide()
})

const randomMovieR = $('#getRandomMovie')
randomMovieR.on('click', function(event){
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
		const recipeId = $('#recipeModal').find('#recipeModalCard').attr('data-recipe-id')
		fetchRecipebyId(recipeId)
			.then(recipe =>{
				displayRandomRecipe(recipe)
			})
		selectedRecipeModal.hide()
})


// *array to save recipes
let savedRecipes = JSON.parse(localStorage.getItem('savedmeal')) || [];

//* function to save meal id to array
function saveRecipe(){
	
	const savedmeal = {
			mealName: ($('#mealNameResult').text()),
			mealUrl: ($('#sourceResultLink').attr('href')),
			thumbnail: ($('#recipeImg').attr('src')),
			id: ($('#recipeModalCard').attr('data-recipe-id'))
		}

	savedRecipes.push(savedmeal)
	localStorage.setItem('savedmeal', JSON.stringify(savedRecipes));
	displaySavedRecipes();
}

//* function to GET and POPULATE recipes as link list in div
function displaySavedRecipes (){
	
	const recipeIdLinks = $('#recipeIdLinks')
	recipeIdLinks.empty();
	
	savedRecipes.forEach(function(savedmeal) {
		const recipeCard = $('<div>')

			const backDropBtn = $('<button>')
			backDropBtn.addClass('w-32 h-32 rounded-lg overflow-hidden hover:grow hover:scale-110 m-2 relative')
			backDropBtn.attr({
				'data-recipe-id': savedmeal.id,
				'id':'selectedRecipeModalBtn',
				'type':'button'
			})
			
			const backdrop = $('<img>')
			.attr('src', savedmeal.thumbnail)
			.addClass('w-40 h-auto')

			const titleOverlay = $('<div>')
			.addClass('absolute bottom-0 left-0 right-0 text-white px-4 py-2 bg-black bg-opacity-50')
			.text(savedmeal.mealName)


		

			backDropBtn.append(backdrop, titleOverlay)
			recipeCard.append(backDropBtn)
		recipeIdLinks.append(recipeCard);
	});
}


// *functions for RANDOM MATCH UP>>>>>>>>>>>>>>>>>>>>>>
const randomMatchUpBtn = $('#matchUpRandom')
randomMatchUpBtn.on('click', function(event){
	event.preventDefault()
	singleMovieArea.empty()
	fetchRandomRecipe()
	.then(recipe =>{
			$('#recipeResults').empty()
			displayRandomRecipe(recipe)
		})
	

	fetchARandomMovie()
		.then(movies => {
			const randomMovieDetails = randomMovie(movies)

		displaySingleMovie(randomMovieDetails)

		})
		.catch(error =>{
			console.error('fetch error', error)
		})

	$('#matchContainer').show()
})

$('#saveForAnotherNight').on('click', function(){
	setMatches()
	displaySavedMatches()
})

// *function to get match LOCALSTORAGE
function getMatches(){
	let matches = (JSON.parse(localStorage.getItem('matches')))
	if(!matches){
		matches=[]
	}
	return matches
}
// *function to set match LOCALSTORAGE
function setMatches(){
	let matches = getMatches()
	
	const savedMatchObject = {
		movie: {
			title: ($('#movieModalTitle').text()),
			poster: ($('#moviePoster').attr('src')),
			id: ($('#movieDeets').attr('data-movie-id'))
		},
		recipe: {
			mealName: ($('#mealNameResult').text()),
			mealUrl: ($('#sourceResultLink').attr('href')),
			thumbnail: ($('#recipeImg').attr('src')),
			id: ($('#resultsCard').attr('data-recipe-id'))
		}
	}
	matches.push(savedMatchObject)
	
	localStorage.setItem('matches', JSON.stringify(matches))
	// console.log(savedMatchObject)
	// console.log(localStorage.matches)
	
}
// *function POPULATE SAVED matches
function displaySavedMatches(){
	const matchObjects = getMatches()
	const savedMatchesArea = $('#savedMatchesArea')
	savedMatchesArea.empty()
	
	if(Array.isArray(matchObjects)){
		for(let match of matchObjects){
			const matchCard = $('<div>')
			.addClass('card flex flex-row p-4 m-3 rounded-lg bg-black text-white bg-opacity-50 h-auto content-center shrink-0')
			.attr('id','matchCard')

			const movie = match.movie
			const recipe = match.recipe
			

			const movies = 	getMovieLocalStorage()
			
			const movieCard = $('<div>').addClass('flex flex-col items-center overflow-hidden max-w-full h-full md:p-1 md:m-2 rounded bg-black bg-opacity-50 shrink-0')
			movieCard.attr({
				'id': 'selectedMovieBtn',
				'type': 'button',
				'data-movie-id': movie.id
			})
	
			const movieButton = $('<button>')
			movieButton.addClass('hover:grow hover:scale-110')

			const titleContainer = $('<div>').addClass('w-full h-17 overflow-hidden pt-1')

			const savedMovieTitle = $('<h2>')
			savedMovieTitle.addClass(' text-white opacity-50 text-xs p-2 text-center w-full shrink-0')
			savedMovieTitle.text(movie.title)

			const savedMoviePoster = $('<img>')
			savedMoviePoster.addClass('w-full h-auto ')
			savedMoviePoster.attr('src', movie.poster)


			movieButton.append(savedMoviePoster)
			titleContainer.append(savedMovieTitle)	
			movieCard.append(movieButton, titleContainer)	
			

			const recipeCard = $('<div>').addClass("flex flex-col items-center overflow-hidden h-full md:p-1 md:m-2 rounded shrink-0")

			const backDropBtn = $('<button>')
			backDropBtn.addClass('rounded-lg relative overflow-hidden hover:grow hover:scale-110')
			
			backDropBtn.attr({
				'data-recipe-id': recipe.id,
				'id':'selectedRecipeModalBtn',
				'type':'button'
			})
			
			const backdrop = $('<img>')
			.attr('src', recipe.thumbnail)
			.addClass('w-40 h-auto shrink-0 min-w-full')

			const titleOverlay = $('<div>')
			.addClass('absolute bottom-0 left-0 right-0 text-white md:px-4 md:py-2 bg-black bg-opacity-50')
			.text(recipe.mealName)

			const recipeSrc = ($('<a>'))
			recipeSrc.attr({
				'id':'recipeLink',
				'src': recipe.mealUrl
			})
			
			backDropBtn.append(backdrop, titleOverlay)
			recipeCard.append(backDropBtn)
			matchCard.append(recipeCard, movieCard)
			savedMatchesArea.append(matchCard)
		}
	}
}

$(document).ready(function(){
	displaySavedMovies()
	displaySavedRecipes();
	displaySavedMatches()
})



// *fetch recipe api's not in use yet.
// const fetchRecipeByTypeApi = `www.themealdb.com/api/json/v1/1/filter.php?c=${category}`











// todo fetchMoviesFromRecipes()
// todo fetchRecipesFromMovie()**
// todo function to pull genre
// todo if statements to pair genres with types of food
// *if statements to match genre's with keywords.

// *working in progress after all other things.switch and case
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






// OPTIONAL
// todo startOver()

// OPTIONAL
// todo deleteSavedBtn()

// OPTIONAL
// todo doneBtns()

// OPTIONAL
// todo slidingResults()

// more functions to search by sliders/checkboxes