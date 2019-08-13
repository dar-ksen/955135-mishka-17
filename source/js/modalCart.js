'use strict';
const ESC_CODE = 27;

var body = document.body;
var modalCart = document.querySelector('.modal-cart');
var openModalCart = document.querySelector('.week-goods__btn');
var cards = document.querySelector('.card-product');

var overlay = document.createElement('div');
overlay.className = 'overlay';
body.appendChild(overlay);

var modalTogle = function () {
  if (modalCart.classList.contains('modal-cart--open')) {
    modalCart.classList.remove('modal-cart--open');
    overlay.classList.remove('overlay--open');
  } else {
    modalCart.classList.add('modal-cart--open');
    overlay.classList.add('overlay--open');
  }
}


overlay.addEventListener('click', function () {
  modalTogle();
});

window.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESC_CODE) {
    modalTogle();
  }
});

//main
if (openModalCart) {
  openModalCart.addEventListener('click', function (evt) {
    evt.preventDefault();
    modalTogle();
  });
}

//catalog
if (cards) {
  cards.addEventListener('click', function (evt) {
    var target = evt.target;
    while (target != cards) {
      if (target.classList.contains('card-product__btn')) {
        evt.preventDefault();
        modalTogle();
        return;
      }
      target = target.parentNode;
    }
  });
}
