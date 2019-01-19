//Custom modules
const LoginHelper = require("./loginHelper.js");

function createEndpoints(app)
{
	app.post('/login', function(req, res)
	{
		console.log("Received POST request from client! (login)");
		LoginHelper.asyncLogIn(req, res);
	});
}

module.exports.createEndpoints = createEndpoints;
