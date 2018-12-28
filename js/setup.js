'use strict';


(function () {

  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var setup = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setup.querySelector('.setup-close');

  var userNameInput = setup.querySelector('.setup-user-name');

  var wizardCoatInput = document.querySelector('input[name="coat-color"]');
  var wizardEyesInput = document.querySelector('input[name="eyes-color"]');


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


  // Модуль 7

  var wizards = [];
  var coatColor;
  var eyesColor;

  var getRank = function (wizard) {
    var rank = 0;

    if (wizard.colorCoat === coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === eyesColor) {
      rank += 1;
    }

    return rank;
  };

  var namesComparator = function (left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };


  var updateWizards = function () {
    window.render(wizards.sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = namesComparator(left.name, right.name);
      }
      return rankDiff;
    }));
  };

  window.wizard.onEyesChange = window.debounce(function (color) {
    eyesColor = color;
    updateWizards();
  });

  window.wizard.onCoatChange = window.debounce(function (color) {
    coatColor = color;
    updateWizards();
  });

  var errorClose = document.querySelector('.error-close');
  var errorMessage = document.querySelector('.error');

  errorClose.addEventListener('click', function() {
    closeErrorMessage();
  });

  var closeErrorMessage = function() {
    errorMessage.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
    errorElement.style = '';
  };


  var onError = function (message) {
    document.querySelector('.error').classList.remove('hidden');
  };

  //Загрузка данных с сервера
  var onLoad = function (data) {
    wizards = data;
    updateWizards();
  };

  window.load('https://js.dump.academy/code-and-magick/data', onLoad, onError);


  //Отправка данных на сервер
  var form = document.querySelector('.setup-wizard-form');
  form.addEventListener('submit', function (evt) {
    window.save (new FormData(form), function (response) {
      setup.classList.add('hidden');
    });
    evt.preventDefault();
  });

}());
