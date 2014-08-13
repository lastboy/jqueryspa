/*global define*/
'use strict';

/**
 * Global application management, including navigation and menu handling
 */

define(['app'], function (app) {

    var _module = function () {

        var _topMenu,
            _scrollItems,
            _menuItems,
            _isTopMenu = function () {
                if (!_topMenu || (_topMenu && !_topMenu[0])) {
                    return false;
                }

                return (_scrollItems && _scrollItems.length > 0 ? true : false);
            };


        return {

            init: function (scrolldirective, selectedName) {

                // Cache selectors
                var lastId,
                    topMenuHeight;


                function _init() {

                    _topMenu = $("#menu");
                    if (_topMenu[0]) {
                        
                        topMenuHeight = _topMenu.outerHeight() + 15;

                        // All list items
                        _menuItems = _topMenu.find("a");

                        // Anchors corresponding to menu items
                        _scrollItems = _menuItems.map(function () {

                            var item = $("#" + $(this).attr("scroll-to"));
                            if (item.length) {
                                return item;
                            }
                            
                        });                       
                    }
                }

                // Initialize in case the top menu not rendered just yet 
                if (!_isTopMenu()) {
                    _init();
                } 

                // if the top menu is rendered go ahead and bind the scroll
                if (_isTopMenu()) {

                    if (scrolldirective && selectedName) {
                        scrolldirective.scrollTo.call(this, {scrollTo: selectedName});
                    }

                    // Bind to scroll
                    $(window).scroll(function () {

                        // Get container scroll position
                        var id, cur,
                            fromTop = $(this).scrollTop() + topMenuHeight;

                        // Get id of current scroll item
                        cur = _scrollItems.map(function () {
                            if ($(this).offset().top < fromTop)
                                return this;
                        });

                        // Get the id of the current element
                        cur = cur[cur.length - 1];
                        id = cur && cur.length ? cur[0].id : "";

                        if (lastId !== id) {
                            lastId = id;

                            // Set/remove active class                            
                            _menuItems
                                .parent().removeClass("active")
                                .end().filter("[scroll-to=" + id + "]").parent().addClass("active");
                            _menuItems
                                .removeClass("active")
                                .filter("[scroll-to=" + id + "]").addClass("active");
                        }
                    });
                }
                
                return true;
            }
        }

    }();

    return _module;

});
