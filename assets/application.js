// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require bootstrap
//= require markerclusterer
//= require underscore-min.js
//= require jquery.timepicker.min
//= require_tree .

$(document).ready(function() {
  $("#congregation-map-thumb").click(function(e) {
    e.preventDefault();

    $(this).hide();
    $("#congregation-map").show();

    initializeMap();
  });

  $('.timepicker').timepicker({
    useSelect: true,
    className: 'form-control',
    minTime: '8:00am',
    maxTime: '20:00pm',
  });
});

function paintCongregationMap(lat, lng, name) {
  var congregation = { lat: lat, lng: lng };

  var mapOptions = {
    center: congregation,
    scrollwheel: true,
    fullscreenControl: true,
    fullscreenControlOptions: { position: google.maps.ControlPosition.BOTTOM_RIGHT },
    zoom: 17,
    zoomControl: true,
    zoomControlOptions: { position: google.maps.ControlPosition.LEFT_TOP }
  };

  var map = new google.maps.Map(document.getElementById('congregation-map'), mapOptions);

  var marker = new google.maps.Marker({
    position: congregation,
    map: map,
    title: name
  });

  // ---------------------------
  // Geolocalizacao
  // ---------------------------
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {

      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      var marker = new google.maps.Marker({
        position: pos,
        map: map,
        title: "Você está aqui",
        icon: "//maps.google.com/mapfiles/ms/micons/green-dot.png"
      });

    }, function () {
      console.log('Error: The Geolocation service failed.');
    });
  } else {
    console.log('Error: Your browser doesnt support geolocation.');
  }
}

//
// Facebook Analytics
//
window.fbAsyncInit = function() {
  FB.init({
    appId      : '406625156198817',
    xfbml      : true,
    version    : 'v3.0'
  });
  FB.AppEvents.logPageView();
};

(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

