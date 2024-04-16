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
$('#harryPotter').on('click', () =>{
	console.log("you're a wizard harry")
	fetchMovieTitleApi()
})
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

const movieResultsArea= $('#movieResults')

// *function for random movie button
$('#randomMoviesBtn').on('click', function(event){
	event.preventDefault()
	movieResultsArea.empty()
	fetchRandomMovies()
})

// *function for populating movie results area
// todo title on top or below poster?
// todo create area when (random)btn is clicked instead of having it already displaying
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

// * function to fetch by id for selectedMovieModal
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
	homepage.text('Hompage')//could make the image the anchor...maybe
	
	movieModalDetails.append(poster, year, overview, rating, genre, runtime, homepage)
	movieModalHeader.append(movieTitle, close)
	dynamicElements.append(movieModalHeader, movieModalDetails)
	movieModal.prepend(dynamicElements)
	
	selectedMovieModal.show()
	
}

//* Selected Movie Modal Button Functions
// todo make these one liners
const selectedMovieModal = $('#movieModal')
const goBackBtn = $('#go-back')
const closeBtn = $('.close')
const saveForLaterBtnM = $('#saveForLaterM')
const getRandomRecipeBtn =$('#getRandomRecipe')
goBackBtn.on('click', () =>{
	selectedMovieModal.hide()
})

$(document).on('click', '.close', function() {
	selectedMovieModal.hide()
})

saveForLaterBtnM.on('click', function(event){
	event.preventDefault()
	console.log('click')
	setMovieLocalStorage()
	selectedMovieModal.hide()
	displaySavedMovies()
})

getRandomRecipeBtn.on('click', function(event){ 
	event.preventDefault()
	fetchRandomRecipe()
})

// * function for closing modal when you click off modal/don't want right now.
// $(document).click(function(event){
// 	if(!selectedMovieModal.is(event.target) && selectedMovieModal.has(event.target).length === 0){
// 		selectedMovieModal.hide()}})

function getMovieLocalStorage(){
	console.log(`localStorage${localStorage.movies}`)
	let movies = (JSON.parse(localStorage.getItem('movies')))
	if(!movies){
		movies=[]
	}
	return movies
}

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


		console.log(movie.title)
		console.log(movie.poster)
		console.log(movie.id)

	movieCard.append(savedMoviePoster, savedMovieTitle)
	savedMoviesArea.append(movieCard)	
	}
}
}



// todo getRecipeLocalStorage()

// todo getMatchLocalStorage()

// todo setRecipeLocalStorage()

// todo setMatchLocalStorage()




// todo displaySavedMatches()



// todo openSearchModal()



// todo searchMovie()



// todo searchRecipe()
// *fetch recipe api's not in use yet.
// const fetchRecipeByTypeApi = `www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
// const fetchRecipeByIdApi = `www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`



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
	.then(randomRecipe => {
		console.log(randomRecipe)
		displayRandomRecipe(randomRecipe)
	})
		
	.catch(error => {
		console.error('Error fetching recipe:', error)
	}) 
}

const randomRecipeBtn = $('#randomRecipeBtn')

$('#randomRecipeBtn').on('click', function(event){
	event.preventDefault();
	fetchRandomRecipe();
})

// todo filter by main ingredient
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

// array to save recipes
let savedRecipes = JSON.parse(localStorage.getItem('savedmeal')) || [];
console.log(savedRecipes);

// function to save meal id to array
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

// function to display saved recipes as link list in div
function displaySavedRecipes (){
	localStorage.getItem(savedMeal)

	const savedRecipesList = $('#savedRecipesList')

	savedRecipes.forEach()
}


// todo list for recipe by main ingridient
function displayList () {
	
	const recipeResultArea = $('#recipeResults');
	if (list.meals){
		list.meals.forEach ( meal => {
		
		});
	}
	
}

// todo makeRecipeLater()



// todo displaySelectedRecipe()




// todo nowPickMovies()




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


$(document).ready(function(){
	displaySavedMovies()
	fetchRecipeByArea()

})




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