$(document).on('ready', function(){
	"use strict";

	var API_KEY = '25ba1d228c97c25bfacf83fe70a1ec60';
	var url = 'http://gateway.marvel.com:80/v1/public/characters';

	var $searchInput = $('#search');
	var $searchBtn = $('#searchBtn');
	var $form = $('#form');
	var $name = $('#name');
	var $image = $('#image');
	var $description = $('#description');
	var $preloader = $('.preloader');
	var $seriesList = $('ul#series-list');
	var series = [];
	var data = {}; // mustache source
	
	$searchInput.focus();
	
	//clear all the fields
	clearFields($name, $image, $description);

	$form.on('submit', function(e){
		e.preventDefault();

		$searchInput.focus();

		hideFields($name, $image, $description, $seriesList);
		clearFields($name, $image, $description, series);
		$preloader.show();
		
		function loadHero(data) {
			var template = $('#template').html();
			Mustache.parse(template); //cache the template for future uses
			var rendered = Mustache.render(template, data);
			$('#target').html(rendered);
		}		
		
		$.ajax({
			type: 'GET',
			url: url + '?' + 'name=' + $searchInput.val() + '&' +'apikey=' + API_KEY,

			success: function(result) {
				var hero = result.data.results[0];
				showFields($name, $image, $description, $seriesList);

				if (typeof hero === "undefined") {
					hideFields($name, $image, $description, $seriesList);
					$name.text("humm, try it again... :/");
					$name.show();
				} else {
					data.name = hero.name;
					
					data.image = hero.thumbnail.path + "." + hero.thumbnail.extension;
					data.description = hero.description;
					data.series = hero.series.items;  // getting the series realted with this character
					
					loadHero(data); // Render mustache template with the data
				}
			},
			error: function(err) {
				console.error(err);
			},
			complete: function() {
				$preloader.hide();
				$searchInput.val('');
			}
		});
	});

	function clearFields($name, $image, $description, series) {
		$name.text('');
		$image.attr('src', 'images/placeholder.png');
		$description.text('');
	}
	function hideFields($name, $image, $description, $seriesList) {
		$name.hide();
		$image.hide();
		$description.hide();
		$seriesList.hide();
	}
	function showFields($name, $image, $description, $seriesList) {
		$name.show();
		$image.show();
		$description.show();
		$seriesList.show();
	}		
});

/*Promise.resolve($.get(url))
	.then(function(results){
		var item = results.data.results[0];

		var name 	= item.name;
		var avatar	= item.thumbnail.path + "." + item.thumbnail.extension;
		var description	= item.description;

		$('h1')[0].innerHTML = name;
		$('img')[0].src = avatar;
		$('p')[0].innerHTML = description;
	})
	.catch(function(err){
		console.error(err.statusText);
	});*/