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
});
