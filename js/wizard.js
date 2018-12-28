'use strict';
(function () {

  var wizardCoat = document.querySelector('.wizard-coat');
  var wizardEyes = document.querySelector('.wizard-eyes');

  var COAT_COLORS = [
    'rgb(146, 100, 161)',
    'rgb(215, 210, 55)',
    'rgb(241, 43, 107)',
    'rgb(101, 137, 164)',
    'rgb(0, 0, 0)',
    'rgb(215, 210, 55)',
    'rgb(56, 159, 117)',
    'rgb(241, 43, 107)'
  ];

  var EYES_COLORS = [
    'red',
    'orange',
    'yellow',
    'green',
    'lightblue',
    'blue',
    'purple'
  ];

  var wizard = {
    onEyesChange: function (color) {},
    onCoatChange: function (color) {}
  };

  var getRandomElement = function (array) {
    var randomElementIndex = Math.floor(Math.random() * array.length);
    return array[randomElementIndex];
  };

  var wizardElement = document.querySelector('.setup-wizard');

  wizardCoat.addEventListener('click', function () {
    var newColor = getRandomElement(COAT_COLORS);
    this.style.fill = newColor;
    wizard.onCoatChange(newColor);
  });


  wizardEyes.addEventListener('click', function () {
    var newColor = getRandomElement(EYES_COLORS);
    this.style.fill = newColor;
    wizard.onEyesChange(newColor);
  });

  return window.wizard = wizard;
})();
