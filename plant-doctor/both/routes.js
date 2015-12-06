Router.configure({
	layoutTemplate: 'PlantDoctorTemplate'
});

Router.route('/', function() {
	this.render('home');	
}, {
	name: 'home'
});

Router.route('/addPlant', function() {
	this.render('addPlant');	
}, {
	name: 'addPlant'
});


Router.route('/plant/:engineId', function() {
	var engine = this.params.engineId + ''; 
	var plant = MyPlant.find({'engineId': engine}).fetch(); 
	var plantId = plant[0].plantId + ''; 
	var plantData = Plant.find({'id': plantId}).fetch()[0];

	this.render('plant', {'data' : {engineId: this.params.engineId, 'plantData': plantData}});	
},
{
	name: 'plant'
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

	            var engine  = data[0].engine.pId; 
	            var senses = data[0].senses; 
	            for(var i=0; i<senses.length; i++) {
	            	var sensor = sidToSensorName(senses[i].sId); 

		            Sensor.insert({
		            	engine: engine,
		            	sensor: sensor.name,
		            	unit: sensor.unit, 
		            	value: senses[i].val,
		            	ts: senses[i].ts
		            }, {validate: false});

	            }

            }

        }
    });
});

// Helper function to map sId to name and unit
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