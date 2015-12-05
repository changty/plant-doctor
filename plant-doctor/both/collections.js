Schema = {};
Collection = {}; 

Sensor = Collection.Sensor = new Meteor.Collection('sensor');
Plant = Collection.Plant = new Meteor.Collection('plant'); 
MyPlant = Collection.MyPlant = new Meteor.Collection('myplant'); 


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

	img: {
		type: String,
		optional: true
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

Schema.MyPlant = new SimpleSchema({
	plantId: {
		type: Number
	},

	owner: {
	    type: String,
	    autoValue: function(){
			if (this.isInsert && (!this.isSet || this.value.length === 0)) {
	    		return this.userId;
	    	}
	    },
	    optional: true
	},

	engineId: {
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

