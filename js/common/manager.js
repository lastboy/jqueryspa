/*global define*/
'use strict';

/**
 * Global application management, including navigation and menu handling
 */

define(['app'], function (app) {

    var _module = function () {

        var _topMenu,
            _menuOptions,
            _scrollItems,
            _menuItems,
            _menuHandle,
            _lastId,
            _isTopMenu = function () {
                if (!_topMenu || (_topMenu && !_topMenu[0])) {
                    return false;
                }

                return (_scrollItems && _scrollItems.length > 0 ? true : false);
            };


        return {

            init: function ($scope, scrolldirective, appData) {

                // Cache selectors
                var topMenuHeight,
                    selectedData;


                function _init() {

                    _topMenu = $("#menu");
                    if (_topMenu[0]) {

                        _menuOptions = $("#menu-options");

                        _menuOptions.on("click", function() {
                            _topMenu.css("opacity", "0.7");
                        });                                              
                        
                        _menuOptions.on("mouseover", function() {
                            _topMenu.css("opacity", "0.7");
                        });

                        _topMenu.on("mouseover", function() {
                             _topMenu.css("opacity", "0.7");
                        });

                        _menuOptions.on("mouseout", function() {
                            _menuController();
                        });                        topMenuHeight = _topMenu.outerHeight() + 15;

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

                function _updateSection(id) {

                    var sectionData;

                    if (_lastId !== id) {
                        _lastId = id;

                        // Set/remove active class                            
                        _menuItems
                            .parent().removeClass("active")
                            .end().filter("[scroll-to=" + id + "]").parent().addClass("active");
                        _menuItems
                            .removeClass("active")
                            .filter("[scroll-to=" + id + "]").addClass("active");

                        sectionData = appData.get(id);
                        if (sectionData) {

                            $scope.selectedSection.data = sectionData;
                            $scope.selectedSection.name = sectionData['display-name'];
                            $scope.$apply();
                        }
                    }
                }

                function _menuController() {
                    if (_menuOptions.css("display") !== "none") {
                        if (_menuHandle) {
                            _menuHandle = clearTimeout(_menuHandle);
                            _topMenu.css("opacity", "0.7");
                        }
                        _menuHandle = setTimeout(function() {
                            _topMenu.css("opacity", "0");
                        }, 1500);
                    } else {
                        _topMenu.css("opacity", "1");
                    }
                }

                // Initialize in case the top menu not rendered just yet 
                if (!_isTopMenu()) {
                    _init();
                }

                // if the top menu is rendered go ahead and bind the scroll
                if (_isTopMenu()) {

                    selectedData = (appData ? appData.getSelected() : undefined);
                    if (scrolldirective && selectedData) {
                        scrolldirective.scrollTo.call(this, {scrollTo: selectedData.name});
                    }

                    $(window).resize(function () {
                        _menuController();
                    });
                        
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

                        _updateSection(id);

                        _menuController();
                    });
                }

                return true;
            }
        }

    }();

    return _module;

});
