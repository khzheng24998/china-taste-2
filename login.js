//Custom modules
const LoginHelper = require("./loginHelper.js");

function createEndpoints(app)
{
	app.post('/log-in', function(req, res)
	{
		console.log("Received POST request from client! (log-in)");
		LoginHelper.asyncLogIn(req, res);
	});

	app.post('/log-out', function(req, res)
	{
		console.log("Received POST request from client! (log-out)");
		LoginHelper.asyncLogOut(req, res);
	});

	app.post('/get-session-info', function(req, res)
	{
		console.log("Received POST request from client! (get-session-info)");
		LoginHelper.asyncGetSessionInfo(req, res);
	});

	app.post('/create-account', function(req, res)
	{
		console.log("Received POST request from client! (create-account)");
		LoginHelper.asyncCreateAccount(req, res);
	});

	app.post('/send-reset-email', function(req, res)
	{
		console.log("Received POST request from client! (send-reset-email)");
		LoginHelper.asyncSendResetLink(req, res);
	});

	app.post('/get-menu', function(req, res)
	{
		console.log("Received POST request from client! (get-menu)");
		LoginHelper.asyncFetchMenu(req, res);
	});

}

module.exports.createEndpoints = createEndpoints;
