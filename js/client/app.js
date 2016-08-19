/*
 * @Author: xz06213
 * @Date:   2016-08-16 16:45:06
 * @Last Modified by:   xz06213
 * @Last Modified time: 2016-08-16 18:22:55
 */

'use strict';

window.onload = function() {
	window.Excel = {}
	Excel.read = function() {
		requestUrl('/readExcel/read.xlsx', function(data) {
			document.getElementById('excelTxt').value = data;
		})
	}
	Excel.clear = function() {
		document.getElementById('excelTxt').value = '';
	}
	Excel.write = function() {
		var data = document.getElementById('excelTxt').value;
		postData('/writeExcel/write.xlsx', data, function(res) {
			Excel.clear();
			alert(res);
		})
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
	xhr.setRequestHeader("Content-type", "application/json");
	xhr.send(data);

	function handler() {
		if (this.readyState == 4 && this.status == 200) {
			var res = this.responseText;
			callback && callback(res);
		}
	}
}
