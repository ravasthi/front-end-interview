/*------------------------------------------------------------------------------
| photo-search.js
|
| Utilities for hooking up the search box to the Flickr API
------------------------------------------------------------------------------*/
var FrontEndInterview = window.FrontEndInterview ? window.FrontEndInterview : {};

FrontEndInterview.photoSearch = {
  flickrApiKey:          '7b491816b7ce18f1f848e52962352ee7',
  flickrRestUrlBase:     'https://www.flickr.com/services/rest/?',
  flickrMaxCountPerPage: 500,
  searchText:            '',

  utils: {
    sanitizeInput: function(string) {
      danger = [
        /<script[^>]*?>.*?<\/script>/gi, // Strip out javascript
        /<style[^>]*?>.*?<\/style>/gi,   // Strip style tags
        /<![\s\S]*?--[ \t\n\r]*>/gi,     // Strip multi-line comments
        /<[\/\!]*?[^<>]*?>/gi            // Strip out HTML tags
      ];

      for(var i = 0; i < danger.length; i++) {
        string = string.replace(danger[i], '');
      }

      // Also collapse multiple spaces down to one
      string = string.replace(/\s+/, ' ');

      return string;
    },

    buildFlickrOptions: function(options) {
      options         = options ? options : {};

      options.format         = 'json';
      options.api_key        = FrontEndInterview.photoSearch.flickrApiKey;
      options.nojsoncallback = 1;

      return options;
    },

    buildFlickrPhotoUrl: function(photo) {
      /*
      ** Flickr photo urls take the following format:
      **
      ** https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}_{size}.jpg
      */

      return "https://farm" + photo.farm +
             ".staticflickr.com/" + photo.server + "/" +
             photo.id + "_" + photo.secret + "_" + "c.jpg";
    }
  },

  toggleSearching: function() {
    FrontEndInterview.photoSearch.$searchButton.find(".search-icon").toggle();
    FrontEndInterview.photoSearch.$searchButton.find(".spinner").toggle();
  },

  getImages: function(searchText, maxCount) {
    FrontEndInterview.photoSearch.toggleSearching();

    if(maxCount && (maxCount * 1) > FrontEndInterview.photoSearch.flickrMaxCountPerPage) {
      maxCount = flickrMaxCountPerPage;
    }

    if(searchText && typeof searchText == 'string') {
      FrontEndInterview.photoSearch.searchText = searchText;
    }

    var flickrOptions = {
      method:       'flickr.photos.search',
      text:         searchText ? searchText : FrontEndInterview.photoSearch.searchText,
      page:         1,
      per_page:     maxCount ? maxCount : FrontEndInterview.photoSearch.flickrMaxCountPerPage,
      media:        'photos',
      content_type: 1
    };

    flickrOptions = FrontEndInterview.photoSearch.utils.buildFlickrOptions(flickrOptions);

    var url = FrontEndInterview.photoSearch.flickrRestUrlBase;

    url += $.param(flickrOptions);

    $.ajax(url, {
      success: function(data, status, xhr) {
        FrontEndInterview.photoSearch.$alerts.html('');
        FrontEndInterview.photoSearch.$searchString.text(FrontEndInterview.photoSearch.searchText);
        FrontEndInterview.photoSearch.populateResults(data);
      },
      error: function(data, status, xhr) {
        FrontEndInterview.photoSearch.$alerts.append(
          '<div class="message error">Something went wrong…</div>'
        );
      },
      complete: function(xhr, status) {
        FrontEndInterview.photoSearch.toggleSearching();
      }
    });
  },

  checkEnter: function(event) {
    var characterCode = event.keyCode || event.which;

    if(characterCode == 13) { // if enter key
      FrontEndInterview.photoSearch.doSearch();
      return false;
    } else {
      return true;
    }
  },

  doSearch: function(event) {
    var searchKeywords = FrontEndInterview.photoSearch.utils.sanitizeInput(
      FrontEndInterview.photoSearch.$searchField.val()
    );

    if(searchKeywords.match(/^\s*$/)) {
      FrontEndInterview.photoSearch.$searchField.val('');
      return false;
    }

    FrontEndInterview.photoSearch.searchText = searchKeywords;
    FrontEndInterview.photoSearch.getImages(searchKeywords);
  },

  init: function() {
    this.$searchField  = $(".search-field");
    this.$searchButton = $("button.search");
    this.$searchString = $(".search-string");
    this.$alerts       = $(".alerts");

    this.$searchButton.on('click', this.doSearch);
    this.$searchField.on('keypress', this.checkEnter);
  }
};
