//  Author: David Whipple
//  Date:   11/15/2014
//  Purpose:  This Javascript code does an asynchronous callback to Google
//            API's to set the background of the web page to the local map.
//

//  Method:  Submit
//  Purpose:  To execute when the address is entered on the web page
//            It takes the two fields, addressInput & cityInput and
//            turns them into a Google API call to display the background.
//
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
