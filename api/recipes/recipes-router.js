const router = require('express').Router();
const Recipe = require('./recipes-model')

router.get('/:recipe_id', (req, res, next)=>{
   Recipe.getRecipeById(req.params.recipe_id)
      .then(resource =>{
         // throw new Error('arghhh')
         res.status(200).json(resource)
      })
      .catch(err=>{
         next(err)
      })
})

router.use((err, req, res, next) => { // eslint-disable-line
   res.status(500).json({
      // customMessage: 'done fucked up sir',
     message: err.message,
   //   stack: err.stack,
   });
 });
 
module.exports = router;