var five = require('johnny-five');
var board = five.Board();

var staffHappiness = [];
staffHappiness.record = function(item, callback) {
	turnLedsOff();

	item.temp = currentTemp;

	console.log(item.rating, item.temp);
	staffHappiness.push(item);

	callback();
	setTimeout(turnLedsOff, 200);
}
var currentTemp;

var greenButton;
var yellowButton;
var redButton;

var redLed;
var blueLed;
var greenLed;

var tempSensor;

board.on('ready', function() {
	greenButton = new five.Button({ pin: 2, invert: true });
	yellowButton = new five.Button({ pin: 3, invert: true });
	redButton = new five.Button({ pin: 5, invert: true });

	greenButton.on('down', recordGoodRating);
	yellowButton.on('down', recordAverageRating);
	redButton.on('down', recordBadRating);

	redLed = new five.Led(9);
	blueLed = new five.Led(10);
	greenLed = new five.Led(11);

	tempSensor = new five.Sensor('A0');

	tempSensor.on('data', function() {
		currentTemp = analogToCelsius(this.value);
	});
});

function recordGoodRating() {
	staffHappiness.record({ rating: 'Good' }, function() {
		greenLed.on();
	});
}

function recordAverageRating() {
	staffHappiness.record({ rating: 'Average' }, function() {
		greenLed.on();
		redLed.on();
	});
} 

function recordBadRating() {
	staffHappiness.record({ rating: 'Bad' }, function() {
		redLed.on();
	});
}

function turnLedsOff() {
	redLed.off();
	greenLed.off();
	blueLed.off();
}

function analogToCelsius(analogValue) {
    // For the TMP36 sensor specifically
    return ((analogValue * 0.004882814) - 0.5) * 100;
 }