/*global define*/
'use strict';

/**
 * Load the application's meta data
 */
define(['app'], function (app) {

    app.factory('appData', function ($http, $q) {

        var _data = {},

            _deferred = $q.defer(),

            _module = {

                /**
                 * Get a record by name
                 *
                 * @param name
                 * @returns {Object}
                 */
                get: function (name) {
                    _deferred
                    return (_data && _data.map ? _data.map[name] : undefined);
                },

                /**
                 * Get the Map representation of the metadata
                 *
                 * @returns {Object}
                 */
                map: function () {
                    return (_data && _data.map ? _data.map : undefined);
                },

                /**
                 * Get all records
                 *
                 * @returns {Array} All the available record
                 */
                all: function () {
                    return (_data ? _data.response : undefined);
                }

            },

            _init = function (callback) {

                var me = this;

                $http.get('js/data/app.json')

                    .success(function (response) {
                        // this callback will be called asynchronously
                        // when the response is available

                        if (response) {

                            _data.response = response;

                            _data.map = {};
                            _data.response.forEach(function (record) {
                                if (record && record.name) {
                                    _data.map[record.name] = record;
                                }
                            });

                            if (callback) {
                                callback.call(me, _data);
                            }

                            _deferred.resolve(_module);
                        }
                    }).

                    error(function (data, status, headers, config) {
                        // called asynchronously if an error occurs
                        // or server returns response with an error status.
                        var msg = ["[jqueryspa] Failed to load the application data file, error: ", data, "\n", status, "\n", headers, "\n", config].join("");
                        console.error(msg);
                        _deferred.reject(msg);
                    });
            };

        _init();
        
        return _deferred.promise;
    });

});
