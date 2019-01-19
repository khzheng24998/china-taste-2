//Custom modules
const Database = require("./database.js");

//npm modules
const bcrypt = require("bcrypt");
const saltRounds = 12;

// Exported functions

async function asyncLogIn(req, res)
{
	let body = req.body;

	let user = await Database.findUser("email", body.email);
	if (user === null)
	{
		console.log("User not found!");
		res.send({ msg: "invalid-credentials" });
		return;
	}

	/*let validCredentials = await asyncComparePasswords(body.password, user.userInfo.password);
	if (!validCredentials)
	{
		res.send({ msg: "invalid-credentials" });
		return;
	}

	let key = await asyncKeyGen("session");
	asyncActiveSessionGen(key, user._id, user.userInfo);

	res.cookie("loginKey", key);*/
	res.send({ msg: "ok" });
}

module.exports.asyncLogIn = asyncLogIn;
