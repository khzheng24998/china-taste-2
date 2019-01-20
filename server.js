const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const server = express();

//For parsing JSON
const bodyParser = require('body-parser');
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

//For parsing cookies
const cookieParser = require('cookie-parser');
server.use(cookieParser());

//Custom modules
const Login = require("./login.js");

app.prepare().then(() =>
{
  server.get('*', (req, res) => { return handle(req, res) });

	Login.createEndpoints(server);

  server.listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  });

}).catch((ex) => {
  	console.error(ex.stack);
  	process.exit(1);
});
