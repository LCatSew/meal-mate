// main function that only runs when the DOM is ready 
// CURRENTLY NOT DONE WITH THIS FUNCTION
$(document).ready(function() {
    // This code handles the form submission for the sidebar input
    $('#recipeForm').submit(function(event) {
        event.preventDefault();
        
        // Gets the value of the input
       var ingredient = $('#ingredientInput').val();

       
       
    })
});


// Gage's additions :-)

// An array keeping the history
var searchHistory = [];

// Search button
var searchBttn = document.querySelector('#searchButton');
var searchBox = document.querySelector('#searchInput');
var resultsBox = document.querySelector('#searchHistory');


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



// Sidebar getHistory
function saveResults(){
  // Save the string in LocalStorage
  localStorage.setItem('savedHistory', searchHistory);

  // I would really like this to update the DOM when ran :-)
};
