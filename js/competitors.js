(function() {
	getData(function(csvData){
		var hotel = csvData.hotel;
		getRegion(hotel);
	});
})();

function getHotelContent(hotel_id){
//		var url = "https://www.tripadvisor.com.tw/Search?q="+hotel.address+"&ssrc=h&o=0";
			$("#tableBody").html("");
			if(hotel_id>10) hotel_id = hotel_id%10+1;
			var url = "/js/tripAdvisor/"+hotel_id+".html";
			var xhttp=new XMLHttpRequest();
			xhttp.onreadystatechange = function() {
				if (xhttp.readyState == 4 && xhttp.status == 200) {
					var res = xhttp.responseText;
					var emts = $(res).find(".info"), count = emts.length;
					emts.each(function(){
						name = $(this).find(".title").text();
						address = $(this).find(".address").text();
						rank = $(this).find(".sprite-ratings").attr("alt");
						$("#tableBody").append("<tr><td>"+name+"</td><td>"+address+"</td><td>"+rank+"</td></tr>");
						if(!--count) $("#dataTables").DataTable();
					});
				}
			};
			xhttp.open("get", url, true);
			xhttp.send();
}

function getRegion(data){
	data.forEach(function(item,index,array){
		$("#regional-option").append('<div class="col-md-2"></div>');
		$("#regional-option").append('<label class="radio-inline col-md-5"><input type="radio" name="range" value="'+item.hotel_id+'" onClick="getHotelContent('+item.hotel_id+');";">'+item.region_name+' ('+item.hotel_name+')</label>');
	});
}

