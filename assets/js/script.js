// main function that only runs when the DOM is ready 
// CURRENTLY NOT DONE WITH THIS FUNCTION
$(document).ready(function() {
 
    var searchBox = $('#searchInput');
 
    $('#toggleSidebar').click(function() {
        $('.ui.sidebar').sidebar('toggle');
    })

    // This code handles the form submission for the sidebar input
    $('#recipeForm').submit(function(event) {
        event.preventDefault();
        var searchInput = searchBox.val();
        // ajax call to request data from edamam
       $.ajax('https://api.edamam.com/search', {
        data: {
        q: searchInput,
        app_id: 'aa26a8c0', 
        app_key: '4e5724065c8d4517c49380b4618935d5'	
       },
       success: function(data) {
        var recipes = data.hits;

        for (var i = 0; i < recipes.length; i++) {
            var recipe = recipes[i].recipe;
            console.log('Recipe:', recipe.label);
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

$('#searchButton').click(function() {
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
function saveResults(){
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
