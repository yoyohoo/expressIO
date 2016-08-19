/*
 * @Author: xz06213
 * @Date:   2016-06-20 11:32:45
 * @Last Modified by:   xz06213
 * @Last Modified time: 2016-08-19 15:43:44
 */

'use strict';
// lib
var express = require('express'),
	app = express(),
	path = require('path');

// custom
var excel = require('./js/server/excel'),
	json = require('./js/server/json');

//allow client to view
app.use('/js', express.static(__dirname + '/js/client'));
app.use('/css', express.static(__dirname + '/css'));
app.use('/img', express.static(__dirname + '/img'));

// logger before every request 
var logger = function(req, res, next) {
		console.log('Logger:', req.params);
		next();
	},
	requestTime = function(req, res, next) {
		req.requestTime = Date.now();
		next();
	};
app.use(logger);
app.use(requestTime);

// handle error
app.use(function(err, req, res, next) {
	console.error(err.stack);
	res.status(500).send('Something broke!');
});

// home page
app.get('/', function(req, res) {
	console.log(req.requestTime);
	res.sendFile(path.join(__dirname + '/index.html'));
});

// data function
app.get('/readExcel/:fileName', function(req, res) {
	var fileName = req.params.fileName,
		data = excel.readExcel('./data/excel/' + fileName);
	res.send(data);
})
app.post('/writeExcel/:fileName', function(req, res) {
	var fileName = req.params.fileName,
		data = req.data,
		result = excel.writeExcel('./data/excel/' + fileName, data);
	res.send(result);
})
app.get('/writeJson', function(req, res) {
	json.writeJson('./data/json/excelData.json', data, function(err) {
		if (err) throw err;
		console.log('It\'s saved!');
		res.send('ok!');
	})
});

// run server
app.listen(5050);
console.log('localhost:5050!');
