/**
 * Created by P1431658 on 16/6/2016.
 */
var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;

/* GET home page. */
var Connection = require('tedious').Connection;
var config = {
    userName: 'LYR  ',
    password: 'asd83ezvatZ',
    server: 'lyrdatabase.database.windows.net',
    // If you are on Microsoft Azure, you need this:
    options: {encrypt: true, database: 'fypSQL',    rowCollectionOnRequestCompletion: true}
};

var records = [
    { systemUserId: 1, username: 'jack', password: 'secret', firstname: 'Jack', lastname:'the bean stalk' }
    , { systemUserId: 2, username: 'jill', password: 'birthday', firstname: 'Jill', lastname:'roll down the well' }
];

exports.findById = function(id, cb) {
    process.nextTick(function() {
        var idx = id - 1;
        if (records[idx]) {
            cb(null, records[idx]);
        } else {
            cb(new Error('User ' + id + ' does not exist'));
        }
    });
}

exports.findByUsername = function(username, cb) {
    return getData(username,cb);


}
function processUsername(username,cb){
    process.nextTick(function() {
        for (var i = 0, len = records.length; i < len; i++) {
            var record = records[i];
            if (record.username === username) {
                return cb(null, record);
            }
        }
        return cb(null, null);
    })
}


function getData(username,cb){

    var connection = new Connection(config);
    console.log('hi');
    // After they attempt to connect to the database
    // If there is error encountered while connecting,
    // the "err" parameter will contain informaion about the error
    connection.on('connect', function(err) {
        // If no error, then good to proceed.
        if (err) {
            console.log(err);
            connection.close();
            res.end('Connection error encountered');
            return;
        }

        var resultArr = [];
        var request = new Request("select * from systemuser ", function(err, rowCount, rows) {
            if (err) {
                console.log(err);
                connection.close();
                res.end('Query error encountered.');
              //  return;
            }

            rows.forEach(function(columns) {
                var jsonObject = {};
                columns.forEach(function(column) {
                    jsonObject[column.metadata.colName] = column.value;
                });
                resultArr.push(jsonObject);

                records.push(jsonObject);

         //       console.log(jsonObject);


        });
            console.log(records);
            console.log(records.length);
            connection.close();
           return processUsername(username,cb);
        //    res.json(resultArr);
        });
        connection.execSql(request);

    });

}