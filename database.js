/* Establish connection to database */

const MongoClient = require('mongodb').MongoClient;
let password = process.env.MONGODB_PASS;
const url = 'mongodb+srv://khzheng24998:' + password + '@cluster0-m9ge7.gcp.mongodb.net/test?retryWrites=true';
let _db = null;

/* General purpose database functions */

function initializeDb()
{
	return new Promise(function(resolve, reject)
	{
		if (_db)
		{
			resolve(true);
			return;
		}

		MongoClient.connect(url, { useNewUrlParser: true }, function(err, db)
		{
			_db = db;
			resolve(true);
		});
	});
}

function getDb()
{
	if (!_db)
	{
		console.log("ERROR: Database is uninitialized.");
		return null;
	}

	return _db;
}

function checkInput(fields, doc)
{
	let requiredFields = fields;
	for (let prop in doc) {
    if (doc.hasOwnProperty(prop)) {
    	let index = requiredFields.indexOf(prop);
			if (index === -1)
				return false;
			requiredFields.splice(index, 1);
    }
	}

	return (requiredFields.length === 0) ? true : false;
}

function findActiveSession(key) { return findDoc("activeSessions", "key", key); }
function deleteActiveSession(id) { deleteDoc("activeSessions", id); }
function insertActiveSession(session)
{
	if (!checkInput(["key", "userId", "firstName", "lastName"], session))
		return null;
	else
		return insertDoc("activeSessions", session);
};

module.exports.findActiveSession = findActiveSession;
module.exports.insertActiveSession = insertActiveSession;
module.exports.deleteActiveSession = deleteActiveSession;

function findUser(email) { return findDoc("users", "userInfo.email", email); }
function insertUser(user)
{
	return insertDoc("users", user);
}

module.exports.findUser = findUser;
module.exports.insertUser = insertUser;

function findResetRequest(key) { return findDoc("resetRequests", "key", key); }
function findVerificationRequest(key) { return findDoc("verificationRequests", "key", key); }

module.exports.findResetRequest = findResetRequest;
module.exports.findVerificationRequest = findVerificationRequest;

function insertNewOrder()
{
	let order = {};
	order.info = {};
	order.items = [];

	return insertDoc("currentOrders", order);
}

module.exports.insertNewOrder = insertNewOrder;

//Return value: A Promise which resolves to a document
function findDoc(col, key, val)
{
	let init = initializeDb();
	return init.then(function()
	{
		let db = getDb();
		let chinaTaste = db.db("chinataste");

		let query = {};
		query[key] = val;
		return chinaTaste.collection(col).findOne(query);
	});
}

//Return value: A Promise which resolves to an object containing the id of the inserted document
function insertDoc(col, doc)
{
	let init = initializeDb();
	return init.then(function()
	{
		let db = getDb();
		let chinaTaste = db.db("chinataste");
		return chinaTaste.collection(col).insertOne(doc);
	});
}

//Return value: None
function deleteDoc(col, id)
{
	let init = initializeDb();
	init.then(function()
	{
		let db = getDb();
		let chinaTaste = db.db("chinataste");
		chinaTaste.collection(col).deleteOne({ "_id": id });
	});
}
