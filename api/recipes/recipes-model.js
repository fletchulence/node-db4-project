module.exports = {
   getRecipeById
}

function getRecipeById(recipe_id){
   return Promise.resolve(`awesome recipe with id ${recipe_id}`)
}