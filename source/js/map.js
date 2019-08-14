var map;
var image = 'img/icon-map-pin.svg';
var mapContainer = document.querySelector('.contacts__map');

mapContainer.classList.remove('contacts__map--nojs');

function initMap() {
  var coordinates = {lat: 59.9387782, lng: 30.3231967};
  map = new google.maps.Map(mapContainer, {
    center: coordinates,
    zoom: 18
  });

  marker = new google.maps.Marker({
    position: coordinates,
    map: map,
    icon: image,
    animation: google.maps.Animation.DROP
  });
}
