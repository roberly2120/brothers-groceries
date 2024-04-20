To-Do 
[x] page to view and edit list of recipes
    [x] page to view list of recipes
    [x] ability to click 'view' and be taken to a Recipe page
    [x] on Recipe page, ability to edit ingredients
[x] Footer. subtle and with a big enough top margin
[ ]

[ ] need to do input correction for recipes. eliminate white space before and after ingredients and name, capitalize first letter in each ingredient work that's not 'of' 'and' etc...

[ ] home page should show current week worth of recipes, or a button to build out the week if no current recipes exist
    johno needs to be able to select a recipe for each day of the week. 
        need a page for 'this week' selection. 
        slect day by day for monday through sunday.
        need to include a way for johno to go back a day at a time if he changes his mind. can start with a full reset if need-be
        send monday through sunday selections in an object to firestore
        tally up all ingredients in all recipes from monday through sunday
        send this to the backend with a date stamp. 
        
[ ] page for 'this week's ingredients with ability to check whether johno already has them
[ ] johno needs to be able to jump right to this page. check server for ingredient list within object matching the week-start date. if none, just display 'you haven't chosen recipes for this week yet! and a button navigating the user to that page'

[ ] maybe build a pin-number password page? or look into one time authorization



maybe build out a recipe list as johno starts to use it and eventually have him selecting ingredients from a list, organized by type. Then it would be easier to tell him if an ingredient is required for more than one recipe this week THIS IS DONE EXCEPT FOR ORGANIZATION


notes:
    - in NewRecipeForm I am fetching only the one document for previousIngredients for johno's use. so if I want to scale for more users, this will need to be adjusted