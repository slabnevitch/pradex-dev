function initMap() {
  mapShop = new google.maps.Map(document.getElementById('footer-map-shop'), {
    center: {lat: 55.746512, lng: 37.392270},
    zoom: 18,
    disableDefaultUI: true, //отмена всех дефолтных элементов управления

     // добавление необходимых элементов управления вручную
     zoomControl: true,
     mapTypeControl: true,
     fullscreenControl: true
     // styles: gmapStyles
      // gestureHandling: 'none' //запрет на прокручивание карты
    });

  mapOffices = new google.maps.Map(document.getElementById('footer-map-offices'), {
    center: {lat: 50.029116, lng: 36.328036},
    zoom: 18,
    disableDefaultUI: true, //отмена всех дефолтных элементов управления

     // добавление необходимых элементов управления вручную
     zoomControl: true,
     mapTypeControl: true,
     fullscreenControl: true
     // styles: gmapStyles
      // gestureHandling: 'none' //запрет на прокручивание карты
    });

  var image = {
    url: '../img/icons/map-marker.png'
          // size: new google.maps.Size(50, 50),
          // origin: new google.maps.Point(0, 0),
          // anchor: new google.maps.Point(0, 32)

        };

    var marker = new google.maps.Marker({
          position: {lat: 55.746512, lng: 37.392270},
          icon: image 
        });

    marker.setMap(mapShop);
}