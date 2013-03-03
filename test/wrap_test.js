// var Sync = require('../build/Release/sync').Sync
  // , MongoClient = require('mongodb').MongoClient;
var wrap = require('../lib/sync').wrap
  , srequire = require('../lib/sync').srequire
  , MongoClient = require('mongodb').MongoClient
  , Db = require('mongodb').Db
  , Collection = require('mongodb').Collection
  , Cursor = require('mongodb').Cursor;

/**
 * Retrieve the server information for the current
 * instance of the db client
 *
 * @ignore
 */
exports.setUp = function(callback) {
  callback();
}

/**
 * Retrieve the server information for the current
 * instance of the db client
 *
 * @ignore
 */
exports.tearDown = function(callback) {
  callback();
}

exports['Should correctly wrap function'] = function(test) {
  // Sync up method
  var MongoClientSync = wrap(MongoClient
    , ["connect", "close", "command", "collection", "findOne"]);
  // console.dir(MongoClientSync)
  // wrap(Db, ["close"]);

  // Wrap the sync command
  var db = MongoClientSync.connect('mongodb://localhost:27017/test');
  // console.dir(db);
  var r = db.command({ping:1})
  console.dir(r)
  var coll = db.collection('test');
  var doc = coll.findOne();
  console.dir(doc)
  db.close();
  // console.dir(db.close.toString())
  // Wrap the db object
  // var result = db.close();
  // 


  test.done();
}

// var test_function = function(test, test2, callback) {
//   console.log("============================= test_function")
//   // callback(null, {});
//   MongoClient.connect('mongodb://localhost:27017/test', function(err, db) {
//     console.log("=========================== hello :: " + test + " :: " + test2);
//   //   if(err) return callback(err);
//     // return callback(null, true);
//     var collection = db.collection('testing');
//     collection.insert({a:1}, function(err, result) {
//       if(err) return callback(err);

//       collection.findOne(function(err, item) {
//         db.close();
//         callback(err, item);
//       });
//     });
//   });
//   // console.dir(callback)
//   // process.nextTick(function() {
//   //   console.log("============================= test_function 1")
//   //   callback(null, {value:"true"});
//   // });
// }

// exports['Should correctly execute function using sync'] = function(test) {
//   var sync = new Sync();
//   var t = sync.execute(test_function, this, 1, "world");    
//   console.log("================= hey")
//   console.dir(t)
//   test.done();
// }