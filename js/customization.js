var ar=[], mx=[[],[],[],[],[]], my=[], vx=[false,false,false,false,false];
var btnNum = [2,1,3,1,2], current_btn = [0,0,0,0,0];
var cusName=[];
var btn_size = 5, cus_size = 0;

(function() {
	getData(function(csvData){ getCustomer(csvData.customer); });

	$("#distribute").click(function(){
		--cus_size;
		$("#service"+cus_size).hide();
		bipartite();
		$(this).hide();
		$("#result").show();
	});
})();

function getCustomer(data){
	var count = 0;
	data.forEach(function(item,index,array){
		$("#customer-option-hidden").append('<option value="'+item.customer_id+'">'+item.name+' ('+item.gender+','+item.nationality+')</option>');
		if(array.length === ++count) generateCustomer(0);
	});
}

function generateCustomer(id){
	var content = '<div class="row" id="service'+id+'"><h2 class="col-md-6"> Choose a customer: </h2><select class="col-md-4 customer-option" id="customer-option'+id+'"><option></option></select><div class="col-md-5 customer-service" id="customer-service'+id+'"><button id="0" type="button" class="btn btn-primary btn-circle btn-xl"><i class="fa fa-columns"></i></button><button id="1" type="button" class="btn btn-success btn-circle btn-xl"><i class="fa fa-lock"></i></button><button id="2" type="button" class="btn btn-info btn-circle btn-xl"><i class="fa fa-coffee"></i></button><button id="3" type="button" class="btn btn-warning btn-circle btn-xl"><i class="fa fa-beer"></i></button><button id="4" type="button" class="btn btn-danger btn-circle btn-xl"><i class="fa fa-fire-extinguisher"></i></button></div><div class="col-md-1"><button type="button" class="btn btn-default btn-lg finish" id="finish'+id+'" onClick="generateCustomer('+(id+1)+')">Finish</button></div></div>';
	ar.push([false,false,false,false,false]);
	++cus_size;
	my.push(-1);
	$("#customer-content").append(content).each(function(){
		if(id>0) $("#customer-service"+(id-1)).unbind("click");
	
		$("#customer-service"+id).click(function(e){
			$target = null;
			if($(e.target).prop("tagName") === "I") 
				$target = $(e.target).parent();	
			else if($(e.target).prop("tagName") === "BUTTON") 
				$target = $(e.target);
			if($target != null){
				$target.attr("class","btn btn-default btn-circle btn-xl");
				var btn = $target.attr("id");
				ar[id][btn] = true;
			}
		});
	
		$("#customer-option"+id).append($("#customer-option-hidden").html()).each(function(){
			$("#customer-option"+id).change(function(){
				var name = $(this).find("option:selected").text();
				cusName.push(name);
				$(this).parent().find('h2:first').html(name);
				$(this).hide();
				$("#customer-service"+id).show();
				$("#finish"+id).show();
			});	
		});
	});
}

function bipartite() {
	var match = 0;
	for(var i=0; i<cus_size; ++i)
		if(my[i]===-1) {
			init(vx,btn_size,false);
			if(augment(i) === true){ 
				match++;
			}
		}
	// finish matching
	for(var i=0; i<cus_size; ++i)
		addResult(i,my[i]);
	console.log(match);
}

function augment(y) {
	for(var j=0; j<btn_size; ++j)
		if(ar[y][j]===true && vx[j]===false){
			vx[j]=true;
			if(current_btn[j]<btnNum[j]){
				++current_btn[j];
				mx[j].push(y);
				my[y]=j;
				return true;
			}
			for(var k=0; k<current_btn[j]; ++k){
				if(augment(mx[j][k])===true){
					mx[j][k]=y;
					my[mx[j][k]]=j;
					return true;
				}
			}
			return true;
		}
	return false;
}

function init(elmt, size, val){
	for(var i = 0; i < size; ++i)
		elmt[i] = val;
}

function addResult(cus, btn) {
	var btn_content = '<h2>no result</h2>';
	if(btn != -1) btn_content = '<button type="button" class="'+$("#b"+btn).attr("class")+'">'+$("#b"+btn).html()+'</button>';
	var content = '<div class="row"><h2 class="col-md-6">'+cusName[cus]+'</h2><div class="col-md-6">'+btn_content+'</div></div>';
	$("#result").append(content);
}

