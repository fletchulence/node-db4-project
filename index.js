require('dotenv').config()

const server = require('./api/server.js');

const port = process.env.PORT || 9007;

server.listen('/', (req, res)=>{
   console.log(`\n API running on port ${port}`)
})