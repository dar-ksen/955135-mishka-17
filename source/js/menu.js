'use strict';
var menu = document.querySelector('.main-nav');
var toggle = menu.querySelector('.main-nav__toggle');

menu.classList.remove('main-nav--nojs');

toggle.addEventListener('click', function (evt) {
  evt.preventDefault();
  menu.classList.toggle('main-nav--close');
});
