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
	            var data = this.request.body;

	            console.log("request data", data);
	            console.log("senses: ", data[0].senses);

	            var engine  = data[0].engine; 
	            var senses = data[0].senses; 
	            for(var i=0; i<senses.length; i++) {
	            	var sensor = sidToSensorName(senses[i]); 
	            	console.log("Saving...", engine,  sensor);
		            Sensor.insert({
		            	engine: engine,
		            	sensor: sensor.name,
		            	unit: sensor.unit, 
		            	value: senses[i].val,
		            	ts: senses[i].ts
		            });

	            }





	            // // Could be, e.g. application/xml, etc.
	            // this.response.writeHead(200, {'Content-Type': 'text/html'});
	            // this.response.end('<html><body>Your request was a ' + requestMethod + '</body></html>');

            }

        }
    });
});

function sidToSensorName(sid) {
	switch(sid) {
		case '0x00060100': return {name: 'Temperature', unit: 'C'}; 
				break; 
		case '0x00030200': return {name: 'Battery', unit: '%'}; 
				break; 
		case '0x00060200': return {name: 'Humidity', unit: '%'}; 
				break; 
		case '0x00060400': return {name: 'Pressure', unit: 'hPa'}; 
				break; 
		case '0x00060300': return {name: 'light', unit: 'lux'}; 
				break; 		
		default: return {name: '', unit: ''};
	}
}