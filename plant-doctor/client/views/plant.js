
var dep = new Tracker.Dependency(); 
Template.plant.helpers({
	sensorData: function(){
		return Sensor.find().fetch();
	},
	specificEngine: function(){
		return Sensor.find({engine: this.engineId}).fetch();
	},
	name : function() {
		return this.plantData.name;
	},
	getUptoDateDataForSpecificEngine: function(){
		// console.log("uptodate data");
		var that = this;
		var query;
		Tracker.autorun(function () {
			// console.log("engine id ",that.engineId);
			// console.log("autorun",Sensor.find({engine: that.engineId}).fetch());
			query = Sensor.find({engine: that.engineId});
			query.observeChanges({
				added: function(id, fields) {
					// console.log("Added ",id,fields);
				}
			});
		});
		// console.log("query is ", query);
		return query.fetch();
	},
	plantFace: function() {
		dep.depend(); 
		console.log("plantfaceeeee");
		var img = this.plantData.img;
		var format = '.' + img.split(".")[1];
		img = img.split(".")[0]; 

		// quick and ugly fix
		img = img.replace("2", "1"); 
		img = img.replace("3", "1"); 

		var c = $('.fa.red').length
		console.log("plantface: ", img, c);

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
	getGraphTemperature: function(){
		return getter({engine: this.engineId, sensor: "Temperature"},3);		
	},
	getGraphHumidity: function(){
		return getter({engine: this.engineId, sensor: "Humidity"},3) + '%';		
	},
	lightStatus: function() {
		var avg = getter({engine: this.engineId, sensor: "light"},3);		
		console.log("light avg", avg);
		dep.changed(); 
		if(avg > this.plantData.lightMax || avg < this.plantData.lightMin ) {
			return 'red'; 
		}
		else {
			return 'green';
		}
	},
	humidityStatus: function() {
		var avg = getter({engine: this.engineId, sensor: "Humidity"},3);		
		dep.changed(); 
		if(avg > this.plantData.humidityMax || avg < this.plantData.humidityMin ) {
			return 'red'; 
		}
		else {
			return 'green';
		}
	},
	tempStatus: function() {
		var avg = getter({engine: this.engineId, sensor: "Temperature"},3);		
		dep.changed(); 
		if(avg > this.plantData.tempMax || avg < this.plantData.tempMin ) {
			return 'red'; 
		}
		else {
			return 'green';
		}
	},
	getGraphLight: function(){
		var avg = getter({engine: this.engineId, sensor: "light"},3);		
		console.log("light avg", avg);

		if(avg > 35000) {
			return '100%'; 
		}
		else if(avg > 25000) {
			return '95%'; 
		}
		else if (avg > 15000) {
			return '90%'; 
		}
		else if(avg > 10000) {
			return '80%';
		}
		else if(avg > 7500) {
			return '70%';
		}
		else if(avg > 5000) {
			return '60%';
		}
		else if(avg > 3000) {
			return '50%'; 
		} 
		else if (avg > 1000) {
			return '40%'; 
		}
		else if (avg > 100) {
			return  '30%'; 
		} 
		else if (avg > 30) {
			return '10%';
		}
		else if(avg <= 0) {
			return '0%'; 
		}
		else {
			return '0%'; 
		}

	},
	getGraphTemperature: function(){
		var avg = getter({engine: this.engineId, sensor: "Temperature"},3);		
		if(avg >= 40) {
			return '100%'; 
		}
		else if(avg <= 0) {
			return '0%';
		}
		else {
			return (1 -((40-avg)/40))*100  + '%';
		}
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

Template.plant.events({
	'click .icon.sun': function() {
		var avg = getter({engine: this.engineId, sensor: "light"},3);		
		showDialog('Sun light', '<h3>At the moment I\'m getting ' + avg +' lux of light</h3><br /> <p>The big books says that my light condition should be ' + this.plantData.light + '</p>');
	},
	'click .icon.watericon': function() {
		var avg = getter({engine: this.engineId, sensor: "Humidity"},3);		
		showDialog('Water', '<h3>At the moment my humidity is ' + avg +' %.</h3><br /> <p>The big books says that my watering condition should be ' + this.plantData.watering+ ' and misting should be ' + this.plantData.misting + '</p>');
	},
	'click .icon.temp': function() {
		var avg =getter({engine: this.engineId, sensor: "Temperature"},3);		 
		showDialog('Temperature', '<h3>At the moment the temperature is ' + avg +'degreees of Celsius.</h3><br /> <p>The big books says that my temperature condition should be ' + this.plantData.temperature + '</p>');
	},
});

Template.plant.onRendered(function(){
});

function getter(json, count){
	// console.log("json", json);
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
	return calculateAverageOf(query, count);
}

function calculateAverageOf(query, elements){
	var list = query.fetch();
	list.sort(function(a,b){return b.ts-a.ts});
	// console.log("length ", list.length);
	if(list.length < 1)
		return 0;
						
	var count = Math.min(list.length,elements);
	var result = 0;
	for(var i=0; i< count;i++){
		result += list[i].value;
	}
	// console.log("result "+result);
	return result/count;
}