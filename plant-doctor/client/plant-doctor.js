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
  	$('#main-nav > ul, header h1').find('a').click(function() {
  		$nav.navigation('close');
  	});
});

Template.PlantDoctorTemplate.helpers({
	myPlants: function() {
		return MyPlant.find({owner: Meteor.userId()}).fetch();
	}
});