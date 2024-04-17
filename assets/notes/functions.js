// ##ROADMAP FOR FUNCTIONING


// When the page loads{
// 	getLocalStorage(pairs, movies, recipes) --localStorage.getItems JSON parse
// 	displaySavedCards()<!--we will have to make these modal buttons, and can use our displayModal functions-->
// }

// <--Or, a search bar on a homepage-->
// When open-modal-btn is clicked{
// 	modal with search form appears <--vertically centered??-->
// }

// <--or a genres || types of food are selected by (slide?) buttons-->
// When input is submitted && movie/recipe radio is selected{
// 	if/then for movie or recipe
// 	fetch(movie/recipe API)
// 	displayResults(movie,recipe)<--page or slide scroll?-->
// }

// When a movie/recipe card is clicked/selected {
// 	modal of more details pops up
// }

// When save-for-later-btn is clicked{
// 	saveLocalStorage(movie, recipe)
// 	close modal 
// 	display saved cards
// }
// <!-- Done -->
// <!-- When go-back-btn is clicked{
// 	close modal
// }-->

// when YES! button is clicked{
// 	keywords/catagories from movie/recipe populate the other one's API
// 	displayResults(movie, recipe)
// 	saveFirstPickedCard somewhere on the page
// }

// <--when start-over-btn is clicked?, the search modal appears?, reset inputs? or just a reset button on the page somewhere-->

// <--Run again for second Choice-->
// When a movie/recipe card is clicked/selected {
// 	modal of more details pops up
// }

// When pair-up-btn is clicked{
// 	a large card with movie poster & image of food is displayed in someway --displayPaired
// 	saveLocalStorage(pair)
// }

// When delete-btn is clicked{
// 	this. is removed from localStorage
// 	saveLocalStorage()
// 	getLocalStorage()
// 	displaySavedCards()

// }

// when watched/made/done button is pressed{
// 	little icon (checkmark) shows on movie/recipe/paired
// }

// When random-button is clicked{
// 	randomRecipeFetch()
// 	randomMovieFetch()
// 	displayPaired()
// }

// #Other Ideas...




// // * function for Selected Recipe Modal.

// function displaySelectedRecipe(randomRecipe){
// 	const selectedRecipeBody = $('recipeModalBody')
// 	const recipeModalDynamics = $('<div>')
// 	recipeModalDynamics.addClass('recipeElements p-3 text-white')
	

// 	const recipeArray = randomRecipe.meals[0]
	
// 	const recipeResultArea = $('#recipeResults')
// 	const resultsCard = $('<div>')
	
// 	const mealName = $('<h4>')
// 	mealName.text(`Meal: ${recipeArray.strMeal}`)
// 	mealName.addClass('underline decoration-1')
// 	mealName.attr('id', 'mealNameResult')
	
// 	const category = $('<p>')
// 	category.text(`Category: ${recipeArray.strCategory}`)
	
// 	const ingredientsList = $('<ul>')
// 	ingredientsList.text(`Ingredients & Measurements:`)
// 	for (let  i=1; i<=20; i++){
// 		const ingredient = recipeArray['strIngredient' + i];
// 		const measurement = recipeArray['strMeasure' + i];
// 		if (ingredient) {
// 			const listItem = $('<li>').text(`${measurement} ${ingredient}`);
			
// 		} else {
// 			break;
// 		}
// 	}
// 	// ? not sure if you wanted these. 
// 	// const measurements = $('<p>')
// 	// measurements.appendTo(resultsCard)
// 	// measurements.text(recipeArray.strMeasure)
	
// 	const instructions = $('<p>')
// 	instructions.text(`Instructions: ${recipeArray.strInstructions}`)

// 	const source = $('<a>');
// 	if (recipeArray.strSource && recipeArray.strSource.trim() !== ""){
// 		source.text(`Source: ${recipeArray.strSource}`)
// 	source.attr('href', recipeArray.strSource);
// 	source.attr('target', '_blank')
// 	source.attr('id', 'sourceResultLink')
// 	source.addClass('text-green-200')
// 	} else {
// 		source.text('Source not available')
// 		source.addClass('text-red-600')
// 	}
// 	// *added another set of parenthesis
// 	resultsCard.append($('<br>'));
	
// 	const youTube = $('<a>');
// 	if (recipeArray.strYoutube && recipeArray.strYoutube.trim() !== "") {
// 		youTube.text(`YouTube Video: ${recipeArray.strYoutube}`)
// 		youTube.attr('href', recipeArray.strYoutube);
// 		youTube.attr('target', '_blank')
// 		youTube.addClass('text-red-700')
// 	}else {
// 		youTube.text('YouTube link not available');
// 		youTube.addClass('text-red-600')
// 	}
	
	
	
	
// 	saveRecipeLaterBtn.on('click', function(event) {
// 		event.preventDefault();
// 		saveRecipe();
// 	});
// 	resultsCard.append(mealName, category, ingredientsList, instructions, source, youTube)
// 	recipeModalDynamics.append(resultsCard)
// 	selectedRecipeBody.prepend(recipeModalDynamics) 
	
// 	const selectedRecipeModal = $('#recipeModal')
// 	selectedRecipeModal.show()
// }

// todo create in modal and other buttons in html line 313 in js
// const saveRecipeLaterBtn = $('#saveRecipe')//check if needed to be declared here, definitly need to past it into html modal
// todo create and link
const getRandomMovieBtn = $('#getRandomMovie')


getRandomMovieBtn.on('click', function(event){ 
	event.preventDefault()
	selectedMovieModal.hide()
	fetchARandomMovie()
})


const selectedMovieModal = $('#movieModal')
const goBackBtn = $('#go-back')
const closeBtn = $('.close')
const saveForLaterBtnM = $('#saveForLaterM')
const getRandomRecipeBtn =$('#getRandomRecipe')
// !go back button not working
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
getRandomRecipeBtn.on('click', function(event){ 
	event.preventDefault()
	selectedMovieModal.hide()
	fetchRandomRecipe()
})