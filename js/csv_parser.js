function getData(callback) {
	var promises = [];
	promises.push(csv_parser("/js/data/ROOM_MST.csv"));
	promises.push(csv_parser("/js/data/CUSTOMER_MST.csv"));
	promises.push(csv_parser("/js/data/HOTEL_MST.csv"));
	promises.push(csv_parser("/js/data/STAFF_MST.csv"));
	promises.push(csv_parser("/js/data/HOTEL_FLOW.csv"));
	Promise.all(promises).then(function(){
		var csvData = {};
		csvData.room = arguments[0][0];
		csvData.customer = arguments[0][1];
		csvData.hotel = arguments[0][2];
		csvData.staff = arguments[0][3];
		csvData.hotelflow = arguments[0][4];
		callback.call(this, csvData);
	});
}

function csv_parser( csvFile, callback ){
	return new Promise(function(resolve, reject) {
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
				resolve(content);
			}
		};
		xhttp.open("get", csvFile, true);
		xhttp.send();
	});
}
