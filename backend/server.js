const http = require('http');
/**
 * Imports the main application module.
 */
const app = require('./app');
// const dotenv = require('dotenv');
const port = process.env.PORT || 3000;

const server = http.createServer(app);


server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
