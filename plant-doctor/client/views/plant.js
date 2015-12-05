Template.plant.helpers({
	sensorData: function(){
		return Sensor.find().fetch();
	},
	specificEngine: function(){
		return Sensor.find({engine: this.engineId}).fetch();
	},
	getUptoDateDataForSpecificEngine: function(){
		console.log("uptodate data");
		var that = this;
		var query;
		Tracker.autorun(function () {
			console.log("engine id ",that.engineId);
			console.log("autorun",Sensor.find({engine: that.engineId}).fetch());
			query = Sensor.find({engine: that.engineId});
			query.observeChanges({
				added: function(id, fields) {
					console.log("Added ",id,fields);
				}
			});
		});
		console.log("query is ", query);
		return query.fetch();
	},
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

Template.plant.onRendered(function(){
});

function getter(json, count){
	var query;
	Tracker.autorun(function () {
		query = Sensor.find(json);
		query.observeChanges({
			added: function(id, fields) {
				return calculateAverageOf(query, count);
			}
		});
	});
	
	return calculateAverageOf(query, count);
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