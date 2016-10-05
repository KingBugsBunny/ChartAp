(function() {
    'use strict';

    angular
        .module('app.components.header')
        .directive('header', headerDirective);

    function headerDirective () {
        return {
            restrict: 'E',
            templateUrl: 'app/components/header/header.html',
            scope: {},
            controller: HeaderController
        };

        function HeaderController() {
            //This controller is here as this is how we are adding features in angular 2.
            // we nest our headers and footers as components and configure with bootstrap in our dashboard
        }
    }
})();
