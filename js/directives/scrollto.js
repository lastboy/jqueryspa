/*global define*/
'use strict';
/**
 * Directive for generating an element according to its metadata
 *
 * type: The tag type
 * template-url: The template url to be included
 *
 */
define(['app'], function (app) {


    app.directive('scrollTo', function ($location, $anchorScroll) {
        return function (scope, element, attrs) {

            element.bind('click', function (event) {
                event.stopPropagation();
                var off = scope.$on('$locationChangeStart', function (ev) {
                        off();
                        ev.preventDefault();
                    }), location = attrs.scrollTo,
                    target = $("#" + location),
                    to = (target ? target.offset().top : 0);
                if (to) {
                    $("html,body").animate({scrollTop:to }, "slow");
                }
            });

        };
    });

});