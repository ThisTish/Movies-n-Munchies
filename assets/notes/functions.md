##ROADMAP FOR FUNCTIONING


When the page loads{
	getLocalStorage(pairs, movies, recipes) --localStorage.getItems JSON parse
	displaySavedCards()<!--we will have to make these modal buttons, and can use our displayModal functions-->
}

<--Or, a search bar on a homepage-->
When open-modal-btn is clicked{
	modal with search form appears <--vertically centered??-->
}

<--or a genres || types of food are selected by (slide?) buttons-->
When input is submitted && movie/recipe radio is selected{
	fetch(movie/recipe API)
	displayResults(movie,recipe)<--page or slide scroll?-->
}

When a movie/recipe card is clicked/selected {
	modal of more details pops up
}

When save-for-later-btn is clicked{
	saveLocalStorage(movie, recipe)
	close modal 
	display saved cards
}
<!-- Done -->
<!-- When go-back-btn is clicked{
	close modal
}-->

when YES! button is clicked{
	keywords/catagories from movie/recipe populate the other one's API
	displayResults(movie, recipe)
	saveFirstPickedCard somewhere on the page
}

<--when start-over-btn is clicked?, the search modal appears?, reset inputs? or just a reset button on the page somewhere-->

<--Run again for second Choice-->
When a movie/recipe card is clicked/selected {
	modal of more details pops up
}

When pair-up-btn is clicked{
	a large card with movie poster & image of food is displayed in someway --displayPaired
	saveLocalStorage(pair)
}

When delete-btn is clicked{
	this. is removed from localStorage
	saveLocalStorage()
	getLocalStorage()
	displaySavedCards()

}

when watched/made/done button is pressed{
	little icon (checkmark) shows on movie/recipe/paired
}

When random-button is clicked{
	randomRecipeFetch()
	randomMovieFethc()
	displayPaired()
}


#Other Ideas...