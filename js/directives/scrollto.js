/*global define*/
'use strict';
/**
 * Directive for smooth scrolling to a specific section by its Id
 *
 * type: The tag type
 * template-url: The template url to be included
 *
 */
define(['app'], function (app) {

    var _scrollTo = function(attrs) {
        
        var location = (attrs ? attrs.scrollTo : undefined),
            target,
            to;

        if (location) {
            target = $("#" + location);
            to = (target ? target.offset().top : 0);
            
            // scroll to the section 
            if (to !== undefined) {
                $("html,body").animate({scrollTop:to }, "slow");
            }
        }
    };
    
    app.directive('scrollTo', function ($location, $anchorScroll) {
        return function (scope, element, attrs) {

            // bind the element to on click event
            element.bind('click', function (event) {
            
                _scrollTo(attrs);
               
            });

        };
    });

    return {
        scrollTo: _scrollTo
    }
});