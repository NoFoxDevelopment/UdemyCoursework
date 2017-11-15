var movies = [
	{
		title: 'Boondock Saints',
		rating: 4,
		hasWatched: true,
	},
	{
		title: 'Django Unchained',
		rating: 4,
		hasWatched: true,
	},
	{
		title: 'Harlem Nights',
		rating: 5,
		hasWatched: false,
	},
	{
		title: 'Smurfs',
		rating: 3.5,
		hasWatched: false,
	}
];

function watchList(mov) {
	for (var i=0; i<mov.length; i++) {
		var str = '';
		if (mov[i].hasWatched === true) {
			str = 'have seen';
		} else {
			str = 'have not seen';
		}
		console.log('You ' + str + ' ' + mov[i].title + ' - ' + mov[i].rating + ' stars.')
	}
}