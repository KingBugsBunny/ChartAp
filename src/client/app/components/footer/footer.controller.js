(function() {
    'use strict';

    angular
        .module('app.components.footer')
        .directive('footer', footerDirective);

    function footerDirective () {
        return {
            restrict: 'E',
            templateUrl: 'app/components/footer/footer.html',
            scope: {},
            controller: FooterController
        };

        function FooterController() {
        }
    }
})();
