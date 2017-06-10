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



//Declaring and setting Variables

var ingredientList = JSON.parse(localStorage.getItem("ingredientList"));




// DISPLAY RECIPE FUNCTION


function displayRecipe() {


    var apiKey = "c5f6c9518c5a1d52b477a875b36b4f47";
    // var searchItem = recipeSearch;

    var ingredient = $('#addIngredient').val().trim();

    var queryURL = "https://food2fork.com/api/search?key=" + apiKey + "&q=" + ingredient + "&count=6"; //search term
    //search term
    //   https://food2fork.com/api/search?key=c5f6c9518c5a1d52b477a875b36b4f47&q=bacon,chicken,apple

    $.ajax({
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
            url: queryURL,
            method: "GET",
            crossDomain: true,
        }).done(function(response) {
                // parsing response to create JSON object
                // && creating variable for object
                var responseJSON = JSON.parse(response);
                console.log(responseJSON);

                for (var i = 0; i < 6; i++) {

                    // console.log(responseJSON.recipes[1].title);
                    // Declaring variable for title of recipe
                    var title = responseJSON.recipes[i].title;

                    // Hyperlink to site
                    var recipeURL = responseJSON.recipes[i].source_url;

                    // Recipe Title Test
                    console.log("Recipe Title: " + title);
                    console.log("Recipe link: " + recipeURL);



                }

            })
        };


            $("#recipeFinderBtn").on("click", function(event) {
                event.preventDefault();
                // This line grabs the input from the textbox
                var ingredient = $("#addIngredient").val().trim();

                displayRecipe();

              });


            
