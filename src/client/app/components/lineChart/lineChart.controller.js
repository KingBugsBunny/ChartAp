(function () {
    'use strict';

    angular
        .module('app.components.lineChart')
        .directive('lineChart', lineChartDirective);

    function lineChartDirective() {
        return {
            restrict: 'E',
            templateUrl: 'app/components/lineChart/lineChart.html',
            scope: {
                lineData: '='
            },
            controller: LineChartController,
            controllerAs: 'vm',
            bindToController: true
        };
    }

    LineChartController.$inject = ['$scope'];

    function LineChartController($scope) {
        var vm = this;

        vm.init = init;

        function init() {
            vm.chartData = [];
            vm.chartOptions = {};

            vm.chartOptions.chart = setChartOptions();
        }

        $scope.$watch('vm.lineData', function () {
            if (vm.lineData) {
                vm.chartData = [];
                vm.chartData.push(setData(vm.lineData.data));
            }
        });

        function setData(data) {
            return {
                values: data,
                key: 'return Order',
                color: 'red',
                strokeWidth: 2
            }
        }

        function setChartOptions(chartBasics) {
            return {
                type: 'lineChart',
                height: 475,
                margin: {
                    top: 25,
                    right: 25,
                    bottom: 40,
                    left: 75
                },
                x: function (d, i) {
                    return i;
                },
                y: function (d) {
                    return d.count;
                },
                xAxis: {
                    tickFormat: function (d) {
                        return d3.time.format('%x')(new Date(d))
                    },
                    yAxis: {
                        axisLabel: 'Number of Returns',
                        tickFormat: function (d) {
                            return d3.format(',.0f')(d);
                        }
                    },
                    useInteractiveGuideline: false,
                    interactive: false,
                    duration: 100
                }
            }
        }
    }
})();
