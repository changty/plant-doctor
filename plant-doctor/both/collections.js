Schema = {};
Collection = {}; 

Sensor = Collection.Sensor = new Meteor.Collection('sensor');
Plant = Collection.Plant = new Meteor.Collection('plant'); 

Schema.Sensor = new SimpleSchema({
	engine: {
		type: String
	},

	sensor: {
		type: String
	},

	ts: {
		type: String
	},

	unit: {
		type: String
	},

	value: {
		type: Number,
		decimal: true
	},

	createdAt: {
	  type: Date,
	  autoValue: function() {
	    if (this.isInsert) { 	
	      return new Date;
	    } else if (this.isUpsert) {
	      return {$setOnInsert: new Date};
	    } else {
	      this.unset();
	    }
	  }
	},

});

Schema.Plant = new SimpleSchema({
	id: {
		type: String
	},

	name: {
		type: String
	},

	watering: {
		type: String
	},

	misting: {
		type: String
	},

	temperature: {
		type: String
	},

	light: {
		type: String
	},

	createdAt: {
	  type: Date,
	  autoValue: function() {
	    if (this.isInsert) { 	
	      return new Date;
	    } else if (this.isUpsert) {
	      return {$setOnInsert: new Date};
	    } else {
	      this.unset();
	    }
	  }
	},

});


Plant.attachSchema(Schema.Plant);
Sensor.attachSchema(Schema.Sensor);

