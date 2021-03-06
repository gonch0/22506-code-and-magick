'use strict';


(function () {
  var WIZARD = {
    names: ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
    surnames: ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'],
    coats: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
    eyes: ['black', 'red', 'blue', 'yellow', 'green'],
    fireball: ['#ee4830', '#30a8ee','#5ce6c0', '#e848d5', '#e6e848'],
  };

  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var setup = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setup.querySelector('.setup-close');

  var userNameInput = setup.querySelector('.setup-user-name');

  var wizardCoatInput = document.querySelector('input[name="coat-color"]');
  var wizardEyesInput = document.querySelector('input[name="eyes-color"]');
  var wizardFireballInput = document.querySelector('input[name="fireball-color"]');

  var wizardCoat = document.querySelector('.wizard-coat');
  var wizardEyes = document.querySelector('.wizard-eyes');
  var wizardFireball = document.querySelector('.setup-fireball-wrap');

  var getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  var onPopupEscPress = function(evt) {
    if (evt.keyCode === ESC_KEYCODE && userNameInput != document.activeElement) {
      closePopup();
    }
  };

  var openPopup = function() {
    setup.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  };

  var closePopup = function() {
    setup.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
    setup.style = '';
  };

  var fillElement = function (element, input, colors) {
    var color = colors[getRandomInt(0, colors.length)];
    element.style = 'background-color:' + color;
    element.style.fill = color;
    input.value = color;
  };

  setupOpen.addEventListener('click', function() {
    openPopup();
  });

  setupOpen.addEventListener('keydown', function(evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      openPopup();
    }
  });

  setupClose.addEventListener('click', function() {
    closePopup();
  });

  setupClose.addEventListener('keydown', function(evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      closePopup();
    }
  });

  userNameInput.addEventListener('invalid', function(evt) {
    if (userNameInput.validity.valueMissing) {
      userNameInput.setCustomValidity('Обязательное поле');
    } else {
      userNameInput.setCustomValidity('');
    }

  });

  wizardCoat.addEventListener('click', function() {
    fillElement(wizardCoat, wizardCoatInput, WIZARD.coats);
  });

  wizardEyes.addEventListener('click', function() {
    fillElement(wizardEyes, wizardEyesInput, WIZARD.eyes);
  });

  wizardFireball.addEventListener('click', function() {
    fillElement(wizardFireball, wizardFireballInput, WIZARD.fireball);
  });

}());
