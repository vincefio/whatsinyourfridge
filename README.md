# whatsinyourfridge


6/10/2017

OBJECTIVE:
	
	1. on ("#add-ingredient/addToListBtn") click, adds value/ingredient to panel_1 ("#ingredientPush")

		// Possibly store val() of an Ingredient on Firebase THEN fetches ingredient from server to populate the list

	2. Create an event listener on each ingredient that deletes ingredient .on("click",)

	3. Create variable for .val() of ingredients in ("#ingredientPush")

	4. Create on click event listener for ("#recipeFinderBtn") that:

		A. Runs the val(). through food2fork API

			i. JSON.parse response_data 

			ii. Grab Recipe (1) Title (2) Recipe URL

		B. Runs the (1) Title through Youtube API to find (3) Video

		C. Updates HTML by placing (1) Title (2) Recipe URL & (3) Video in respective <div>
