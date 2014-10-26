/*global require*/
'use strict';

/*
    RequireJS configuration
 */
require.config({
	paths: {
		angular: '../bower_components/angular/angular',
		angularoute: '../bower_components/angular-route/angular-route',
		jquery: '../bower_components/jquery/dist/jquery.min'
	},
	shim: {
		angular: {
			exports: 'angular',
            deps:['jquery']
		},
        angularoute: {
            deps:['angular']
        }
	}
});

/*
    @[scrap
        @@require[
            /cat/lib/cat.js
        ]
    ]@
*//**
 *  catjs require configuration - for additional require config use your application's 
 */
require.config({"shim":{"catjs":{"exports":"_cat","deps":["chai"]},"catsrcjs":{"deps":["cat"]},"underscore":{"exports":"_"},"jsutils":{"deps":["underscore"]},"tmr":{"deps":["underscore","jsutils"]},"jspath":{"exports":"JSPath"},"chai":{"exports":"chai"}},"paths":{"underscore":"/cat/lib/underscore-min","jsutils":"/cat/lib/jsutils-min","tmr":"/cat/lib/tmr-min","jspath":"/cat/lib/jspath","chai":"/cat/lib/chai","cat":"/cat/lib/cat","catsrcjs":"/cat/lib/cat.src"}});
require(["underscore","jsutils","tmr","jspath","chai","cat","catsrcjs"], function(underscore,jsutils,tmr,jspath,chai,cat,catsrcjs) {

    if (typeof jspath !== "undefined") {
    window["JSPath"] = jspath;
}
 if (typeof chai !== "undefined") {
    window["chai"] = chai;
}

    
    _cat.utils.Loader.requires(["/cat/lib/cat.css"])

});

/*
    Initial require call
 */
require(['angular', 'angularoute', 'app', 'config/router', 'controllers/app', 'directives/generatelt', 'directives/scrollto'], function (angular) {

    angular.element(document).ready(function () {
        angular.bootstrap(document, ['jqueryspa']);

        /*
         @[scrap
            @@name bootstrapInitTest
            @@assert ok(true, "Bootstrap Initialization failed")
         ]@
         */_cat.core.action(this, {"pkgName":"jqueryspa-test.js.config.bootstrapInitTest"},this);
    });
        
});
