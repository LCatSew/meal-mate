// main function that only runs when the DOM is ready
// CURRENTLY NOT DONE WITH THIS FUNCTION
$(document).ready(function () {
  var searchBox = $("#searchInput");

  $("#startButton").click(function () {
    $(".ui.sidebar").sidebar("toggle");
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
    // ajax call to request data from edamam
    $.ajax("https://api.edamam.com/search", {
      data: {
        q: searchInput,
        app_id: "aa26a8c0",
        app_key: "4e5724065c8d4517c49380b4618935d5",
      },
      success: function (data) {
        var recipes = data.hits;

        for (var i = 0; i < recipes.length; i++) {
          var recipe = recipes[i].recipe;
          console.log("Recipe:", recipe.label);
        }
      },
    });
    $("#searchInput").val();
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
  localStorage.setItem("savedHistory", JSON.stringify(searchHistory));

  // ====================================
  //      Gage's JavaScript portion
  // ====================================
  //         TheCocktailDB API
  // https://www.thecocktaildb.com/api.php
  // ------------------------------------

  // ------------------------------------
  // Search
  // ------------------------------------
  var testMenuDiv = document.getElementById("testMenu");

  // ------------------------------------
  //             Test menu
  // ------------------------------------
  // Enable the test menu:
  testNav = document.getElementById("testMenu");

  $("#searchButton").click(function () {
    var resultGet = $("#searchInput").val();

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

      testMenuDiv.style.backgroundColor = "black";
      testMenuDiv.style.color = "white";

      // Menu Options:
      var testCardEl = document.getElementById("testCard");
      $(testCardEl).click(function () {
        console.log("Test card clicked!");

        newCard(
          "Meatloaf",
          "./assets/img/dummy.png",
          "Grape juice",
          "./assets/img/dummy.png"
        );
      });

      var clearHistoryEl = document.getElementById("testClearHis");
      $(clearHistoryEl).click(function () {
        console.log("History cleared!");
        searchHistory = [];
        console.log("The array is now:" + searchHistory);
        saveResults();
      });
    }
  });

  var testSearchEl = document.getElementById("testSearch");
  var testHisEl = document.getElementById("testHistory");
  var testCHEl = document.getElementById("testClearHis");
  var testDEl = document.getElementById("testDetails");

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

    $("#searchResults").append(cardHTML);
  }
  // ------------------------------------
  //          Pairing Function
  // ------------------------------------
  // Creates a pairing based on the
  // arguments given to the function.
  // ------------------------------------
  function pairCocktail(cuisine) {
    // Region
    // Similar flavor
    // Similar ingredient
    // Contrast pairing
  }
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
        searchHistory.splice(i, 1);
        searchHistory.unshift(input);
      } else {
        return false;
      }
    }
  }
  // ------------------------------------
  //          Details Modal
  // ------------------------------------
  // Returns details of the recipe and
  // pairing. Details will come from
  // pairCocktail().
  // ------------------------------------

  $("#searchHistory").empty();

  searchHistory.forEach(function (item) {
    var historyBtn = $("<button>")
      .addClass("search-history-btn")
      .text(item)
      .attr("data-search", item);
    $("#searchHistory").append(historyBtn);
  });
}

$(".longer.modal").modal("show");
