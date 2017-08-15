
// Hides Recipe Panel on Page Load
$(".recipes").hide();

// Hides ingredient panel on page load
$("#ingredientPush").hide();


//Declaring and setting variable for ingredient array from LocalStorage

var foods = JSON.parse(localStorage.getItem("ingredientList"));

//set empty array off page reload
var emptyArray = [];
localStorage.setItem("ingredientList", JSON.stringify(emptyArray));

// Create variable for value of all ingredients within ingredientPush Panel
// var totalIngredients = JSON.parse(localStorage.getItem("ingredientList"));

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
$(document).on("click", "button.delete", function(event) {
    event.preventDefault;
    var ingredientList = JSON.parse(localStorage.getItem("ingredientList"));
    var currentIndex = $(this).attr("data-index");

    ingredientList.splice(currentIndex, 1);
    foods = ingredientList;

    localStorage.setItem("ingredientList", JSON.stringify(ingredientList));


    addIngredient();
});


// EVENT LISTENER ON ADD INGREDIENT BUTTON

$("#addToListBtn").on("click", function(event) {


    event.preventDefault();

    // Set variable to input value of ingredient form
    var val = $("input[type='text']").val().trim();

    // Clearing form value
    $("#addIngredientForm").val("");

    $("#ingredientPush").show();
    // 
    foods.push(val);
    localStorage.setItem("ingredientList", JSON.stringify(foods));


    //EXECUTES addIngredient F(x)
    addIngredient();

    console.log(foods);

});


$("#addIngredientForm").keyup(function(event) {
    // event.preventDefault();
    if (event.keyCode == 13) {
        $("#addToListBtn").click();

    }
});

// DISPLAY RECIPE FUNCTION To be called on FIND RECIPE EVENT LISTENER

function displayRecipe() {


    var apiKey = "c5f6c9518c5a1d52b477a875b36b4f47";
    // var searchItem = recipeSearch;

    // var queryURL = "https://food2fork.com/api/search?key=" + apiKey + "&q=" + foods + "&count=6" + "&callback=json"; //search term
    var queryURL = "https://food2fork-server.herokuapp.com/api/search?key=" + apiKey + "&q=" + foods + "&count=6"; //search term

    $.ajax({
        url: queryURL,
        method: "GET",
    })
    .done(function(response) {
        // parsing response to create JSON object
        // && creating variable for object
        // debugger

        var responseJSON = JSON.parse(response);
        console.log(responseJSON);
        // console.log(response);
        // console.log(typeof response)
        console.log("queryURL-enabled")
        // console.log("---------")
        // console.log(queryURL);
        // console.log("queryURL-disabled")
        console.log("---------");
        console.log(queryURL);



        for (var i = 0; i < 7; i++) {

            // console.log(responseJSON.recipes[i].title);

            // Hyperlink to site
            var recipeURL = responseJSON.recipes[i].source_url;

            // Declaring variable for title of recipe
            var title = responseJSON.recipes[i].title;
            $('.video' + i).append('<a class="videoHeader" href="' + recipeURL + '" target=_blank><div id="vid_title"><h5>' + title + '</h5></div></>');

            // Recipe Title & RecipeURL Test
            console.log("Recipe Title " + i + ": " + title);
            console.log("Recipe link " + i + ": " + recipeURL);

            var userSearch = title;
            console.log('user search: ' + userSearch);

            getVideo(userSearch, i);
        }
    });
};

function getVideo(title, index) {
    var key = "AIzaSyD3EEt-S9l6v2SWmsHC8mXGPcvG_Xtb6FY";
    var queryURL = "https://www.googleapis.com/youtube/v3/search?key=" + key;

    var parameters = $.param({
        maxResults: 6,
        part: "snippet",
        q: title
    });

    $.ajax({
        method: "GET",
        url: "https://www.googleapis.com/youtube/v3/search?" + parameters + "&key=" + key,
        //this url below is the one
        //https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyD3EEt-S9l6v2SWmsHC8mXGPcvG_Xtb6FY&q=keyboart+cat

    }).done(function(response) {

        for (var j = 0; j < 1; j++) {
            // console.log(response.items[i].id.videoId);
            var currentVideoId = response.items[j].id.videoId;
            console.log(currentVideoId);

            var embedURL = "https://www.youtube.com/embed/";

            var videoTitle = response.items[j].snippet.title;

            var titlHeading = $('<h3>' + videoTitle + '</h3>');

            var iframe = $('<iframe id="player" type="text/html" width="220" height="115" src="' + embedURL + currentVideoId + '" frameborder="0"></iframe>');

            $('.video' + index).append(iframe);

        }
    });
}



// EVENT LISTENER ON FIND RECIPE BUTTON
$("#recipeFinderBtn").on("click", function(event) {

    // console.log(parseArray);
    event.preventDefault();

    $('#ingredientPush').empty();

    //Shows .recipe div

    $(".recipes").show();
    $("#ingredientPush").hide();



    displayRecipe();
    // console.log(foods);
    // foods = [];

    var emptyArray = [];
    localStorage.setItem("ingredientList", JSON.stringify(emptyArray));


    $('.videoHeader').each(function() {
        var $this = $(this);
        $this.css('margin-top', $this.parent().height() - $this.height())
    });

});
