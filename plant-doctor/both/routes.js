Router.configure({
	layoutTemplate: 'PlantDoctorTemplate'
});

Router.route('/', function() {
	this.render('home');	
}, {
	name: 'home'
});

Router.map(function() {
    this.route('dataFromSensors', {
        path: '/api/sendData',
        where: 'server',
        action: function() {
            // GET, POST, PUT, DELETE
            var requestMethod = this.request.method;
            console.log("Request method:", requestMethod); 
            if(requestMethod === 'POST') {

	           	// Data from a POST request
	            var requestData = this.request.body;
	            // Could be, e.g. application/xml, etc.
	            this.response.writeHead(200, {'Content-Type': 'text/html'});
	            this.response.end('<html><body>Your request was a ' + requestMethod + '</body></html>');

            }

        }
    });
});