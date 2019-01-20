//Custom modules
const Database = require("./database.js");

//npm modules
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const saltRounds = 12;

/* Helper functions */

//Return value: A Promise which resolves to a boolean
function checkPassword(password, hash) { return bcrypt.compare(password, hash).then(res => res); }

//Return value: None
function sessionGen(key, user)
{
	let session = {
		"key": key,
		"userId": user._id,
		"firstName": user.userInfo.firstName,
		"lastName": user.userInfo.lastName,
		"email": user.userInfo.email
	};

	Database.insertDoc("activeSessions", session);
}

//Return value: A string
async function asyncKeyGen(type)
{
	let attempts = 0;
	while (attempts < 10)
	{
		let key = crypto.randomBytes(24).toString('hex');
		let entity = {};
		switch (type)
		{
			case "session":
				entity = await Database.findActiveSession(key);
				break;
			case "reset":
				entity = await Database.findResetRequest(key);
				break;
			case "verification":
				entity = await Database.findVerificationRequest(key);
				break;
			default:
				console.log("ERROR: asyncKeyGen() - Invalid type.");
				break;
		}

		if (entity === null)
			return key;

		attempts++;
	}
}

/* Exported functions */

async function asyncLogIn(req, res)
{
	let body = req.body;
	let user = await Database.findUser(body.email);
	if (user === null)
	{
		res.send({ msg: "invalid-credentials" });
		return;
	}

	let valid = await checkPassword(body.password, user.userInfo.password);
	if (!valid)
	{
		res.send({ msg: "invalid-credentials" });
		return;
	}

	let key = await asyncKeyGen("session");
	sessionGen(key, user);
	res.cookie("loginKey", key);
	res.send({ msg: "ok" });
}

async function asyncLogOut(req, res)
{
	let key = req.cookies.loginKey;
	let session = await Database.findActiveSession(key);
	if (session !== null)
	{
		Database.deleteActiveSession(session._id);
		res.clearCookie("loginKey");
		res.send({ "msg": "ok" });
		return;
	}

	res.send({ "msg": "error" });
}

async function asyncGetSessionInfo(req, res)
{
	let key = req.cookies.loginKey;
	let session = await Database.findActiveSession(key);
	if (session !== null)
		res.send({ "msg": "signed-in", "firstName": session.firstName, "lastName": session.lastName });
	else
		res.send({ "msg": "signed-out" });
}

module.exports.asyncLogIn = asyncLogIn;
module.exports.asyncLogOut = asyncLogOut;
module.exports.asyncGetSessionInfo = asyncGetSessionInfo;
