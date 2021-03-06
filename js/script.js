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
//            This code started as a Udacity project, and similar to others
//            experience on Udacity, I had to use an anonymous function inside
//            the method submit.
//
//  Change log:  Author: David Whipple
//               Date 11/24/2014
//               Purpose: Got the NY Times API working and returning values, need to check if the query string is correct.
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

  // Display the Google Streetview as the background
  var bgImgURL = 'http://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + address + '';
  body.append('<img class="bgimg" src="' + bgImgURL +'">');

  
  // Get the NYTimes articles with an AJAX request  
  var APIKey = "822d0e417f994ced8c6a3b010c61c95f:1:70224211";
  var myNyTimesURL = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + cityInput + '&sort=newest&api-key=' + APIKey;
  // Use the below line to break the API call and test error handling..
  //var myNyTimesURL = 'http://api.ytimes.com/svc/search/v2/articlesearch.json?q=' + cityInput + '&sort=newest&api-key=' + APIKey;
  $.getJSON(myNyTimesURL, function(data) {
  
    // The NY Times API call is working, but I am not sure the query is constructed correctly because of the results.
	// Reference link to API details: http://developer.nytimes.com/docs/read/article_search_api_v2
	// Reference link to jQuery: http://api.jquery.com/jquery.getjson/
    console.log(myNyTimesURL);
	nytHeaderElem.text('New York Times Articles About ' + cityInput);
	 
	articles = data.response.docs;
	for (var i=0; i<articles.length; i++) {
	   var article = articles[i];
	   nytElem.append('<li class="article">'+'<a href="'+article.web_url+'">'+article.headline.main+'</a>'+'<p>'+ article.snippet + '</p>' + '</li>');
	};
	
	  // Added Error Handling here with chaining

  }).error(function(e) {
  nytHeaderElem.text('New York Times Articles Could Not Be Loaded');
  });
  
  // This is the Wikipedia AJAX call, uses .ajax calls to avoid cross site scripting issues.
  var wikiUrl = 'http://en.wikipedia.org/w/api.php?action=opensearch&search=' + cityInput + '&format=json&callback=wikiCallback';
  // Used to test errorhandling
  // var wikiUrl = 'http://en.wiipedia.org/w/api.php?action=opensearch&search=' + cityInput + '&format=json&callback=wikiCallback';
  
  // Set timer for Wiki JSONP call to 8 seconds.
  var wikiRequestTimeout = setTimeout(function(){
      wikiElem.text("Failed to get wikipedia response");
  }, 8000);
  
  // Error handling not builtin to jsonp
$.ajax(wikiUrl, {
        // url: wikiUrl,
        dataType: "jsonp",
		// Comment below in case we need to change the callback function name, setting dataType to jsonp, should use "callback" as default
		// jsonp: "callback",
  		success: function( response ) {
  		    articleList = response[1];
			 
  			for (var i=0; i< articleList.length; i++) {
  			    articleStr = articleList[i];
  			    var url = 'http://en.wikipedia.org/wiki/' + articleStr;
  				wikiElem.append('<li><a href="' + url + '">' + articleStr + '</a></li>');
  			};
			
			// Clear timer we set
			clearTimeout(wikiRequestTimeout);
  		}
  	});
	
 return false;

});

// $('#form-container').submit(loadData);

//loadData();
