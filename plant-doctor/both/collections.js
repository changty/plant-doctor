Schema = {};
Collection = {}; 

Sensor = Collection.Sensor = new Meteor.Collection('sensor');
Plant = Collection.Plant = new Meteor.Collection('plant'); 

Schema.Sensor = new SimpleSchema({
	sensor: {
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


Sensor.attachSchema(Schema.Sensor);

