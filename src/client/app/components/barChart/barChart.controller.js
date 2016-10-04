(function () {
    'use strict';

    angular
        .module('app.components.barChart')
        .directive('barChart', barChartDirective);

    function barChartDirective() {
        return {
            restrict: 'E',
            templateUrl: 'app/components/barChart/barChart.html',
            scope: {
                barData: '='
            },
            controller: BarChartController,
            controllerAs: 'vm',
            bindToController: true
        };
    }

    BarChartController.$inject = ['$scope'];

    function BarChartController($scope) {
        var vm = this;

        vm.init = init;

        function init() {
            vm.chartData = [];
            vm.chartOptions = {};

            vm.chartOptions.chart = setChartOptions();
        }

        $scope.$watch('vm.barData', function(){
            if(vm.barData){
                vm.chartData = [];
                vm.chartData.push(setData(vm.barData.data));
            }
        });

        function setData(data) {
            return {
                values: data,
                key: 'Order reasons',
                color: 'blue'
            }
        }

        function setChartOptions(chartBasics) {
            return {
                type: 'multiBarChart',
                height: 350,
                margin: {
                    top: 20,
                    right: 20,
                    bottom: 40,
                    left: 75
                },
                x: function(d){
                    return d.value;
                },
                y: function (d) {
                    return d.count;
                },
                xAxis: {
                    axisLabel: 'reason',
                    axisLabelDistance: 8
                },
                yAxis: {
                    axisLabel: 'Number of Reasons',
                    tickFormat: function(d){
                        return d3.format(',.0f')(d);
                    },
                    axisLabelDistance: 5
                },
                duration : 500,
                stacked: true
            };
        }
    }
})();
