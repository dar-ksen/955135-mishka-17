var map;
var image = 'img/icon-map-pin.svg'
function initMap() {
  var coordinates = {lat: 59.9387782, lng: 30.3231967};

  map = new google.maps.Map(document.querySelector('.contacts__map'), {
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
