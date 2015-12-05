Template.plant.helpers({
	sensorData: function(){
		return Sensor.find().fetch();
	},
	specificEngine: function(){
		return Sensor.find({engine: this.engineId}).fetch();
	}
});

Template.plant.onRendered(function(){
});