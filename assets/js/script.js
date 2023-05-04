// main function that only runs when the DOM is ready 
// CURRENTLY NOT DONE WITH THIS FUNCTION
$(document).ready(function () {

  var searchBox = $('#searchInput');

  $('#toggleSidebar').click(function () {
    $('.ui.sidebar').sidebar('toggle');
  })

  // This code handles the form submission for the sidebar input
  $('#recipeForm').submit(function (event) {
    event.preventDefault();
    var searchInput = searchBox.val();
    // ajax call to request data from edamam
    $.ajax('https://api.edamam.com/search', {
      data: {
        q: searchInput,
        app_id: 'aa26a8c0',
        app_key: '4e5724065c8d4517c49380b4618935d5'
      },
      success: function (data) {
        var recipes = data.hits;

        for (var i = 0; i < recipes.length; i++) {
          var recipe = recipes[i].recipe;
          console.log('Recipe:', recipe.label);
          console.log(recipe);
        }
      }
    });
    $('#searchInput').val();

  });
});

// An array keeping the history
var searchHistory = [];

// Search button
var searchBttn = $('#searchButton');
var resultsBox = $('#searchHistory');

$('#searchButton').click(function () {
  var resultGet = $('#searchInput').val();

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
      .addClass("ui button search-history-btn")
      .text(item)
      .attr("data-search", item);
    $("#searchHistory").append(historyBtn);
  });
};


// ====================================
//      Gage's JavaScript portion
// ====================================
// ------------------------------------
// Search
// ------------------------------------
var testMenuDiv = document.getElementById("testMenu");


// ------------------------------------
//             Test menu
// ------------------------------------
// Enable the test menu:
testNav = document.getElementById('testMenu');

$('#searchButton').click(function () {
  var resultGet = $('#searchInput').val();

  if (resultGet === "test") {
    console.log("Test menu has been enabled!");
    var menuHTML = `
     <p>Test menu:</p>
      <a id="testCard" href="#">Create a card</a>
      <a id="testSearch" href="#">Search Results</a>
      <a id="testHistory" href="#">Add to history</a>
      <a id="testClearHis" href="#">Clear history</a>
      <a id="testDetails" href="#">Modal Toggle</a>`;

    var testMenuDiv = document.getElementById("testMenu");
    testMenuDiv.innerHTML = menuHTML;

    testMenuDiv.style.backgroundColor = 'black';
    testMenuDiv.style.color = 'white';

    // Menu Options:
    var testCardEl = document.getElementById('testCard');
    $(testCardEl).click(function () {
      console.log("Test card clicked!");
      newCard("Meatloaf", "./assets/img/dummy.png", "Grape juice", "./assets/img/dummy.png")
    });

    var searchCardEl = document.getElementById('testSearch');
    $(searchCardEl).click(function () {



      var result = {};



      console.log("Test card clicked!");

      var searchInput = "pizza";
      // ajax call to request data from edamam
      $.ajax('https://api.edamam.com/search', {
        data: {
          q: searchInput,
          app_id: 'aa26a8c0',
          app_key: '4e5724065c8d4517c49380b4618935d5'
        },
        success: function (data) {
          var recipes = data.hits;

          for (var i = 0; i < recipes.length; i++) {
            var recipe = recipes[i].recipe;
            dataCocktail = pairCocktail(recipe);


            if (dataCocktail != "random") {
              $.ajax({
                url: 'https://www.thecocktaildb.com/api/json/v1/1/search.php',
                data: { s: dataCocktail },
                success: function (data) {
                  console.log("In the if statement")
                  console.log(recipeTitle)
                  console.log(i);

                  var drinks = data.drinks;
                  console.log(drinks);
                  var randomDrink = Math.floor(Math.random() * drinks.length);
                  result.title = drinks[randomDrink].strDrink;
                  result.image = drinks[randomDrink].strDrinkThumb;

                  for (var x = 0; x < recipes.length; x++) {
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
                  console.log("In the if statement");
                  console.log(recipeTitle);
                  console.log(i);


                  var drinks = data.drinks;
                  var randomDrink = Math.floor(Math.random() * drinks.length);
                  var finalDrink = drinks[randomDrink].strDrink;

                  result.title = drinks[randomDrink].strDrink;
                  result.image = drinks[randomDrink].strDrinkThumb;

                  for (var x = 0; x < recipes.length; x++) {
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




    var clearHistoryEl = document.getElementById('testClearHis');
    $(clearHistoryEl).click(function () {
      console.log("History cleared!");
      searchHistory = [];
      console.log("The array is now:" + searchHistory);
      saveResults();
    });
  }
});


var testSearchEl = document.getElementById('testSearch');
var testHisEl = document.getElementById('testHistory');
var testCHEl = document.getElementById('testClearHis');
var testDEl = document.getElementById('testDetails');


// ------------------------------------
//        Create-a-card Function
// ------------------------------------
// Creates a new card based on the
// arguments given to the function.
// ------------------------------------
function newCard(cusineTitle, cuisineImage, wineTitle, wineImage) {
  var cardHTML = `
  <div class="card">
    <div class="ui divided equal width grid">
      <div class="column">
        <img src="${cuisineImage}" class="ui fluid image mini">
      </div>
      <div class="column">
        <img src="${wineImage}" class="ui fluid image mini">
      </div>
    </div>
    <div class="content">
      <div class="header">${wineTitle}</div>
      <div class="meta">
        <a>goes well with ${cusineTitle}</a>
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
// var resultCocktail = {};


function pairCocktail(cuisineData) {
  var chosenDrink = "";

  console.log(cuisineData.dishType);
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


  //if (chosenDrink != "random") {
  // getCocktail(chosenDrink);

  //} else {
  // getRandom();

  //}

  return chosenDrink;
};


// Please remove in final ---- move to document ready function
/* 
async function getCocktail(chosenDrink) {
  var data = await $.ajax({
    url: 'https://www.thecocktaildb.com/api/json/v1/1/search.php',
    data: { s: chosenDrink }
  });

  var drinks = data.drinks;
  var randomDrink = Math.floor(Math.random() * drinks.length);
  resultCocktail.title = drinks[randomDrink].strDrink;
  resultCocktail.image = drinks[randomDrink].strDrinkThumb;

  cocktailTitle = resultCocktail.title;
  cocktailImg = resultCocktail.image;

  return resultCocktail;
}
*/

// Please remove in final ---- move to document ready function
/* 
async function getRandom() {
  var response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
  var data = await response.json();

  var drinks = data.drinks;
  var randomDrink = Math.floor(Math.random() * drinks.length);
  var finalDrink = drinks[randomDrink].strDrink;

  resultCocktail.title = drinks[randomDrink].strDrink;
  resultCocktail.image = drinks[randomDrink].strDrinkThumb;

  cocktailTitle = resultCocktail.title;
  cocktailImg = resultCocktail.image;

  return resultCocktail;
};
*/


// ------------------------------------
//          Duplicate Check
// ------------------------------------
// Search function that returns true
// or false if there is a duplicate in
// the array searchHistory.
// ------------------------------------
function duplicateCheck(input) {
  for (i = 0; i < searchBox.History.length; i++) {
    if (input === searchHistory[i]) {
      searchHistory.splice(i, 1)
      searchHistory.unshift(input);
    }
    else {
      return false;
    }
  }
};
// ------------------------------------
//          Details Modal
// ------------------------------------
// Returns details of the recipe and
// pairing. Details will come from
// pairCocktail().
// ------------------------------------