var geocoder;
var newLatitude, newLongitude;
var map1, map2;
var marker1, marker2;

//set up for default maps to be loaded initially(on page loaded)
function initialize() {
    geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(51.5286416, -0.1015987);
    var mapOptions = {
        zoom: 4,
        center: latlng
    }
    map1 = new google.maps.Map(document.getElementById('map-canvas1'), mapOptions);
    map2 = new google.maps.Map(document.getElementById('map-canvas2'), mapOptions);
}

function codeAddress() {

    var address = document.getElementById('address').value;

    geocoder.geocode({
        'address': address
    }, function(results, status) {

        //Execute this function only if valid results are returned
        if (status == google.maps.GeocoderStatus.OK) {

            //setting up map1
            //Finding position and placing marker
            map1.setCenter(results[0].geometry.location);
            marker1 = new google.maps.Marker({
                map: map1,
                position: results[0].geometry.location
            });
            console.log(results[0]);
            //setting up map2
            //Finding geo-coordinates of opposite place - newLatitude and newLongitude
            newLatitude = -1 * results[0].geometry.location.G;

            if (results[0].geometry.location.K < 0) {
                newLongitude = 180 + results[0].geometry.location.K;
            } else {
                newLongitude = results[0].geometry.location.K - 180;
            }
            console.log(newLatitude, newLongitude);
            map2.setCenter({
                lat: newLatitude,
                lng: newLongitude
            });
            marker2 = new google.maps.Marker({
                map: map2,
                position: {
                    lat: newLatitude,
                    lng: newLongitude
                }
            });

        } else {
            alert('Query was not successful for the following reason: ' + status);
        }
    });
}

//call initialize function on page load
google.maps.event.addDomListener(window, 'load', initialize);

//execute codeAddress() function when user presses return(enter) after filling in query 
var query = document.getElementById('address');
query.addEventListener("keypress", function(e) {
    if (e.keyCode == 13) {
        codeAddress();
        //clears search field
        query.value = "";
        // Clear the previous markers
        if (marker1)
            marker1.setMap(null);
        if (marker2)
            marker2.setMap(null);
    }
});