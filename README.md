To-Do 
[x] page to view and edit list of recipes
    [x] page to view list of recipes
    [x] ability to click 'view' and be taken to a Recipe page
    [x] on Recipe page, ability to edit ingredients
[x] Footer. subtle and with a big enough top margin
[ ]

[ ] home page should show current week worth of recipes, or a button to build out the week if no current recipes exist
    johno needs to be able to select a recipe for each day of the week. 
        need a page for 'this week' selection. 
        slect day by day for monday through sunday.
        need to include a way for johno to go back a day at a time if he changes his mind. can start with a full reset if need-be
        send monday through sunday selections in an object to firestore
        tally up all ingredients in all recipes from monday through sunday
        send this to the backend with a date stamp. 
        
[ ] page for 'this week's ingredients with ability to check whether johno already has them?



maybe build out a recipe list as johno starts to use it and eventually have him selecting ingredients from a list, organized by type. Then it would be easier to tell him if an ingredient is required for more than one recipe this week THIS IS DONE EXCEPT FOR ORGANIZATION


notes:
    - in NewRecipeForm i am fetching only the one document for previousIngredients for johno's use. so if you want to scale for more users, this will need to be adjusted