const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect('mongodb://localhost:27017/recipe-app')
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    let newRecipe = {title: 'Butterscotch-Cinnamon Pie', level: 'Easy Peasy', ingredients: ['55 g butter', '475 ml whole milk', '240 ml heavy cream', '150 g brown sugar'], cuisine: 'Fictional', dishType: 'breakfast', creator: 'Fat Joe'};
      Recipe.create(newRecipe)
      .then((recipeCreated) => console.log(recipeCreated))
      .catch((err) => console.log(err));
    })
  
 .then(() => {
  let receitas = data;
  return Recipe.insertMany(receitas)

 })

 .then(recipe =>{
  const update = Recipe.updateOne({title: "Rigatoni alla Genovese"},{duration: 100})
  console.log('the recipe has been update')
  return update
})

/*  .then((createdRecipes) => {

      let query = { title: 'Rigatoni alla Genovese' };
      Recipe.findOne({ title: 'Rigatoni alla Genovese' }, {duration: 100})
      .then((founded) => console.log(founded))
      .catch(error => {
        console.error('Error updating');
      });



  }) */
  .then(() => {
    let query = { title: 'Carrot Cake' };
    Recipe.deleteOne(query)
    .then(() => console.log('Deleted!'))
    .catch(error => {
      console.error('Error deleting');

  })



  .catch(error => {
    console.error('Error connecting to the database', error);
  });
