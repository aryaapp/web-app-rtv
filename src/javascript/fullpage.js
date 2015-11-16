// var $ = require('jquery')
// var jQueryFullPage = require('../../node_modules/fullpage.js/jquery.fullPage.js')



$(document).ready(function() {
    $('#fullpage').fullpage({
        // sectionsColor: ['#1bbc9b', '#4BBFC3', '#7BAABE', 'whitesmoke', '#ccddff'],
        anchors: ['firstPage', 'secondPage', '3rdPage', '4thpage', 'lastPage'],
        menu: '#menu',
        css3: true,
        navigation: true,
        navigationPosition: 'right',
        scrollingSpeed: 1000,
        scrollOverflow: true
    });
});