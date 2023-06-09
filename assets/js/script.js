// main function that only runs when the DOM is ready
// CURRENTLY NOT DONE WITH THIS FUNCTION
$(document).ready(function () {
  var searchBox = $("#searchInput");

  $('#toggleSidebar').click(function () {
    $('.ui.sidebar').sidebar('toggle');
  })

  $("#startButton").click(function () {
    $(".ui.sidebar").sidebar("toggle");
  });

  // Hide landing page and show the rest of the content
  $("#searchButton").click(function () {
    $(".landing-page").hide();
    $("#toggleSidebar").show();
    $(".pusher").show();
  });


  // Hide landing page and show the rest of the content
  $("#searchButton").click(function () {
    $(".landing-page").hide();
    $("#toggleSidebar").show();
    $(".pusher").show();

  });

  // This code handles the form submission for the sidebar input
  $("#recipeForm").submit(function (event) {
    event.preventDefault();
    var searchInput = searchBox.val();

    var result = {}; // Important!! Empty object to put cocktail in. Best to rename it later.
    console.log("Test search clicked!");

    // Temp serach term solely for test button
    // ajax call to request data from edamam
    $.ajax('https://api.edamam.com/search', {
      data: {
        q: searchInput,
        app_id: 'aa26a8c0',
        app_key: '4e5724065c8d4517c49380b4618935d5'
      },
      success: function (data) {
        $("#searchResults").html("");
        var recipes = data.hits;

        // Iterates through recipes to put each recipe into pairCocktail
        // to get search query for TCDB.
        for (var i = 0; i < recipes.length; i++) {
          var recipe = recipes[i].recipe;
          dataCocktail = pairCocktail(recipe);

          // If statement to see if it needs to perform search or to get random.
          if (dataCocktail != "random") {
            $.ajax({
              url: 'https://www.thecocktaildb.com/api/json/v1/1/search.php',
              data: { s: dataCocktail },
              success: function (data) {
                var drinks = data.drinks;
                var randomDrink = Math.floor(Math.random() * drinks.length);
                result.title = drinks[randomDrink].strDrink;
                result.image = drinks[randomDrink].strDrinkThumb;

                for (var x = 0; x < recipes.length; x++) { // Had to do this since ajax is async, Might come up with better later
                  recipe = recipes[x].recipe;
                  console.log("Recipe label:");
                  var recipeTitle = recipe.label;
                  console.log(recipeTitle);
                  console.log("Recipe image:");
                  var recipeImage = recipe.image;
                  console.log(recipeImage);
                  dataCocktail = pairCocktail(recipe);

                  newCard(recipeTitle, recipeImage, result.title, result.image);

                }
              }
            });
          } else {
            $.ajax({
              url: 'https://www.thecocktaildb.com/api/json/v1/1/random.php',
              dataType: 'json',
              success: function (data) {
                var drinks = data.drinks;
                var randomDrink = Math.floor(Math.random() * drinks.length);
                var finalDrink = drinks[randomDrink].strDrink;

                result.title = drinks[randomDrink].strDrink;
                result.image = drinks[randomDrink].strDrinkThumb;

                for (var x = 0; x < recipes.length; x++) { // Refer to line 170
                  recipe = recipes[x].recipe;
                  console.log("Recipe label:");
                  var recipeTitle = recipe.label;
                  console.log(recipeTitle);
                  console.log("Recipe image:");
                  var recipeImage = recipe.image;
                  console.log(recipeImage);
                  dataCocktail = pairCocktail(recipe);

                  newCard(recipeTitle, recipeImage, result.title, result.image);

                }
              }
            });
          }
        }
      }
    });

    $("#searchInput").val();
  });



  // This code handles the history button
  $('#searchHistory').on('click', '.search-history-btn', function () {
    var searchInput = $(this).text();


    var result = {}; // Important!! Empty object to put cocktail in. Best to rename it later.

    // Temp serach term solely for test button
    // ajax call to request data from edamam
    $.ajax('https://api.edamam.com/search', {
      data: {
        q: searchInput,
        app_id: 'aa26a8c0',
        app_key: '4e5724065c8d4517c49380b4618935d5'
      },
      success: function (data) {
        $("#searchResults").html("");
        var recipes = data.hits;

        // Iterates through recipes to put each recipe into pairCocktail
        // to get search query for TCDB.
        for (var i = 0; i < recipes.length; i++) {
          var recipe = recipes[i].recipe;
          dataCocktail = pairCocktail(recipe);

          // If statement to see if it needs to perform search or to get random.
          if (dataCocktail != "random") {
            $.ajax({
              url: 'https://www.thecocktaildb.com/api/json/v1/1/search.php',
              data: { s: dataCocktail },
              success: function (data) {
                var drinks = data.drinks;
                var randomDrink = Math.floor(Math.random() * drinks.length);
                result.title = drinks[randomDrink].strDrink;
                result.image = drinks[randomDrink].strDrinkThumb;

                for (var x = 0; x < recipes.length; x++) { // Had to do this since ajax is async, Might come up with better later
                  recipe = recipes[x].recipe;
                  console.log("Recipe label:");
                  var recipeTitle = recipe.label;
                  console.log(recipeTitle);
                  console.log("Recipe image:");
                  var recipeImage = recipe.image;
                  console.log(recipeImage);
                  dataCocktail = pairCocktail(recipe);

                  newCard(recipeTitle, recipeImage, result.title, result.image);

                }
              }
            });
          } else {
            $.ajax({
              url: 'https://www.thecocktaildb.com/api/json/v1/1/random.php',
              dataType: 'json',
              success: function (data) {
                var drinks = data.drinks;
                var randomDrink = Math.floor(Math.random() * drinks.length);
                var finalDrink = drinks[randomDrink].strDrink;

                result.title = drinks[randomDrink].strDrink;
                result.image = drinks[randomDrink].strDrinkThumb;

                for (var x = 0; x < recipes.length; x++) { // Refer to line 170
                  recipe = recipes[x].recipe;
                  console.log("Recipe label:");
                  var recipeTitle = recipe.label;
                  console.log(recipeTitle);
                  console.log("Recipe image:");
                  var recipeImage = recipe.image;
                  console.log(recipeImage);
                  dataCocktail = pairCocktail(recipe);

                  newCard(recipeTitle, recipeImage, result.title, result.image);

                }
              }
            });
          }
        }
      }
    });
  });

});

// Responses without this status will trigger error conditions
$.fn.api.settings.successTest = function (response) {
  return response.status == "OK";
};

// An array keeping the history
var searchHistory = [];

// Search button
var searchBttn = $("#searchButton");
var resultsBox = $("#searchHistory");

$("#searchButton").click(function () {
  var resultGet = $("#searchInput").val();

  if (searchHistory.length < 5) {
    searchHistory.push(resultGet);
  } else {
    searchHistory.shift();
    searchHistory.push(resultGet);
  }

  saveResults();
});

// Sidebar getHistory
function saveResults() {
  // Save the string in LocalStorage
  localStorage.setItem('savedHistory', JSON.stringify(searchHistory));

  $("#searchHistory").empty();

  searchHistory.forEach(function (item) {
    var historyBtn = $("<button>")
      .addClass("search-history-btn")
      .text(item)
      .attr("data-search", item);
    $("#searchHistory").append(historyBtn);
  });
};


// ------------------------------------
//        Create-a-card Function
// ------------------------------------
// Creates a new card based on the
// arguments given to the function.
// ------------------------------------
function newCard(cusineTitle, cuisineImage, wineTitle, wineImage) {
  var cardHTML = `
    <div class="card">
      <div class="ui divided equal width centered grid" id="card-grid">
        <div class="column">
          <img src="${wineImage}" class="ui fluid medium image ">
        </div>
        <div class="column">
          <img src="${cuisineImage}" class="ui fluid medium image ">
        </div>
      </div>
      <div class="content">
        <div class="header">${wineTitle}</div>
        <div class="meta">
          <a>goes well with ${cusineTitle}</a>
        </div>
      </div>
    </div>`;

  $('#searchResults').append(cardHTML);
};


// ------------------------------------
//          Pairing Function
// ------------------------------------
// Creates a pairing based on the
// arguments given to the function.
// ------------------------------------
//         TheCocktailDB API
// https://www.thecocktaildb.com/api.php
// ------------------------------------
function pairCocktail(cuisineData) {
  // function is expecting entire recipe object

  var chosenDrink = "";

  // Pairs with dishtype.
  // If dishtype is not present, it will return "random".
  // Will always return a string for TCDB search query.
  if (cuisineData.dishType[0] == "bread" || cuisineData.dishType[0] == "pizza" || cuisineData.dishType[0] == "sandwiches") {
    chosenDrink = "beer";
  } else if (cuisineData.dishType[0] == "alcohol cocktail" || cuisineData.dishType[0] == "drinks") {
    chosenDrink = "gin";
  } else if (cuisineData.dishType[0] == "biscuits and cookies") {
    chosenDrink = "port";
  } else if (cuisineData.dishType[0] == "cereals") {
    chosenDrink = "whiskey";
  } else if (cuisineData.dishType[0] == "condiments and sauces") {
    chosenDrink = "red";
  } else if (cuisineData.dishType[0] == "desserts" || cuisineData.dishType[0] == "ice cream and custard") {
    chosenDrink = "sweet";
  } else if (cuisineData.dishType[0] == "egg") {
    chosenDrink = "white";
  } else if (cuisineData.dishType[0] == "main course" || cuisineData.dishType[0] == "pasta" || cuisineData.dishType[0] == "seafood" || cuisineData.dishType[0] == "side dish") {
    chosenDrink = "red";
  } else if (cuisineData.dishType[0] == "pancake") {
    chosenDrink = "brandy";
  } else if (cuisineData.dishType[0] == "pastry" || cuisineData.dishType[0] == "pies and tarts") {
    chosenDrink = "wine";
  } else if (cuisineData.dishType[0] == "preps") {
    chosenDrink = "vodka";
  } else if (cuisineData.dishType[0] == "preserve") {
    chosenDrink = "liqueur";
  } else if (cuisineData.dishType[0] == "salad" || cuisineData.dishType[0] == "starter") {
    chosenDrink = "white";
  } else if (cuisineData.dishType[0] == "soup" || cuisineData.dishType[0] == "special occasions") {
    chosenDrink = "sherry";
  } else if (cuisineData.dishType[0] == "sweets") {
    chosenDrink = "port";
  } else {
    chosenDrink = "random";
  };

  return chosenDrink;
};