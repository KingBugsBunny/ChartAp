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
        }
    }
})();
