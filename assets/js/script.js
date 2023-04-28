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


// Gage's additions :-)

// An array keeping the history
var searchHistory = [];

// Search button
var searchBttn = document.querySelector('#searchButton');
var searchBox = document.querySelector('#searchInput');
var resultsBox = document.querySelector('#searchHistory');

// Pushes history from input to array
// Keeps array at 5 max
searchBttn.addEventListener('click', function() {
  resultGet = searchBox.value;
  if (searchHistory.length < 5) {
    searchHistory.push(resultGet);
  } else {
    searchHistory.shift();
    searchHistory.push(resultGet);
  }

  saveResults();
});


// Sidebar toggle
// https://semantic-ui.com/modules/sidebar.html
$('.ui.sidebar')
  .sidebar('toggle')
;



// Sidebar history
function saveResults(){
  //Resets the funny history area
  resultsBox.innerHTML = "";

  // Save the string in LocalStorage
  localStorage.setItem('savedHistory', searchHistory);

  // I would really like this to update the DOM when ran :-)
  for (i = 0; i < searchHistory.length; i++){
    console.log(i);
    var searchResult = document.createElement("p");
    searchResult.textContent = searchHistory[i];
    searchResult.classList.add("item");
    resultsBox.appendChild(searchResult);
  }
};

// History duplicate checker
// Totally broken rn... please ignore :(
function duplicateCheck(input){
  for (i = 0; i < searchBox.History.length; i++){
    if (input === searchHistory[i]){
      searchHistory.splice(i,1)
      searchHistory.unshift(input);
    }
    else{
      return false;
    }
  }
}