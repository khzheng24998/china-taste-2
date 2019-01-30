//Custom modules
const Database = require("./database.js");
const Email = require("./email.js");

//npm modules
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const saltRounds = 12;

/* Helper functions */

//Return value: A Promise which resolves to a boolean (true if password matches, false otherwise)
function checkPassword(password, hash)
{
	return bcrypt.compare(password, hash).then(res => res);
}

//Return value: A Promise which resolves to a hash of password
function hashPassword(password)
{
	return bcrypt.hash(password, saltRounds).then(hash => hash);
}

//Return value: A phone number string in the format 1234567890 (no special characters)
function formatPhoneNumber(phoneNumber)
{
	let arr = phoneNumber.match(/[0-9]/g);
	if (arr === null)
		return "";

	let noSpecial = arr.toString();
	noSpecial = noSpecial.replace(/,/g, "");
	return noSpecial;
}

//Return value: None
function sessionGen(key, user)
{
	let session = {
		"key": key,
		"userId": user._id,
		"firstName": user.userInfo.firstName,
		"lastName": user.userInfo.lastName
	};

	Database.insertActiveSession(session);
}

async function asyncResetRequestGen(key, userId)
{
	let date = new Date();
	let currentTime = date.getTime();
	let expirationDate = (+currentTime) + (+600000);		//Reset key expires in 10 minutes

	let reset = {
		"key": key,
		"expiration": expirationDate,
		"userId": userId
	};

	let req = await Database.findResetRequestByUser(userId);
	if (req !== null)
		; //Need to add code to replace reset request
	else
		Database.insertResetRequest(reset);
}

//Return value: A random key string
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
				entity = await Database.findResetRequestByKey(key);
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

async function asyncCreateAccount(req, res)
{
	let body = req.body;
	let user = await Database.findUser(body.email);
	if (user !== null)
	{
		res.send({ msg: "account-exists" });
		return;
	}

	let phoneNumber = formatPhoneNumber(body.phoneNumber);
	let password = await hashPassword(body.password);

	let userInfo = {
		"firstName": body.firstName,
		"lastName": body.lastName,
		"email": body.email,
		"phoneNumber": phoneNumber,
		"password": password
	};

	let obj = await Database.insertNewOrder();
	let orderId = obj.insertedId;
	user = {
		verified: false,
		userInfo: userInfo,
		currentOrder: orderId,
		pastOrders: []
	};

	obj = await Database.insertUser(user);
	user._id = obj.insertedId;

	let key = await asyncKeyGen("session");
	sessionGen(key, user);
	res.cookie("loginKey", key);
	res.send({ msg: "ok" });
}

async function asyncSendResetLink(req, res)
{
	let body = req.body;
	let user = await Database.findUser(body.email);
	if (user === null)
	{
		res.send({ "msg": "not-found" });
		return;
	}

	let key = await asyncKeyGen("reset");
	asyncResetRequestGen(key, user._id);
	Email.sendLink("reset", user.userInfo.email, key);
	res.send({ "msg": "ok" });
}

module.exports.asyncLogIn = asyncLogIn;
module.exports.asyncLogOut = asyncLogOut;
module.exports.asyncGetSessionInfo = asyncGetSessionInfo;
module.exports.asyncCreateAccount = asyncCreateAccount;
module.exports.asyncSendResetLink = asyncSendResetLink;

async function asyncFetchMenu(req, res)
{
	let body = req.body;
	let menu = {};

	menu.items = await Database.fetchMenuItems(body.category);
	menu.msg = "ok";
	res.send(menu);
}

module.exports.asyncFetchMenu = asyncFetchMenu;
