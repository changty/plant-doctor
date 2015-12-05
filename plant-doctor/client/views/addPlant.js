Template.addPlant.helpers({
	plant: function() {
		return Plant.find({}).fetch();
	}
});

Template.addPlant.events({
	'click .addPlant': function(e) {
		e.preventDefault();

		var plant = $('.plant-select').val(); 
		var engine = $('.engine').val(); 

		if(plant != '' && engine != '') {
			MyPlant.insert({
				plantId: plant,
				engineId: engine
			});

			$('.plant-select').val('1'); 
			$('.engine').val('');

		}
	},

	'change .plant-select': function(e) {
		var img = Plant.find({id: $(".plant-select option:selected").val()}, {fields: {img: 1}}).fetch(); 

		$('.plant').addClass('fadeOutLeft');
		$('.plant').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {

			$('.name').html($(".plant-select option:selected").text());

			if(img[0].img) {
				$('.plant-image').attr('src', img[0].img); 
				// $('.plant-image').css({'width': '30vmin', 'height': '30vmin'});
			} 
			else {
				$('.plant-image').attr('src', '/img/default_plant.svg'); 
				// $('.plant-image').css({'width': '30vmin', 'height': '30vmin'});
			}
			$('.plant').removeClass('fadeOutLeft');
			$('.plant').addClass('fadeInRight');
		});


	}
});

Template.addPlant.onRendered(function() {



});