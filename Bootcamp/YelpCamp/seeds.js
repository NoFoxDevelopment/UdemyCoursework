const mongoose 	= require('mongoose'),
	Campground 	= require('./models/campground'),
	Comment 	= require('./models/comment');

const data = [
	{
		name: "Cloud's Rest",
		image: "https://cdn.pixabay.com/photo/2017/08/04/20/04/camping-2581242__340.jpg",
		description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium."
	},
	{
		name: "Devil's Tombstone",
		image: "https://cdn.pixabay.com/photo/2015/07/10/17/24/night-839807__340.jpg",
		description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium."
	},
	{
		name: "Running Elk",
		image: "https://cdn.vox-cdn.com/thumbor/TK1PUJn0DMe-xfZqp4yU5aPtMto=/0x271:5225x3210/1600x900/cdn.vox-cdn.com/uploads/chorus_image/image/54137641/camping_tents.0.jpg",
		description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium."
	}
];

function seedDB() {
	//remove all campgrounds
	Campground.remove({}, function(err) {
		err ? console.log(err) : console.log('campgrounds db removed');
		//add a few campgrounds
		data.forEach(function(seed) {
			Campground.create(seed, function(err, campground) {
				err ? console.log(err) : console.log('added a campground');
				//TODO: add a few comments
				Comment.create(
					{
						text: "This place is great! Wish there was internet though...",
						author: "Homer"
					}, function(err, comment) {
						err ? 
							console.log(err) 
						: ( 
							campground.comments.push(comment._id),
							campground.save(),
							console.log('added comment to campground')
							);
					});
			});
		});
	});
};

module.exports = seedDB;