`use strict`;
var menu = document.querySelector('.main-nav');
var toggle = menu.querySelector('.main-nav__toggle');

menu.classList.remove('main-nav--nojs');

toggle.addEventListener('click', function (evt) {
  evt.preventDefault();
  if (menu.classList.contains('main-nav--close')) {
    menu.classList.remove('main-nav--close');
  } else {
    menu.classList.add('main-nav--close');
  }
});
