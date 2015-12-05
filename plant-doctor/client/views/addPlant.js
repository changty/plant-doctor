Template.addPlant.helpers({
	plant: function() {
		console.log(Plant.find({}).fetch());
		return Plant.find({}).fetch();
	}
});

Template.addPlant.onRendered(function() {

});