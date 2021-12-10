const router = require('express').Router();

router.get('/', (req, res, next)=>{
   console.log('router is routed')
})

router.use((err, req, res, next) => { // eslint-disable-line
   res.status(500).json({
     message: err.message
   //   stack: err.stack,
   });
 });
 
module.exports = router;