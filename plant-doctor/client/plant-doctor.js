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

	$('#btn-close-dialog').click(function() {
		$('body').removeClass('no-scroll');
		$('#dialog').removeClass('show');
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
	}, 4000);
}

window.showDialog = function(title, msg) {
	$('body').addClass('no-scroll');
	var $dialog = $('#dialog');
	$dialog.find('.contents > h2').html(title).end()
		.find('.contents > div').html(msg);
	$dialog.addClass('show');
}


/*
Template.PlantDoctorTemplate.events({
	"click [data-title]": function (event) {
			alert('jo')
		}
	});
}*/