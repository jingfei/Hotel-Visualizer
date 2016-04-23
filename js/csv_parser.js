function getData(callback) {
	var csvData = {}, promises = [];
	promises.push(csv_parser("/js/data/ROOM_MST.csv", function(res){ csvData.room = res; }));
	promises.push(csv_parser("/js/data/CUSTOMER_MST.csv", function(res){ csvData.customer = res; }));
	promises.push(csv_parser("/js/data/HOTEL_MST.csv", function(res){ csvData.hotel = res; }));
	promises.push(csv_parser("/js/data/STAFF_MST.csv", function(res){ csvData.staff = res; }));
	Promise.all(promises).then(function(){
		callback.call(this, csvData);
	});
}

function csv_parser( csvFile, callback ){
	var xhttp=new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (xhttp.readyState == 4 && xhttp.status == 200) {
			var res = xhttp.responseText;
			res = res.split("\n");

			var title = res[0].split(",");
			var isFirst = true;
			var content = new Array();
			for(row in res){
					if(isFirst){ isFirst = false; continue; }
					if(res[row].length==0) continue;
					var tmp = res[row].split(",");
					var obj = {};
					for(val in tmp)
						obj[title[val]] = tmp[val];
					content.push(obj);
			}
			callback.call(this, content);
		}
	};
	xhttp.open("get", csvFile, true);
	xhttp.send();
}
