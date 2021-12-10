// how should these tables be created/destroyed

exports.up = async function(knex) {
  await knex.schema
  // what order should the tables be created
  // start with tables without FK's 

  // first one has least to do with the others
   .createTable('recipes', tbl =>{
      tbl.increments('recipe_id') // colm name that's goof for the whole db
      tbl.string('recipe_name', 200).notNullable().unique()
   })
   // next one only have one connection too
   .createTable('ingredients', tbl =>{
      tbl.increments()
   })
   // this one needs only the recipes
   .createTable('steps', tbl =>{
      tbl.increments()
   })
   // this one needs all of them
   .createTable('steps_ingredients', tbl =>{
      tbl.increments()
   })
};

// needs to be the exact reverse as the one above
exports.down = async function(knex) {
   await knex.schema
   .dropTableIfExists('steps_instructions')
   .dropTableIfExists('steps')
   .dropTableIfExists('ingredients')
   .dropTableIfExists('recipes')
};
