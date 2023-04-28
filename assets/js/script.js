// main function that only runs when the DOM is ready 
// CURRENTLY NOT DONE WITH THIS FUNCTION
$(document).ready(function() {
    // This code handles the form submission for the sidebar input
    $('#recipeForm').submit(function(event) {
        event.preventDefault();
        
        // Gets the value of the input
       var ingredient = $('#ingredientInput').val();
        // ajax call to request data from edamam
       $.get('https://api.edamam.com/search', {
        q: ingredient,
        app_id: 'aa26a8c0', 
        app_key: '4e5724065c8d4517c49380b4618935d5',	
       }, function(data) {
        var recipes = data.hits;

        for (var i = 0; i < recipes.length; i++) {
            var recipe = recipes[i].recipe;
            console.log('Recipe:', recipe.label);
        }
       });
       $('#ingredientInput').val('');
    });
}); 