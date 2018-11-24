'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_R = 20;
var GAP = 10;
var FONT_GAP = 20;
var BAR_WIDTH = 40;
var BAR_SPACE = 50;
var BAR_HEIGHT = 150;

var renderCloud = function (ctx, x, y, color) {
	ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.bezierCurveTo(x, y, x + CLOUD_WIDTH/2, y-CLOUD_R, x + CLOUD_WIDTH, y);
    ctx.bezierCurveTo(x + CLOUD_WIDTH, y, x + CLOUD_WIDTH + CLOUD_R, y, x + CLOUD_WIDTH, y + CLOUD_HEIGHT);
	ctx.bezierCurveTo(x + CLOUD_WIDTH, y + CLOUD_HEIGHT, x + CLOUD_WIDTH + CLOUD_R, y+ CLOUD_HEIGHT+CLOUD_R, x, y + CLOUD_HEIGHT);
    ctx.bezierCurveTo(x, y + CLOUD_HEIGHT, x - CLOUD_R, y+ CLOUD_HEIGHT+CLOUD_R, x, y);
    ctx.closePath();
    ctx.fill();
}

var getMaxElement = function (arr) {
	var maxElement = arr[0];
	for (var i = 1; i < arr.length; i++) {
		if (arr[i] > maxElement) {
			maxElement = arr[i];
		}
	}
	if (arr.length === 0) {
		return 0;
	} else {
	return maxElement;
	}
};

window.renderStatistics = function(ctx, players, times) {

	renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
	renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');
	ctx.fillStyle = '#000';
	ctx.font = '16px PT Mono';
	ctx.fillText ('Ура вы победили!', CLOUD_X + FONT_GAP, CLOUD_Y + FONT_GAP + GAP);
	ctx.fillText ('Список результатов:', CLOUD_X + FONT_GAP, CLOUD_Y + 2*FONT_GAP + GAP);

	//Уравнивание длин списков
	while (players.length != times.length) {
		if (players.length > times.length) {
			players.pop();
		} else {
			times.pop();
		}
	}

	ctx.fillStyle = '#000';
	var maxTime = getMaxElement(times);

	for (var i = 0; i < players.length; i++) {
		console.log (players[i]);
		console.log (times[i]);
		ctx.fillStyle = '#000';
		ctx.fillText(players[i], CLOUD_X + 2*FONT_GAP + (BAR_WIDTH + BAR_SPACE)*i, CLOUD_Y + CLOUD_HEIGHT - 2*GAP);

		if (players[i] === 'Вы'){
			ctx.fillStyle = 'rgba(255, 0, 0, 1)';
		} else {
			ctx.fillStyle = 'rgb(0, 0,' + Math.floor(255-35*i)+')';
		}
		ctx.fillRect(CLOUD_X + 2*FONT_GAP + (BAR_WIDTH + BAR_SPACE)*i, CLOUD_HEIGHT - CLOUD_Y - 2*GAP, BAR_WIDTH, GAP-BAR_HEIGHT*times[i]/maxTime);
		ctx.fillStyle = '#000';
		ctx.fillText(Math.round(times[i]), CLOUD_X + 2*FONT_GAP + (BAR_WIDTH + BAR_SPACE)*i, CLOUD_HEIGHT - (BAR_HEIGHT*times[i]/maxTime)-2*FONT_GAP + GAP);
	}
};
