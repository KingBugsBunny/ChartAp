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

            //call service to get return Order data
            vm.chartData.push(setData(chartService.getReturnData()));

            //call service to get return Order Options
            vm.chartOptions.chart = setChartOptions(chartService.setReturnOrderOptions());

            //call service to get return reason data

            //call service to get return reason Options

        }

        function setData(data) {
            return {
                values: data.values,
                key: data.key,
                color: data.color
            }
        }

        function setChartOptions(chartBasics) {
            var chart = {
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
                    return d3.time.scale().d.count;
                },
                xAxis: {
                    axisLabel: chartBasics.xAxis
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
                }
            };

            //if line chart set extra values it needs
            if (chartBasics.type === 'lineChart') {

                chart.useInteractiveGuideline = false;

            }

            //if bar chart set extra values it needs
            if (chartBasics.type === 'multiBarChart') {

                //TODO: find out what this means
                chart.duration = 100;

                chart.stacked = true;

            }

            console.table(chart);

            return chart;
        }
    }
})();
