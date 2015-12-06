if (Meteor.isClient) {
	Meteor.subscribe("plants");

  // counter starts at 0
  Session.setDefault('counter', 0);
}

Template.PlantDoctorTemplate.onRendered(function() {
	// create navigation
	var $nav = $('#main-nav');
	$nav.navigation({
		gravity: 'push',
		type: 'overlay',
		maxWidth: '10000px'
	});
	$('#main-nav > ul, header h1').find('a').click(function() {
		$nav.navigation('close');
		$nav.removeClass('fs-navigation-open');
	});

	$('[data-title]').tooltip({
		// direction: "top"
	});
});

Template.PlantDoctorTemplate.helpers({
	myPlants: function() {
		return MyPlant.find({owner: Meteor.userId()}).fetch();
	}
});

window.showNotification = function(msg) {
	var $notification = $('#notification');
	$notification.addClass('show');
	$('#notification-contents').html(msg);

	setTimeout(function() {
		$notification.removeClass('show');
	}, 5000);
}

/*
Template.PlantDoctorTemplate.events({
	"click [data-title]": function (event) {
			alert('jo')
		}
	});
}*/