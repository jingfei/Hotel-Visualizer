var roomChart=null, customerChart=null, seasonChart=null;

(function() {
	plotChart();

	$("#datepicker1").datepicker({ format: 'yyyy-mm-dd' });
	$("#datepicker2").datepicker({ format: 'yyyy-mm-dd' });

	$('input[name="type"]:radio').change(function(){
		$(".flow-chart").hide();
		if(this.value === "room") $("#flow-chart-room").show();
		else if(this.value === "customer") $("#flow-chart-customer").show();
		else if(this.value === "season") $("#flow-chart-season").show();
	});

	$('input[name="date"]:radio').change(function(){
		if(this.value === "all"){
			plotChart();
			$("#datepicker-wrapper").hide();
		}
		else if(this.value === "specific") $("#datepicker-wrapper").show();
		else if(this.value === "today"){
			plotChart({"date1":new Date()});
			$("#datepicker-wrapper").hide();
		}
	});

	$('input[name="range"]:radio').change(function(){
		if(this.value === "all"){
			plotChart();
			$("#regional-option").hide();
		}
		else{
			$("#regional-option").show();
			plotChart({"regional":[]});
		}
	});

})();


function makeRoom(csvData, date1, date2, regional, callback) {
	var itemProcessed = 0;
	var data = [{},{},{},{},{},{},{}];
	csvData.hotelflow.forEach(function(item,index,array){
		var start = item.start_date.split("/"),
				end = item.end_date.split("/"),
				now = new Date("20"+start[2],start[0]-1,start[1]),
				E = new Date("20"+end[2],end[0]-1,end[1]);
		while(Date.parse(now) <= Date.parse(E)){
			var now_sec = Math.floor(Date.parse(now)/86400000);
			if(regional.indexOf(item.hotel_id)!==-1
				&& Math.floor(Date.parse(date1)/86400000) <= now_sec
				&& now_sec <= Math.floor(Date.parse(date2)/86400000)){ 
				if(typeof data[item.room_mst_id-1].value === 'undefined')
					data[item.room_mst_id-1].value=0;
				++data[item.room_mst_id-1].value;
			}
			now = new Date(Date.parse(now) + 86400000);
		}
		++itemProcessed;
		if(itemProcessed === array.length){
			itemProcessed = 0;
			csvData.room.forEach(function(item,index,array){
				++itemProcessed;
				data[item.room_mst_id-1].label = item.room_type;
				if(itemProcessed === array.length)
					callback.call(this,data);
			});
		}
	});
}

function makeCustomer(csvData, date1, date2, regional, callback) {
	var itemProcessed = 0;
	var data = [];
	var tmp = {};
	csvData.hotelflow.forEach(function(item,index,array){
		var start = item.start_date.split("/"),
				end = item.end_date.split("/"),
				now = new Date("20"+start[2],start[0]-1,start[1]),
				E = new Date("20"+end[2],end[0]-1,end[1]);
		while(Date.parse(now) <= Date.parse(E)){
			var now_sec = Math.floor(Date.parse(now)/86400000);
			if(regional.indexOf(item.hotel_id)!==-1
				&& Math.floor(Date.parse(date1)/86400000) <= now_sec
				&& now_sec <= Math.floor(Date.parse(date2)/86400000)){ 
				var year = now.getFullYear().toString();
				var groupName = item.isGroup==1 ? "group" : "individual";
				if(typeof tmp[year] === 'undefined'){
					tmp[year]=data.length;
					data.push({'year':year,'individual':0,'group':0});
				}
				++data[tmp[year]][groupName];
			}
			now = new Date(Date.parse(now) + 86400000);
		}
		++itemProcessed;
		if(itemProcessed === array.length){
			data.sort(function(a,b){return a.year-b.year;});
			callback.call(this,data);
		}
	});
}

function makeSeason(csvData, date1, date2, regional, callback) {
	var itemProcessed = 0;
	var data = [];
	var labels = ['Q1','Q2','Q3','Q4'];
	var tmp = {};
	csvData.hotelflow.forEach(function(item,index,array){
		var start = item.start_date.split("/"),
				end = item.end_date.split("/"),
				now = new Date("20"+start[2],start[0]-1,start[1]),
				E = new Date("20"+end[2],end[0]-1,end[1]);
		while(Date.parse(now) <= Date.parse(E)){
			var now_sec = Math.floor(Date.parse(now)/86400000);
			if(regional.indexOf(item.hotel_id)!==-1
				&& Math.floor(Date.parse(date1)/86400000) <= now_sec
				&& now_sec <= Math.floor(Date.parse(date2)/86400000)){ 
				var season;
				if(now.getMonth()>=0 && now.getMonth()<3) season = "Q1";
				else if(now.getMonth()>=3 && now.getMonth()<6) season = "Q2";
				else if(now.getMonth()>=6 && now.getMonth()<=9) season = "Q3";
				else if(now.getMonth()>=9 && now.getMonth()<=12) season = "Q4";
				
				var year = now.getFullYear().toString();
				if(typeof tmp[year] === 'undefined'){
					tmp[year]=data.length;
					data.push({'year':year,'Q1':0,'Q2':0,'Q3':0,'Q4':0});
				}
				++data[tmp[year]][season];
			}
			now = new Date(Date.parse(now) + 86400000);
		}
		++itemProcessed;
		if(itemProcessed === array.length){
			callback.call(this,data,labels);
		}
	});
}

function plotChart(opts){
	var regional = [], isGlobal = false;
	var date1,date2;
	if(typeof opts === 'undefined') opts = {};
	if(typeof opts.date1 === 'undefined') date1 = new Date(1970,0,1);
	if(typeof opts.date2 === 'undefined') date2 = new Date(Date.now());
	if(typeof opts.regional === 'undefined') isGlobal = true;
	getData(function(csvData){
		if(roomChart===null) getRegion(csvData.hotel);
		$("#regional-option").children("label").each(function(){
			var $input = $(this).children("input").first();
			if(isGlobal || $input.prop("checked")) regional.push($input.val());
		});

		makeRoom(csvData,date1,date2,regional,function(data){
			if(roomChart === null)
		    roomChart = Morris.Donut({
					element: 'flow-chart-room',
					data: data
				});
			else
				roomChart.setData(data);
		});

		makeCustomer(csvData,date1,date2,regional,function(data){
			if(customerChart === null)
				customerChart = Morris.Bar({
					element: 'flow-chart-customer',
					data: data,
					xkey: 'year',
					ykeys: ['individual', 'group'],
					labels: ['individual', 'group']
				});
			else
				customerChart.setData(data);
		});

		makeSeason(csvData,date1,date2,regional,function(data,labels){
			if(seasonChart === null)
		    seasonChart = Morris.Line({
					element: 'flow-chart-season',
					data: data,
					xkey: 'year',
					ykeys: labels,
					labels: labels
				});
			else
				seasonChart.setData(data);
		});
	});
}

function getRegion(data){
	data.forEach(function(item,index,array){
		$("#regional-option").append('<div class="col-md-2"></div>');
		$("#regional-option").append('<label class="checkbox-inline col-md-5"><input type="checkbox" name="range" value="'+item.hotel_id+'" onChange="plotChart({\'regional\':[]});">'+item.region_name+' ('+item.hotel_name+')</label>');
			
	});
}

