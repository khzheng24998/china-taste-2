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
			resolve(true);

		else
		{
			MongoClient.connect(url, { useNewUrlParser: true }, function(err, db)
			{
				_db = db;
				resolve(true);
			});
		}
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

function findActiveSession(key) { return findDoc("activeSessions", "key", key); }
function findResetRequest(key) { return findDoc("resetRequests", "key", key); }
function findVerificationRequest(key) { return findDoc("verificationRequests", "key", key); }
function findUser(email) { return findDoc("users", "userInfo.email", email); }

function deleteActiveSession(id) { deleteDoc("activeSessions", id); }

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

//Return value: None
function insertDoc(col, doc)
{
	let init = initializeDb();
	init.then(function()
	{
		let db = getDb();
		let chinaTaste = db.db("chinataste");
		chinaTaste.collection(col).insertOne(doc);
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

module.exports.insertDoc = insertDoc;

module.exports.findUser = findUser;
module.exports.findActiveSession = findActiveSession;
module.exports.findResetRequest = findResetRequest;
module.exports.findVerificationRequest = findVerificationRequest;

module.exports.deleteActiveSession = deleteActiveSession;
