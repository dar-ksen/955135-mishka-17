`use strict`;
var modalCart = document.querySelector('.modal-cart');
var openModalCart = document.querySelector('.week-goods__btn');
//var closeModalCart = modalCart.querySelector('.modal-close');
var mist = document.querySelector('.mist');

openModalCart.addEventListener('click', function (evt) {
  evt.preventDefault();
  modalCart.classList.add('modal-cart--open');
  mist.classList.add('mist--open');
});

mist.addEventListener('click', function () {
  modalCart.classList.remove('modal-cart--open');
  mist.classList.remove('mist--open');
});

window.addEventListener('keydown', function (evt){
  if (evt.keyCode === 27) {
    evt.preventDefault();
    if (modalCart.classList.contains('modal-cart--open')) {
      modalCart.classList.remove('modal-cart--open');
      mist.classList.remove('mist--open');
    }
  }
});
