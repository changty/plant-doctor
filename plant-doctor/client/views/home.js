Template.home.onRendered(function() {

	Accounts.ui.config({
		passwordSignupFields: "USERNAME_ONLY"
	});
});



Template.home.helpers({
	userHasPlants: function() {
		return MyPlant.find({owner: Meteor.userId()}).count() > 0 ? true : false;
	},
	moreThanOnePlant: function() {
		return MyPlant.find({owner: Meteor.userId()}).count() > 1 ? true : false;
	},
	myPlants: function() {
		return MyPlant.find({owner: Meteor.userId()});
	}
});


var dep = new Tracker.Dependency(); 
Template.plantCard.helpers({
	getTemperature: function(){
		return getter({engine: this.engineId, sensor: "Temperature"},3);		
	},
	getHumidity: function(){
		return getter({engine: this.engineId, sensor: "Humidity"},3);		
	},
	getLight: function(){
		return getter({engine: this.engineId, sensor: "light"},3);		
	},
	getBattery: function(){
		return getter({engine: this.engineId, sensor: "Battery"},1);		
	},
	getPressure: function(){
		return getter({engine: this.engineId, sensor: "Pressure"},3);		
	},
	plantFace: function() {
		var engine = this.engineId + ''; 
		var plant = MyPlant.find({'engineId': engine}).fetch(); 
		var plantId = plant[0].plantId + ''; 
		var plantData = Plant.find({'id': plantId}).fetch()[0];

		dep.depend();
		var img = plantData.img;
		var format = '.' + img.split(".")[1];
		img = img.split(".")[0]; 

		// quick and ugly fix
		img = img.replace("2", "1"); 
		img = img.replace("3", "1"); 

		var c = $('.plant-row.'+engine).find('.fa.red').length;

		if(c === 0) {
			return img + "_happy" + format; 
		} 
		else if (c === 1) {
			return img + "_serious" + format; 
		}
		else if (c === 2) {
			return img + "_sad" + format; 
		}
		else if (c === 3) {
			return img + "_xx" + format; 
		}
		else {
			return img + "_happy" + format; 

		}
		return img;  

	},
	lightStatus: function() {
		var engine = this.engineId + ''; 
		var plant = MyPlant.find({'engineId': engine}).fetch(); 
		var plantId = plant[0].plantId + ''; 
		var plantData = Plant.find({'id': plantId}).fetch()[0];
		var avg = getter({engine: this.engineId, sensor: "light"},3);		
		console.log("light avg", avg);
		dep.changed(); 
		if(avg > plantData.lightMax || avg < plantData.lightMin ) {
			return 'red'; 
		} else {
			return 'green';
		}
	},
	humidityStatus: function() {
		var engine = this.engineId + ''; 
		var plant = MyPlant.find({'engineId': engine}).fetch(); 
		var plantId = plant[0].plantId + ''; 
		var plantData = Plant.find({'id': plantId}).fetch()[0];
		var avg = getter({engine: this.engineId, sensor: "Humidity"},3);		
		dep.changed(); 
		if(avg > plantData.humidityMax || avg < plantData.humidityMin ) {
			return 'red'; 
		} else {
			return 'green';
		}
	},
	tempStatus: function() {
		var engine = this.engineId + ''; 
		var plant = MyPlant.find({'engineId': engine}).fetch(); 
		var plantId = plant[0].plantId + ''; 
		var plantData = Plant.find({'id': plantId}).fetch()[0];
		var avg = getter({engine: this.engineId, sensor: "Temperature"},3);		
		dep.changed(); 
		if(avg > plantData.tempMax || avg < plantData.tempMin ) {
			return 'red'; 
		} else {
			return 'green';
		}
	}
});


function getter(json, count){
	var initializing = true;
	var query;
	Tracker.autorun(function () {
		query = Sensor.find(json);
		query.observeChanges({
			added: function(id, fields) {
				if(initializing)
					return 0;
				else
					return calculateAverageOf(query, count);
			}
		});
	});
	initializing = false;
	return calculateAverageOf(query, count).toFixed(2);
}

function calculateAverageOf(query, elements){
	var list = query.fetch();
	list.sort(function(a,b){return b.ts-a.ts});
	console.log("length"+list.length);
	if(list.length < 1)
		return 0;
						
	var count = Math.min(list.length,elements);
	var result = 0;
	for(var i=0; i< count;i++){
		result += list[i].value;
	}
	console.log("result "+result);
	return result/count;
}