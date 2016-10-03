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

    BarChartController.$inject = ['$scope', 'ChartService'];

    function BarChartController($scope, ChartService) {
        var vm = this;

        vm.init = init;

        function init() {
            vm.chartData = [];
            vm.chartOptions = {};

            vm.chartOptions.chart = setChartOptions(ChartService.setReturnReasonBasicOptions());
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
                type: chartBasics.type,
                height: 350,
                margin: {
                    top: 20,
                    right: 20,
                    bottom: 40,
                    left: 55
                },
                x: function(d){
                    return d.value;
                },
                y: function (d) {
                    return d.count;
                },
                xAxis: {
                    axisLabel: chartBasics.xAxis
                },
                yAxis: {
                    axisLabel: chartBasics.yAxis,
                    axisLabelDistance: 10
                },
                title: chartBasics.title,
                duration : 500,
                stacked: true
            };
        }
    }
})();
