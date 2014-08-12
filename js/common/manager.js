/*global define*/
'use strict';

/**
 * Global application management, including navigation and menu handling
 */

define(['app'], function (app) {

    var _module = function () {

        return {

            init: function () {

                // Animated Scroll
                $('a[href*=#]:not([href=#])').click(function () {
                    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
                        || location.hostname == this.hostname) {
                        var target = $(this.hash);
                        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                        if (target.length) {
                            $('html,body').animate({
                                scrollTop: target.offset().top
                            }, 1000);
                            return false;
                        }
                    }
                });

            }
        }

    }();

    return _module;

});
