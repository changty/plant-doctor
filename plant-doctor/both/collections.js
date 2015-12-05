Schema = {};
Collection = {}; 

Device = Collection.Device = new Meteor.Collection('device');
Plant = Collection.Plant = new Meteor.Collection('plant'); 

Schema.Device = new SimpleSchema({
	type: {
		type: String
	},
	name: {
		type: String
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

	ip: {
		type: String,
		regEx: SimpleSchema.RegEx.IP
	}

});


Device.attachSchema(Schema.Device);

