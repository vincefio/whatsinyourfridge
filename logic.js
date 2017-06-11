// PSEUDOCODE: 

// - When user adds text 

// 6/10/2017

// OBJECTIVE:

// 	1. on ("#add-ingredient/addToListBtn") click, adds value/ingredient to panel_1 ("#ingredientPush")

// 		// Possibly store val() of an Ingredient on Firebase THEN fetches ingredient from server to populate the list

// 	2. Create an event listener on each ingredient that deletes ingredient .on("click",)

// 	3. Create variable for .val() of ingredients in ("#ingredientPush")

// 	4. Create on click event listener for ("#recipeFinderBtn") that:

// 		A. Runs the val(). through food2fork API

// 			i. JSON.parse response_data 

// 			ii. Grab Recipe (1) Title (2) Recipe URL

// 		B. Runs the (1) Title through Youtube API to find (3) Video

// 		C. Updates HTML by placing (1) Title (2) Recipe URL & (3) Video in respective <div>


// logic.js linked & working!



//Declaring and setting variable for ingredient array from LocalStorage

var foods = JSON.parse(localStorage.getItem("ingredientList"));


// Check for ingredientList existence within LocalStorage with the classification of Array.
// If true, then display list in Panel  //If not true, then set variable to an empty Array.

if (!Array.isArray(foods)) {
    foods = [];
}


// addIngredient Function to be run on Add-to-List button
function addIngredient() {

    $("#ingredientPush").empty(); //Deletes content in Ingredient List Panel

    var locList = JSON.parse(localStorage.getItem("ingredientList"));

    // Check for existence of ingredients within ingredientList LocalStorage
    // If true, set insideList variable to ingredients //If not true, then set insideList variable to an empty Array

    if (!Array.isArray(locList)) {
        locList = [];
    }

    //Display our locList to Food Panel using for loop to loop through locList Array of Ingredients
    //by creating a button with text of ingredient name, class of delete and data-index (for event listener functionality)
    for (var i = 0; i < locList.length; i++) {
        var ingredientBtn = $("<button class='delete'>").text(locList[i]).attr("data-index", i);
        $("#ingredientPush").append(ingredientBtn);
    }
}


// calls the addIngredient f(x)
addIngredient();



// EVENT LISTENER ON BUTTON TO DELETE
$(document).on("click", "button.delete", function(){
	var ingredientList = JSON.parse(localStorage.getItem("ingredientList"));
	var currentIndex = $(this).attr("data-index");

	ingredientList.splice(currentIndex, 1);
	foods  = ingredientList;

	localStorage.setItem("ingredientList", JSON.stringify(ingredientList));


	addIngredient();
});


// EVENT LISTENER ON ADD INGREDIENT BUTTON

$("#addToListBtn").on("click", function(event) {

    event.preventDefault();

    // Set variable to input value of ingredient form
    var val = $("input[type='text']").val().trim();

    // Clearing form value
    $("#addIngredient").val("");

    // 
    foods.push(val);
    localStorage.setItem("ingredientList", JSON.stringify(foods));


    //EXECUTES addIngredient F(x)
    addIngredient();

});


// Create variable for value of all ingredients within ingredientPush Panel
var totalIngredients = JSON.parse(localStorage.getItem("ingredientList"));




// DISPLAY RECIPE FUNCTION To be called on FIND RECIPE EVENT LISTENER


function displayRecipe() {


    var apiKey = "c5f6c9518c5a1d52b477a875b36b4f47";
    // var searchItem = recipeSearch;


    // Variable for one ingredient
    var ingredient = $('#addIngredient').val().trim();




    var queryURL = "https://food2fork.com/api/search?key=" + apiKey + "&q=" + totalIngredients + "&count=6" + "&callback=json"; //search term
    //search term
    //   https://food2fork.com/api/search?key=c5f6c9518c5a1d52b477a875b36b4f47&q=bacon,chicken,apple

    $.ajax({
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*",
            "Access-Control-Allow-Headers": "*"

        },
        url: queryURL,
        // dataType: "json",
        method: "GET",
        crossDomain: true,
    }).done(function(response) {
        // parsing response to create JSON object
        // && creating variable for object


        var responseJSON = JSON.parse(response);
        console.log(responseJSON);
        // console.log(response);


        for (var i = 0; i < 6; i++) {

            // console.log(responseJSON.recipes[i].title);

            // Declaring variable for title of recipe
            var title = responseJSON.recipes[i].title;

            // Hyperlink to site
            var recipeURL = responseJSON.recipes[i].source_url;

            // Recipe Title & RecipeURL Test
            console.log("Recipe Title " + i + ": " + title);
            console.log("Recipe link " + i + ": " + recipeURL);



        }

    });
};




// EVENT LISTENER ON FIND RECIPE BUTTON
$("#recipeFinderBtn").on("click", function(event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var ingredient = $("#addIngredient").val().trim();

    console.log(totalIngredients);

    displayRecipe();

});
