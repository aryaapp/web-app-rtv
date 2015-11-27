// var $ = require('jquery')
// var jQueryFullPage = require('../../node_modules/fullpage.js/jquery.fullPage.js')



$(document).ready(function() {
  $('#fullpage').fullpage({
    // sectionsColor: ['#1bbc9b', '#4BBFC3', '#7BAABE', 'whitesmoke', '#ccddff'],
    anchors: ['firstPage', 'secondPage', '3rdPage', '4thpage', '5thPage', 'lastPage'],
    menu: '#menu',
    css3: true,
    navigation: true,
    navigationPosition: 'right',
    scrollingSpeed: 1000,
    scrollOverflow: true,

    afterSlideLoad: function(link) {
      console.log(link);
    }
  });
  $.fn.fullpage.setAllowScrolling(false);
  $.fn.fullpage.setKeyboardScrolling(false);
  $('#fp-nav').hide();
});