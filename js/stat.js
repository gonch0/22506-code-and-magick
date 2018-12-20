'use strict';
(function () {
  var CLOUD = {
    width: 420,
    height: 270,
    x: 100,
    y: 10,
    r: 20
  };

  var GAP = {
    value: 10,
    font: 20
  };

  var BAR = {
    width: 40,
    space: 50,
    height: 150
  };


  var renderCloud = function (ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.bezierCurveTo(x, y, x + CLOUD.width/2, y-CLOUD.r, x + CLOUD.width, y);
    ctx.bezierCurveTo(x + CLOUD.width, y, x + CLOUD.width + CLOUD.r, y, x + CLOUD.width, y + CLOUD.height);
    ctx.bezierCurveTo(x + CLOUD.width, y + CLOUD.height, x + CLOUD.width + CLOUD.r, y + CLOUD.height + CLOUD.r, x, y + CLOUD.height);
    ctx.bezierCurveTo(x, y + CLOUD.height, x - CLOUD.r, y+ CLOUD.height+CLOUD.r, x, y);
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

    renderCloud(ctx, CLOUD.x + GAP.value, CLOUD.y + GAP.value, 'rgba(0, 0, 0, 0.7)');
    renderCloud(ctx, CLOUD.x, CLOUD.y, '#fff');
    ctx.fillStyle = '#000';
    ctx.font = '16px PT Mono';
    ctx.fillText ('Ура вы победили!', CLOUD.x + GAP.font, CLOUD.y + GAP.font + GAP.value);
    ctx.fillText ('Список результатов:', CLOUD.x + GAP.font, CLOUD.y + 2*GAP.font + GAP.value);

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
      ctx.fillText(players[i], CLOUD.x + 2*GAP.font + (BAR.width + BAR.space)*i, CLOUD.y + CLOUD.height - 2*GAP.value);

      if (players[i] === 'Вы'){
          ctx.fillStyle = 'rgba(255, 0, 0, 1)';
      } else {
          ctx.fillStyle = 'rgb(0, 0,' + Math.floor(255-35*i)+')';
      }
      ctx.fillRect(CLOUD.x + 2*GAP.font + (BAR.width + BAR.space)*i, CLOUD.height - CLOUD.y - 2*GAP.value, BAR.width, GAP.value-BAR.height*times[i]/maxTime);
      ctx.fillStyle = '#000';
      ctx.fillText(Math.round(times[i]), CLOUD.x + 2*GAP.font + (BAR.width + BAR.space)*i, CLOUD.height - (BAR.height*times[i]/maxTime)-2*GAP.font + GAP.value);
    }
  };
})();
