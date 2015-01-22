var five = require('johnny-five');
var board = five.Board();

var staffHappiness = [];
staffHappiness.add = function(item) {
	console.log(item.rating);
	staffHappiness.push(item);
}

var greenButton; //good
var yellowButton; //average
var redButton; //bad

board.on('ready', function() {
	greenButton = new five.Button({ pin: 2, invert: true });
	yellowButton = new five.Button({ pin: 3, invert: true });
	redButton = new five.Button({ pin: 5, invert: true });

	greenButton.on('down', recordGoodRating);
	yellowButton.on('down', recordAverageRating);
	redButton.on('down', recordBadRating);
});

function recordGoodRating() {
	staffHappiness.add({ rating: 'Good' });
}

function recordAverageRating() {
	staffHappiness.add({ rating: 'Average' });
} 

function recordBadRating() {
	staffHappiness.add({ rating: 'Bad' });
}