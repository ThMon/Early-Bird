
var img = document.getElementById('cover');
var title = document.getElementById('title');
var desc = document.getElementById('description');
var star = document.getElementById('etoile');
var note = document.getElementById('note');
var next = document.getElementById('next');
var prev = document.getElementById('preview');
var index = 0;

console.log(index);
//appel de l'API en JS natif
ajaxGet("https://api.themoviedb.org/3/movie/upcoming?api_key=e082a5c50ed38ae74299db1d0eb822fe",function (reponse) {
 	var api = JSON.parse(reponse); 
 	var reponse = api.results;  // stockage des films dans un tableau d'objets
 	console.log(reponse);
 	var moyenne = Math.round(reponse[index].vote_average);

 	// initilisation à l'index 0 du film en cours
 	img.src = "https://image.tmdb.org/t/p/w500"+reponse[index].backdrop_path+""; 
 	title.textContent = reponse[index].original_title;
 	desc.textContent = reponse[index].overview;
 	note.textContent = "Note: "+moyenne+"/10";
 	for( var j = 0; j < moyenne; j++){
 		$('#etoile').append( '<i class="fa fa-star" aria-hidden="true"></i>');
 	}

 	//création de la liste des films en JS natif
 	var container = document.querySelector('#nav');

 	for( var i = 0; i < reponse.length; i++){
           var film = reponse[i].original_title;

           $('#nav').append('<li data-index="'+i+'""><a href="#">'+film+'</a></li>');

           //façon native
           /*var li = document.createElement('li');
           var films = document.createTextNode(film);
           li.appendChild(films);
           li.setAttribute('data-index',i);
           container.appendChild(li);*/
         }

    // affiche le film suivant quand clique sur flèche utilisation jQuery
 	function goToNext() {
		if(index < reponse.length-1) {
			index ++;
			console.log(index);
		} else {
			index = 0;
			console.log(index);

		}
		moyenne = Math.round(reponse[index].vote_average);
		img.src = "https://image.tmdb.org/t/p/w500"+reponse[index].backdrop_path+"";
 		title.textContent = reponse[index].original_title;
 		desc.textContent = reponse[index].overview;
 		note.textContent = "Note: "+moyenne+"/10";
 		$("#etoile").empty();
	 		for( var j = 0; j < moyenne; j++){
	 		$('#etoile').append( '<i class="fa fa-star" aria-hidden="true"></i>');
	 	}
	}

	function goToPreview() { 
		if (index > 0) {
			index --;
			console.log(index);
		} else {
			index = reponse.length - 1;
			console.log(index);
		}
		moyenne = Math.round(reponse[index].vote_average);
		img.src = "https://image.tmdb.org/t/p/w500"+reponse[index].backdrop_path+"";
	 	title.textContent = reponse[index].original_title;
	 	desc.textContent = reponse[index].overview;
	 	note.textContent = "Note: "+moyenne+"/10";
	 	$("#etoile").empty();
	 	for( var j = 0; j < moyenne; j++){
	 	$('#etoile').append( '<i class="fa fa-star" aria-hidden="true"></i>');
	 	} 
	}

	function selectOnList() {
		var data = $(this).data('index');
		var moy = Math.round(reponse[data].vote_average);
		console.log(data);
		img.src = "https://image.tmdb.org/t/p/w500"+reponse[data].backdrop_path+"";
	 	title.textContent = reponse[data].original_title;
	 	desc.textContent = reponse[data].overview;
	 	note.textContent = "Note: "+moy+"/10";
	 	$("#etoile").empty();
	 	for( var j = 0; j < moy; j++){
	 	$('#etoile').append( '<i class="fa fa-star" aria-hidden="true"></i>');
	 	}
	}



	$('#next').click(goToNext);
	$('#preview').click(goToPreview);
	$('li').click(selectOnList);
	/* version JS native
	next.addEventListener('click', goToNext);
	prev.addEventListener('click', goToPreview);
	 */

 }); 
