/*global define*/
'use strict';

/**
 * The main controller for the our app
 */

define(['app', "services/data"], function (app, manager) {
    
    // App controller creation
    app.controller('appController', ['appData', '$scope', function(appData, $scope) {

       
        appData.then(function(data) {
            $scope.pages = data.all();
  
        });

        
    }]);
    
});
