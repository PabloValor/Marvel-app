var API_KEY = '25ba1d228c97c25bfacf83fe70a1ec60';

var url = 'http://gateway.marvel.com:80/v1/public/characters?name=wolverine&apikey=' + API_KEY;

$.get(url)
	.done(function(results){
		var item = results.data.results[0];

		var name 	= item.name;
		var avatar	= item.thumbnail.path + "." + item.thumbnail.extension;
		var description	= item.description;

		$('h1')[0].innerHTML = name;
		$('img')[0].src = avatar;
		$('p')[0].innerHTML = description;
	});