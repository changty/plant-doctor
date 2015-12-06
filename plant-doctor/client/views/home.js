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