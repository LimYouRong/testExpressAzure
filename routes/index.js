var express = require('express');
var Request = require('tedious').Request;
var router = express.Router();
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


router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/dashboard', function(req, res, next) {
    connectDB();
    res.render('Ospicon_Dashboard', { title: 'Express' });
});
router.get('/patientView/:userId', function(req, res, next) {
    var userId = req.params.userId;
    console.log(userId);
    res.render('Ospicon_Patients Reading Charts', { title: 'Express' });
});
router.get('/BPM/:userId/', function(req, res, next) {
    var userId = req.params.userId;
    console.log(userId);
    res.render('BPM', { title: 'Express' });
});
router.get('/recommend/:userId/', function(req, res, next) {
    var userId = req.params.userId;
    console.log(userId);
    res.render('Ospicon_Recommend.ejs', { title: 'Express' });
});

function connectDB(){

    var connection = new Connection(config);
    connection.on('connect', function(err) {
        // If no error, then good to proceed.

        console.log("Connected");
        executeStatement1();
    });

    var Request = require('tedious').Request
    var TYPES = require('tedious').TYPES;

    function executeStatement1() {
        //   request = new Request("  Insert dbo.systemrole output inserted.RoleId values (@rolename)", function(err) {
        request = new Request("INSERT INTO dbo.BloodPressure (systolicReading, diastolicReading, heartReading, createdBy) VALUES        (131,70,70,8)", function(err){
            if (err) {
                console.log(err);}
        });
        //request.addParameter('rolename', TYPES.NVarChar,'RoleNameTest');

        // request.on('row', function(columns) {
        //   columns.forEach(function(column) {
        //     if (column.value === null) {
        //       console.log('NULL');
        //     } else {
        //       console.log("Product id of inserted item is " + column.value);
        //     }
        //   });
        // });
        connection.execSql(request);
    }
}

module.exports = router;
