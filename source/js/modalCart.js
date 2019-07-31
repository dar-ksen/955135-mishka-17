'use strict';
const escCode = 27;

var modalCart = document.querySelector('.modal-cart');
var mist = document.querySelector('.mist');
var openModalCart = document.querySelector('.week-goods__btn');
var cards = document.querySelector('.card-product');

var modalOpen = function () {
  modalCart.classList.add('modal-cart--open');
  mist.classList.add('mist--open');
}

var modalClose = function () {
  modalCart.classList.remove('modal-cart--open');
  mist.classList.remove('mist--open');
}

mist.addEventListener('click', function () {
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
console.log(openModalCart);
if (openModalCart) {
  openModalCart.addEventListener('click', function (evt) {
    evt.preventDefault();
    modalOpen();
  });
}

//catalog
console.log(cards);
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
