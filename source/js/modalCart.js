'use strict';
const escCode = 27;

var modalCart = document.querySelector('.modal-cart');
var overlay = document.querySelector('.overlay');
var openModalCart = document.querySelector('.week-goods__btn');
var cards = document.querySelector('.card-product');

var modalOpen = function () {
  modalCart.classList.add('modal-cart--open');
  overlay.classList.add('overlay--open');
}

var modalClose = function () {
  modalCart.classList.remove('modal-cart--open');
  overlay.classList.remove('overlay--open');
}

overlay.addEventListener('click', function () {
  modalClose();
});

window.addEventListener('keydown', function (evt){
  if (evt.keyCode === escCode) {
    evt.preventDefault();
    if (modalCart.classList.contains('modal-cart--open')) {
      modalClose();
    }
  }
});

//main
if (openModalCart) {
  openModalCart.addEventListener('click', function (evt) {
    evt.preventDefault();
    modalOpen();
  });
}

//catalog
if (cards) {
  cards.addEventListener('click', function (evt) {
    var target = evt.target;
    while (target != cards) {
      if (target.classList.contains('card-product__btn')) {
        evt.preventDefault();
        modalOpen();
        return;
      }
      target = target.parentNode;
    }
  });
}
