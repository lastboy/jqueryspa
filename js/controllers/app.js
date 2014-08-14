/*global define*/
'use strict';

/**
 * The main controller for the our app
 */

define(['app', 'common/manager', 'services/data', "directives/scrollto"], function (app, manager, appdata, scrolldirective) {
    
    // App controller creation
    app.controller('appController', ['appData', '$scope', "$interval", function(appData, $scope, $interval) {

        // Initial selected section as empty
        $scope.selectedSection = {name: "", data: undefined};
        
        appData.then(function(data) {
            
            // Set the data into scope
            $scope.pages = data.all();

            // Run the common script
            var _interval;
            
            if (data) {
                _interval = $interval(function(){
                    if (manager.init($scope, scrolldirective, data)) {
                        $interval.cancel(_interval);
                    }
                }, 200) ;
            }

        });

      
    }]);
    
});
