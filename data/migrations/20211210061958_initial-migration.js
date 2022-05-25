// how should these tables be created/destroyed
exports.up = async function(knex) {
  await knex.schema
  // what order should the tables be created
  // start with tables without FK's 

  // first one has least to do with the others
   .createTable('recipes', tbl =>{
      tbl.increments('recipe_id') // colm name that's good for the whole db
      tbl.string('recipe_name', 200).notNullable().unique()
   })
   // next one only have one connection too
   .createTable('ingredients', tbl =>{
      tbl.increments('ingredient_id')
      tbl.string('ingredient_name', 200).notNullable().unique()
      tbl.string('ingredient_unit', 50)
   })
   // this one needs only the recipes
   .createTable('steps', tbl =>{
      tbl.increments('step_id')
      tbl.string('step_inst', 200).notNullable()
      tbl.integer('step_number').notNullable()
      tbl.integer('recipe_id')
         .unsigned()
         .notNullable()
         .references('recipe_id').inTable('recipes')
         // in terms of conserving integrity of the recipe - we dont want anyone else to be abel to edit or delete
         .onDelete('RESTRICT')
         .onUpdate('RESTRICT')
   })
      // this one needs all of them
      //recipe and ingredients are indirect so we have to relate them thru steps
   .createTable('steps_ingredients', tbl =>{
      tbl.increments('steps_ingredients_id')
      tbl.float('quantity').notNullable()
      // joining the two tables here
      // this is step
      tbl.integer('step_id')
         .unsigned()
         .notNullable()
         .references('step_id').inTable('steps')
         .onDelete('RESTRICT')
         .onUpdate('RESTRICT')
      // this is ingredient
      tbl.integer('ingredient_id')
         .unsigned()
         .notNullable()
         .references('ingredient_id').inTable('ingredients')
         .onDelete('RESTRICT')
         .onUpdate('RESTRICT')
   })
};

// needs to be the exact reverse as the one above
exports.down = async function(knex) {
   await knex.schema
   .dropTableIfExists('steps_ingredients')
   .dropTableIfExists('steps')
   .dropTableIfExists('ingredients')
   .dropTableIfExists('recipes')
};
