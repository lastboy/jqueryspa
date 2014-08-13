/*global define*/
'use strict';

/**
 * The main controller for the our app
 */

define(['app', 'common/manager', 'services/data', "directives/scrollto"], function (app, manager, appdata, scrolldirective) {
    
    // App controller creation
    app.controller('appController', ['appData', '$scope', "$interval", function(appData, $scope, $interval) {

       
        appData.then(function(data) {
            
            // Set the data into scope
            $scope.pages = data.all();

            // Run the common script
            var name = data.getSelected(),
                _interval;
            
            if (name) {
                _interval = $interval(function(){
                    if (manager.init(scrolldirective, name)) {
                        $interval.cancel(_interval);
                    }
                }, 100) ;
            }

        });

      
    }]);
    
});
