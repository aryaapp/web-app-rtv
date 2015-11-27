// var $ = require('jquery')
// var jQueryFullPage = require('../../node_modules/fullpage.js/jquery.fullPage.js')



$(document).ready(function() {
    $('#fullpage').fullpage({
        // sectionsColor: ['#1bbc9b', '#4BBFC3', '#7BAABE', 'whitesmoke', '#ccddff'],
        anchors: ['firstPage', 'secondPage', '3rdPage', '4thpage', 'lastPage'],
        menu: '#menu',
        css3: true,
        easingcss3: 'ease-out',
        navigation: true,
        navigationPosition: 'right',
        scrollingSpeed: 800,
        scrollOverflow: true,
        normalScrollElements: ""
    });
    $.fn.fullpage.setAllowScrolling(false);
    $.fn.fullpage.setKeyboardScrolling(false);
    $('#fp-nav').hide();

    $('input, select, textarea').on('focus blur', function(event) {
        $('meta[name=viewport]').attr('content', 'width=device-width,initial-scale=1,maximum-scale=' + (event.type == 'blur' ? 10 : 1));
    });

});