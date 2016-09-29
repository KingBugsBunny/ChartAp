(function() {
    'use strict';

    angular
        .module('app.components.chart')
        .directive('chart', chartDirective);

    function chartDirective () {
        return {
            restrict: 'E',
            templateUrl: 'app/components/chart/chart.html',
            scope: {},
            controller: ChartController,
            controllerAs: 'vm',
            bindToController: true
        };

        function ChartController() {
            var vm = this;
        }
    }
})();
