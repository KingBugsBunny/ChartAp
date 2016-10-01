(function () {
    'use strict';

    angular
        .module('app.components.barChart')
        .directive('barChart', barChartDirective);

    function barChartDirective() {
        return {
            restrict: 'E',
            templateUrl: 'app/components/barChart/barChart.html',
            scope: {},
            controller: BarChartController,
            controllerAs: 'vm',
            bindToController: true
        };
    }

    BarChartController.$inject = ['chartService'];

    function BarChartController(chartService) {
        var vm = this;

        vm.init = init;

        function init() {
            vm.chartData = [];
            vm.chartOptions = {};

            //call service to get data and options
            vm.chartData.push(setData(chartService.getReturnReasonData()));
            vm.chartOptions.chart = setChartOptions(chartService.setReturnReasonBasicOptions());
        }

        function setData(data) {
            return {
                values: data.values,
                key: data.key,
                color: data.color
            }
        }

        function setChartOptions(chartBasics) {
            return {
                type: chartBasics.type,
                height: 450,
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
