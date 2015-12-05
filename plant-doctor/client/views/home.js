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
	},
	getLuxDegrees: function() {
		// replace with plant measurement value
		var lux = 80;

		// measure between 0 lux and 100 lux
		var deg = 180 * (lux / 100);

		// scale -90 -> 90
		return deg - 90;
	}
});