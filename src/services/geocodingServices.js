export async function getAddress(loc) {
  if (!window.google) {
    return 'Maps Require Internet Connection';
  } else {
    var geocoder = new window.google.maps.Geocoder();

    return new Promise(resolve => {
      // console.log(loc);
      var latlng = {
        lat: parseFloat(loc.latitude),
        lng: parseFloat(loc.longitude),
      };
      // console.log(latlng, 'la');
      geocoder.geocode({ location: latlng }, function(results, status) {
        if (status === 'OK') {
          if (results[0]) {
            resolve(results[0].formatted_address);
          }
        } else {
          window.alert('Geocoder failed due to: ' + status);
        }
      });
    });
  }
}
// console.log(
//   getAddress({ latitude: 27.7073961, longitude: 85.327287 }),
//   'jjfkjkfdkgfd'
// );
