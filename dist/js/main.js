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

	$searchInput.focus();

	//clear all the fields
	clearFields($name, $image, $description);

	$form.on('submit', function(e){
		e.preventDefault();

		$searchInput.focus();

		hideFields($name, $image, $description);
		clearFields($name, $image, $description);
		$preloader.show();

		$.ajax({
			type: 'GET',
			url: url + '?' + 'name=' + $searchInput.val() + '&' +'apikey=' + API_KEY,

			success: function(data) {
				var hero = data.data.results[0];
				showFields($name, $image, $description);
				if (typeof hero === "undefined") {
					$name.text("humm, try it again... :/");
				} else {
					$name.text(hero.name);
					$image.attr('src', hero.thumbnail.path + '.' + hero.thumbnail.extension);
					$description.text(hero.description);
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

	function clearFields($name, $image, $description) {
		//$name.text('');
		$image.attr('src', 'images/placeholder.png');
		$description.text('');
	}
	function hideFields($name, $image, $description) {
		$name.hide();
		$image.hide();
		$description.hide();
	}
	function showFields($name, $image, $description) {
		$name.show();
		$image.show();
		$description.show();
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