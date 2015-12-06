Meteor.startup(function () {
	var plants = {};
	plants = JSON.parse(Assets.getText("plants.json"));
	// console.log("Plants json: ", plants);
	// console.log("Plant count: ", Plant.find().count());

	if(Plant.find().count() < plants.length) {
		// Remove all plants from db
		Plant.remove({});

		for(var i=0; i<plants.length; i++) {
			var plant = plants[i]; 
			console.log(plant);
			Plant.insert({
				id: plant.id, 
				name: plant.name,
				watering: plant.watering,
				misting: plant.misting, 
				temperature: plant.temperature,
				light: plant.light,
				img: plant.img || '',
				humidityMin: plant.humidityMin,
				humidityMax: plant.humidityMax, 
				lightMin: plant.lightMin,
				lightMax: plant.lightMax,
				tempMin: plant.tempMin, 
				tempMax: plant.tempMax
			});
		}

 	}
});


Meteor.publish("plants", function () {
return Plant.find();
});
