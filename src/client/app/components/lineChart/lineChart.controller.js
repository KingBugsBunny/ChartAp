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

            //set options first as the chart will throw an error if the chart isn't configured. doesn't need data at first
            vm.chartOptions.chart = setChartOptions();
        }

        $scope.$watch('vm.lineData', function () {
            if (vm.lineData) {
                vm.chartData = [];
                vm.chartData.push(setData(vm.lineData.data));
            }
        });

        //get data and define configuration related to data
        function setData(data) {
            return {
                values: data,
                key: 'return Order',
                color: 'red',
                strokeWidth: 2
            }
        }

        //define the configuration used on the chart
        function setChartOptions() {
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
                    return d3.time.format('%Y-%m-%d').parse(d.value);
                },
                y: function (d) {
                    return d.count;
                },
                xAxis: {
                    tickFormat: function (d) {
                        return d3.time.format('%x')(new Date(d))
                    }
                },
                yAxis: {
                    axisLabel: 'Number of Returns',
                    tickFormat: function (d) {
                        return d3.format(',.0f')(d);
                    }
                },
                useInteractiveGuideline: true,
                interactive: true,
                duration: 100
            }
        }
    }
})();
