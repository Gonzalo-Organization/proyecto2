const dropdown = new google.maps.places.Autocomplete(input);
dropdown.addListener("place_changed", () => {
  console.log(dropdown.getPlace());
  let place = dropdown.getPlace();
  lat.value = place.geometry.location.lat();
  lng.value = place.geometry.location.lng();
  name.value = place.name;
});
