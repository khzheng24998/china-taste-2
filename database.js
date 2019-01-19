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

function findUser(field, query)
{
	return new Promise(function(resolve, reject)
	{
		let init = initializeDb();
		init.then(function()
		{
			let db = getDb();
			let chinaTaste = db.db("chinataste");

			let doc;
			switch (field)
			{
				case "_id":
					doc = chinaTaste.collection("users").findOne({ "_id": query });
					break;
				case "email":
					doc = chinaTaste.collection("users").findOne({ "userInfo.email": query });
					break;
				default:
					console.log("ERROR: findUser() - Invalid lookup method.");
					resolve(null);
					return;
			}

			resolve(doc);
		});
	});
}

module.exports.findUser = findUser;
