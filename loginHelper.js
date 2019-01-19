//Custom modules
const Database = require("./database.js");

//npm modules
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const saltRounds = 12;

/* Helper functions */

//Return value: A Promise which resolves to a boolean
function checkPassword(password, hash)
{
	return bcrypt.compare(password, hash).then(res => res);
}

//Return value: A string
function asyncKeyGen(type)
{
	let attempts = 0;
	while (attempts < 50)
	{
		let key = crypto.randomBytes(24).toString('hex');
		let entity = {};
		/*switch (type)
		{
			case "session":
				entity = await Database.findActiveSession("key", key);
				break;
			case "reset":
				entity = await Database.findResetRequest("key", key);
				break;
			case "verification":
				entity = await Database.findVerificationRequest("key", key);
				break;
			default:
				console.log("ERROR: asyncKeyGen() - Invalid type.");
				break;
		}

		if (entity === null)*/
		return key;
		attempts++;
	}
}

/* Exported functions */

async function asyncLogIn(req, res)
{
	let body = req.body;
	let user = await Database.findUser("email", body.email);
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

	/*let key = await asyncKeyGen("session");
	asyncActiveSessionGen(key, user._id, user.userInfo);

	res.cookie("loginKey", key);*/
	res.send({ msg: "ok" });
}

module.exports.asyncLogIn = asyncLogIn;
