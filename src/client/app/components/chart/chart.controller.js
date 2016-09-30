(function () {
    'use strict';

    angular
        .module('app.components.chart')
        .directive('chart', chartDirective);

    function chartDirective() {
        return {
            restrict: 'E',
            templateUrl: 'app/components/chart/chart.html',
            scope: {},
            controller: ChartController,
            bindings: {
                data: '<',
                chartBasics:'<'
            },
            controllerAs: 'vm',
            bindToController: true
        };
    }

    ChartController.$inject = [];

    function ChartController() {
        var vm = this;

        vm.returnOrderLine = {};
        vm.returnReasonLine = {};

        vm.init = init;

        function init() {
            vm.chartOptions = setChartOptions(vm.chartBasics);

            vm.chartData = setData(data);

        } //end init

        function setData(data) {
            var chart;

            chart = {
                values: data.values,
                key : data.key,
                color: data.color
            };


            return chart;
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
                    x: function (d) {
                        return d.x;
                    },
                    y: function (d) {
                        return d.y;
                    },
                    xAxis: {
                        axisLabel: chartBasics.xAxisLabel
                    },
                    yAxis: {
                        axisLabel: chartBasics.yAxisLabel,
                        tickFormat: function (d) {
                            return d3.format('.02f')(d);
                        },
                        axisLabelDistance: -10
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
            vm.chartOptions.chart = chart;
        }
    }
})();
