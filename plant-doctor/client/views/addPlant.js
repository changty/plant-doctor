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
		var name = $('.name').val(); 

		if(plant != '' && engine != '' && name != '') {
			MyPlant.insert({
				plantId: plant,
				engineId: engine
			});

			$('.plant-select').val('1'); 
			$('.engine').val('');
			$('.plant-name').val('');

		}
	},

	'change .plant-select': function(e) {
		var img = Plant.find({id: $(".plant-select option:selected").val()}, {fields: {img: 1}}).fetch(); 
		var $plant = $('.plant');
		var name = $(".plant-select option:selected").text();
		// $('.name').html(name);
		$('.plant-name').val(name);

		$plant
			.addClass('fadeOutLeft')
			.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
				if(img[0].img) {
					$('.plant-image').attr('src', img[0].img); 
					// $('.plant-image').css({'width': '30vmin', 'height': '30vmin'});
				} 
				else {
					$('.plant-image').attr('src', '/img/default_plant.svg'); 
					// $('.plant-image').css({'width': '30vmin', 'height': '30vmin'});
				}

				$plant.removeClass('fadeOutLeft').addClass('fadeInRight');
			});


	}
});

Template.addPlant.onRendered(function() {
	var name = $(".plant-select option:selected").text();
	$('.plant-name').val(name);
});