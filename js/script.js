$('#form-container').submit(function() {
  var body = $('body');
  var wikiElem = $('#wikipedia-links');
  var nytHeaderElem = $('#nytimes-header');
  var nytElem = $('#nytimes-articles');
  var greeting = $('#greeting');

  // clear out old data before new request
  wikiElem.text("");
  nytElem.text("");

  var addressInput = $('#street').val();
  var cityInput = $('#city').val();
  var address = addressInput + ', ' + cityInput;

  greeting.text('So, you want to live at ' + address + '?');

  var bgImgURL = 'http://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + address + '';

  body.append('<img class="bgimg" src="' + bgImgURL +'">');

  return false;
});

$('#form-container').submit(loadData);

// loadData();