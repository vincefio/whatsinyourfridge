// PSEUDOCODE: 

// - When user adds text in (#addIngredientForm).
// - User clicks button (#addToListBtn):
// 	 -User input is added into #ingredientPush.
// 	 -#addIngredientsForm is cleared.

// - User clicks on #recipeFinderBtn to trigger the AJAX call. 

// Setting up global variables:
	


$(document).ready(function(){ 

     //When the Add Ingredient button is clicked:
     $("#addToListBtn").click(function(){

     //Storing the user's ingredient in a variable:
     var userInput = $("#addIngredientForm").val();
     	console.log = userInput;
     
     //Updating the HTML to show the user's entered name:
     $("#ingredientPush").html(userInput);

     //Clearing input field after button is clicked:
     userInput = $("#addIngredientForm").val("");
    });
});
		

	

	