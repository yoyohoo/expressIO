/*
 * @Author: xz06213
 * @Date:   2016-08-16 16:45:06
 * @Last Modified by:   xz06213
 * @Last Modified time: 2016-08-22 17:54:17
 */

'use strict';

window.onload = function() {
	window.Excel = {}, window.Json = {};
	var excelTxt = document.getElementById('excelTxt');
	Excel.read = function() {
		requestUrl('/readExcel/excel.xlsx', function(data) {
			excelTxt.value = data;
		})
	}
	Excel.clear = function() {
		excelTxt.value = '';
	}
	Excel.write = function() {
		var data = excelTxt.value.trim();
		if (data.length)
			postData('/writeExcel/excel.xlsx', data, function(res) {
				Excel.clear();
				console.info('Write Excel:', res);
			})
	}
	Json.read = function() {
		requestUrl('/readJson/excel.json', function(data) {
			excelTxt.value = data;
		})
	}
	Json.write = function() {
		var data = excelTxt.value.trim();
		if (data.length)
			postData('/writeJson/excel.json', data, function(res) {
				excelTxt.value = 'Loading data after 3 seconds...';
				console.info('Write Json:', res);
			})

		setTimeout(function() {
			Json.read();
		}, 3000);
	}
}


//XMLHttpRequest
function requestUrl(url, callback) {

	var xhr;
	if (window.XMLHttpRequest) {
		xhr = new XMLHttpRequest();
	} else {
		// code for older browsers
		xhr = new ActiveXObject("Microsoft.XMLHTTP");
	}

	xhr.onload = handler;
	// xhr.onreadystatechange = handler;
	xhr.open('GET', url);
	xhr.send();

	function handler() {
		if (this.readyState == 4 && this.status == 200) {
			var data = this.responseText;
			callback && callback(data);
		}
	}
}

function postData(url, data, callback) {
	var xhr;
	if (window.XMLHttpRequest) {
		xhr = new XMLHttpRequest();
	} else {
		// code for older browsers
		xhr = new ActiveXObject("Microsoft.XMLHTTP");
	}

	xhr.onload = handler;
	// xhr.onreadystatechange = handler;
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	xhr.send(data);

	function handler() {
		if (this.readyState == 4 && this.status == 200) {
			var res = this.responseText;
			callback && callback(res);
		}
	}
}
