if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);
}

Template.PlantDoctorTemplate.onRendered(function() {
	// create navigation
	var $nav = $('nav');
	$nav.navigation({
		gravity: 'push',
		type: 'overlay',
		maxWidth: '10000px'
	});
  	$('#main-nav > ul').find('a').click(function() {
  		$nav.navigation('close');
  	});
});

Template.PlantDoctorTemplate.helpers({
	myPlants: function() {
		return MyPlant.find({}).fetch();
	}
});