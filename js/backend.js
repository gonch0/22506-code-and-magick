'use strict';

(function () {

  //Модуль 6 задание 1
  //Функция загрузки данных с сервера
  window.load = function(url, onLoad, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function() {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError ('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function() {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function() {
      onError('Время ожидания ответа с сервера вышло');
    });

    xhr.timeout = 10000;

    xhr.open('GET', url);
    xhr.send();
  };

  //Функция отправки данных на сервер
  window.save = function (data, onLoad) { //onError
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function() {
      onLoad(xhr.response);
    });

    xhr.open('POST', 'https://js.dump.academy/code-and-magick');
    xhr.send(data);

  };



})();
