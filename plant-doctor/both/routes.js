Router.configure({
	layoutTemplate: 'PlantDoctorTemplate'
});

Router.route('/', function() {
	this.render('home');	
}, {
	name: 'home'
});