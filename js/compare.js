var roomChart=[null,null,null], 
		customerChart=[null,null,null], 
		seasonChart=[null,null,null];

(function() {

	$("#datepicker1").datepicker({ format: 'yyyy-mm-dd' });
	$("#datepicker2").datepicker({ format: 'yyyy-mm-dd' });

	$('input[name="graphic"]:radio').change(function(){
		$("#graphic").hide();
		if(this.value === "flow") $("#graphic").show();
	});

	$('input[name="type"]:radio').change(function(){
		$(".flow-chart1").hide();
		$(".flow-chart2").hide();
		if(this.value === "room"){ 
			$("#flow-chart-room1").show();
			$("#flow-chart-room2").show();
		}
		else if(this.value === "customer") {
			$("#flow-chart-customer1").show();
			$("#flow-chart-customer2").show();
		}
		else if(this.value === "season") {
			$("#flow-chart-season1").show();
			$("#flow-chart-season2").show();
		}
	});

	$('input[name="date"]:radio').change(function(){
		if(this.value === "all"){
			plotChart(1);
			plotChart(2);
			$("#datepicker-wrapper").hide();
		}
		else if(this.value === "specific") $("#datepicker-wrapper").show();
		else if(this.value === "today"){
			plotChart(1,{"date1":new Date()});
			plotChart(2,{"date1":new Date()});
			$("#datepicker-wrapper").hide();
		}
	});

	$('input[name="range1"]:radio').change(function(){
		if(this.value === "all"){
			plotChart(1);
			$("#regional-option1").hide();
		}
		else{
			$("#regional-option1").show();
			var option=$("#regional-option1").val();
			if(option==null) option=1;
			plotChart(1,{"regional":option});
		}
	});
	$("#regional-option1").change(function(){
		plotChart(1,{"regional":$(this).val()});
	});

	$('input[name="range2"]:radio').change(function(){
		if(this.value === "all"){
			plotChart(2);
			$("#regional-option2").hide();
		}
		else{
			$("#regional-option2").show();
			var option=$("#regional-option2").val();
			if(option==null) option=2;
			plotChart(2,{"regional":option});
		}
	});
	$("#regional-option2").change(function(){
		plotChart(2,{"regional":$(this).val()});
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
			if( (regional===null || regional === item.hotel_id)
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
			if( (regional===null || regional === item.hotel_id)
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
			if( (regional===null || regional === item.hotel_id)
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

function plotChart(range_id,opts){
	var date1,date2,regional;
	if(typeof opts === 'undefined') opts = {};
	if(typeof opts.date1 === 'undefined') date1 = new Date(1970,0,1);
	else date1 = opts.date1;
	if(typeof opts.date2 === 'undefined') date2 = new Date(Date.now());
	else date2 = opts.date2;
	if(typeof opts.regional === 'undefined') regional = null;
	else regional = opts.regional;
	getData(function(csvData){
		if(roomChart[range_id]===null) getRegion(range_id,csvData.hotel);

		makeRoom(csvData,date1,date2,regional,function(data){
			if(roomChart[range_id] === null)
		    roomChart[range_id] = Morris.Donut({
					element: 'flow-chart-room'+range_id,
					data: data
				});
			else
				roomChart[range_id].setData(data);
		});

		makeCustomer(csvData,date1,date2,regional,function(data){
			if(customerChart[range_id] === null)
				customerChart[range_id] = Morris.Bar({
					element: 'flow-chart-customer'+range_id,
					data: data,
					xkey: 'year',
					ykeys: ['individual', 'group'],
					labels: ['individual', 'group']
				});
			else
				customerChart[range_id].setData(data);
		});

		makeSeason(csvData,date1,date2,regional,function(data,labels){
			if(seasonChart[range_id] === null)
		    seasonChart[range_id] = Morris.Line({
					element: 'flow-chart-season'+range_id,
					data: data,
					xkey: 'year',
					ykeys: labels,
					labels: labels
				});
			else
				seasonChart[range_id].setData(data);
		});
	});
}

function getRegion(range_id,data){
	var selected = 'selected="selected"';
	data.forEach(function(item,index,array){
		$("#regional-option"+range_id).append('<option value="'+item.hotel_id+'"  '+selected+'>'+item.region_name+' ('+item.hotel_name+')</option>');
		if(selected.length) selected='';
	});
}

