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

    LineChartController.$inject = ['$scope', 'ChartService'];

    function LineChartController($scope, ChartService) {
        var vm = this;

        vm.init = init;

        function init() {
            vm.chartData = [];
            vm.chartOptions = {};

            vm.chartOptions.chart = setChartOptions(ChartService.setReturnOrderOptions());
        }

        $scope.$watch('vm.lineData', function(){
            if(vm.lineData){
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
                duration: 100,
                deepWatchData: true
            };
        }
    }
})();
