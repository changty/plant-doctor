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