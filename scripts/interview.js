/*------------------------------------------------------------------------------
| interview.js
|
| Solutions go here.
------------------------------------------------------------------------------*/
var FrontEndInterview = window.FrontEndInterview ? window.FrontEndInterview : {};

var results = [
  {
    url: "images/search-results/result-01.jpg",
    title: "Title 01",
    date: "21 Sep 2014"
  },
  // {
  //   url: "images/search-results/result-02.jpg",
  //   title: "Title 02",
  //   date: "21 Sep 2014"
  // },
  // {
  //   url: "images/search-results/result-03.jpg",
  //   title: "Title 03",
  //   date: "21 Sep 2014"
  // },
  {
    url: "images/search-results/result-04.jpg",
    title: "Title 04",
    date: "21 Sep 2014"
  },
  {
    url: "images/search-results/result-05.jpg",
    title: "Title 05",
    date: "21 Sep 2014"
  },
  {
    url: "images/search-results/result-06.jpg",
    title: "Title 06",
    date: "21 Sep 2014"
  },
  {
    url: "images/search-results/result-07.jpg",
    title: "Title 07",
    date: "21 Sep 2014"
  },
  {
    url: "images/search-results/result-08.jpg",
    title: "Title 08",
    date: "21 Sep 2014"
  },
  {
    url: "images/search-results/result-09.jpg",
    title: "Title 09",
    date: "21 Sep 2014"
  },
  {
    url: "images/search-results/result-10.jpg",
    title: "Title 10",
    date: "21 Sep 2014"
  },
  {
    url: "images/search-results/result-11.jpg",
    title: "Title 11",
    date: "21 Sep 2014"
  }
];

$.extend(FrontEndInterview.photoSearch, {
  populateResults: function(data) {
    console.dir(data);
    // Insert your JS here
  }
});

(function($) {
  $(function() {
    FrontEndInterview.photoSearch.populateResults(results);
  });
})(jQuery);


