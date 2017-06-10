    function displayRecipe() {


        var apiKey = "c5f6c9518c5a1d52b477a875b36b4f47";
        // var searchItem = recipeSearch;

        var ingredient = $('#ingredient-input').val().trim();

        var completedIngredients; //

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
                        var imageHref = responseJSON.recipes[i].source_url;

                        // Recipe Title Test
                        console.log("Recipe Title: " + title);
                        console.log("Recipe link: " + imageHref);



                    }



                    // Declaring varible for image url
                    // var imageUrl = responseJSON.recipes[0].image_url;
                    // console.log(responseJSON.recipes[0].image_url);


                    // Append title
                    // $("#recipe-view").append("<h4>" + title + "</h4>");

                    //Append Link with Image
                    // $("#recipe-view").append("<a href =" + imageHref + ">" + "<img src=" + imageUrl + ">" + "</a>");

                    $("#find-recipe").on("click", function(event) {
                        event.preventDefault();
                        // This line grabs the input from the textbox
                        var ingredient = $("#ingredient-input").val().trim();

                        displayRecipe();


                    });

