`use strict`;
var modalCart = document.querySelector('.modal-cart');
var mist = document.querySelector('.mist');

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

//main
if (document.querySelector('.week-goods__btn')) {
  var openModalCart = document.querySelector('.week-goods__btn');
  openModalCart.addEventListener('click', function (evt) {
    evt.preventDefault();
    modalCart.classList.add('modal-cart--open');
    mist.classList.add('mist--open');
  });
}

//catalog
if (document.querySelector('.card-product')) {
  var carts = document.querySelector('.card-product');

  carts.onclick = function(evt) {
    var target = evt.target;
    while (target != carts) {
      if (target.classList.contains('card-product__btn')) {
        evt.preventDefault();
        modalCart.classList.add('modal-cart--open');
        mist.classList.add('mist--open');
        return;
      }
      target = target.parentNode;
    }
  }
}
