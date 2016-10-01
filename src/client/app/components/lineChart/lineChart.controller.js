(function () {
    'use strict';

    angular
        .module('app.components.lineChart')
        .directive('lineChart', lineChartDirective);

    function lineChartDirective() {
        return {
            restrict: 'E',
            templateUrl: 'app/components/lineChart/lineChart.html',
            scope: {},
            controller: LineChartController,
            controllerAs: 'vm',
            bindToController: true
        };
    }

    LineChartController.$inject = ['chartService'];

    function LineChartController(chartService) {
        var vm = this;

        vm.init = init;

        function init() {
            vm.chartData = [];
            vm.chartOptions = {};


            //call service to get return Order data & options
            var data = chartService.getReturnData();

            vm.chartData.push(setData(data));

            vm.chartOptions.chart = setChartOptions(chartService.setReturnOrderOptions(), data.values[0], data.values[data.values.length]);
        }

        function setData(data) {
            return {
                values: data.values,
                key: data.key,
                color: data.color,
                strokeWidth: 2
            }
        }

        function setChartOptions(chartBasics, minDate, maxDate) {

            var minDateObj = new Date(minDate);
            var maxDateObj = new Date(maxDate);

            var chart = {
                type: chartBasics.type,
                height: 450,
                margin: {
                    top: 20,
                    right: 20,
                    bottom: 40,
                    left: 55
                },
                x: function (d, i) {
                    return i;
                },
                y: function (d) {
                    return d.count;
                },
                xAxis: {
                    axisLabel: chartBasics.xAxis,
                    tickFormat: function (d) {
                        return d3.time.format('%x')(new Date(d.value));
                    },
                    //rotateLabels: 30,
                    showMaxMin: true
                },
                yAxis: {
                    axisLabel: chartBasics.yAxis,
                    axisLabelDistance: 10
                },
                title: {
                    text: chartBasics.title,
                    enable: true
                },
                caption: {
                    enable: false,
                    html: ''
                },
                useInteractiveGuideline: false,
                interactive: false,
                duration: 100
            };

            return chart;
        }
    }
})();
