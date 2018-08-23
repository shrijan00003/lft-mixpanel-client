export async function initMap(loc) {
  var geocoder = new window.google.maps.Geocoder();
  let latlngArr = [];

  return new Promise(resolve => {
    let array = [];
    for (let input in loc) {
      var latlng = {
        lat: parseFloat(loc[input].latitude),
        lng: parseFloat(loc[input].longitude),
      };
      latlngArr.push(Object.values(latlng));

      geocoder.geocode({ location: latlng }, function(results, status) {
        if (status === 'OK') {
          if (results[0]) {
            let countryName = results[0].formatted_address.split(',');

            array.push(countryName[countryName.length - 1].trim());
            if (array.length === loc.length) {
              let countries = [],
                users = [],
                prev;

              array.sort();
              for (let i = 0; i < array.length; i++) {
                if (array[i] !== prev) {
                  countries.push(array[i]);
                  users.push(1);
                } else {
                  users[users.length - 1]++;
                }
                prev = array[i];
              }

              let geoArray = {
                array,
                latlngArr,
                countries,
                users,
              };

              resolve(geoArray);
            }
          } else {
            window.alert('No results found');
          }
        } else {
          window.alert('Geocoder failed due to: ' + status);
        }
      });
    }
  });
}
