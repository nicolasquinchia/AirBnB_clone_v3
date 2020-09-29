$(document).ready(function () {
  $('.amenities input:checkbox').change(function () {
    const checkedAmenities = {};
    if ($(this).is(':checked')) {
      checkedAmenities[$(this).attr('data-id')] = $(this).attr('data-name');
    } else {
      delete checkedAmenities[$(this).attr('data-id')];
    }
    $('.amenities h4').html(Object.values(checkedAmenities).join(', '));
  });
  $.getJSON('http://0.0.0.0:5001/api/v1/status/', (data) => {
    if (data.status === 'OK') {
      $('DIV#api_status').addClass('available');
    } else {
      $('DIV#api_status').removeClass('available');
    }
  });
  $.ajax({
    url: 'http://localhost:5001/api/v1/places_search',
    type: 'POST',
    data: '{}',
    contentType: 'application/json',
    dataType: 'json',
    success: (allPlaces) => {
      for (const place of allPlaces) {
        $('.placeontainer').append(
          `<article>
          <div class="title_place">
            <h2>${place.name}</h2>
            <div class="price_by_night">
            ${place.price_by_night}
            </div>
          </div>
          <div class="details">
            <div class="max_guest">
              <div class="logo"></div>
              <span>${place.max_guest} Guests</span>
            </div>
            <div class="number_rooms">
              <div class="logo"></div>
              <span>${place.number_rooms} Bedroom</span>
            </div>
            <div class="number_bathrooms">
              <div class="logo"></div>
              <span>${place.number_bathrooms} Bathroom</span>
            </div>
          </div>
          <div class="description">
            ${place.description}
          </div>
        </article>`
        );
      }
    },
  });
  $('button').click(() => {
    const amenitiesData = { amenities: Object.keys(amenities) };
    $.ajax({
      url: 'http://localhost:5001/api/v1/places_search',
      type: 'POST',
      data: JSON.stringify(amenitiesData),
      contentType: 'application/json',
      dataType: 'json',
      success: (allPlaces) => {
        for (const place of allPlaces) {
          $('.placeontainer').append(
            `<article>
            <div class="title_place">
              <h2>${place.name}</h2>
              <div class="price_by_night">
              ${place.price_by_night}
              </div>
            </div>
            <div class="details">
              <div class="max_guest">
                <div class="logo"></div>
                <span>${place.max_guest} Guests</span>
              </div>
              <div class="number_rooms">
                <div class="logo"></div>
                <span>${place.number_rooms} Bedroom</span>
              </div>
              <div class="number_bathrooms">
                <div class="logo"></div>
                <span>${place.number_bathrooms} Bathroom</span>
              </div>
            </div>
            <div class="description">
              ${place.description}
            </div>
          </article>`
          );
        }
      },
    });
  });
});
