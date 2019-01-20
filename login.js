//Custom modules
const LoginHelper = require("./loginHelper.js");

function createEndpoints(app)
{
	app.post('/log-in', function(req, res)
	{
		console.log("Received POST request from client! (login)");
		LoginHelper.asyncLogIn(req, res);
	});

	app.post('/get-session-info', function(req, res)
	{
		console.log("Received POST request from client! (get-session-info)");
		LoginHelper.asyncGetSessionInfo(req, res);
	});

}

module.exports.createEndpoints = createEndpoints;
