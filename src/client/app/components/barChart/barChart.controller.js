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

            //set options first as the chart will throw an error if the chart isn't configured. doesn't need data at first
            vm.chartOptions.chart = setChartOptions();
        }

        //watch for data from container service and push it to array
        $scope.$watch('vm.barData', function(){
            if(vm.barData){
                //this resets the array as pushing merely adds to array
                vm.chartData = [];
                vm.chartData.push(setData(vm.barData.data));
            }
        });

        //get data and define configuration related to data
        function setData(data) {
            return {
                values: data,
                key: 'Order reasons',
                color: 'blue'
            }
        }

        //define the configuration used on the chart. A multiBarChart is used as there wasn't an option for a single bar chart in nvd3
        function setChartOptions() {
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
