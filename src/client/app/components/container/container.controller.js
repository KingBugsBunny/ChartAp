(function () {
    'use strict';

    angular
        .module('app.components.container')
        .directive('container', containerDirective);

    function containerDirective() {
        return {
            restrict: 'E',
            templateUrl: 'app/components/container/container.html',
            scope: {
                //I should cut down the amount of vars i am exposing and place them in objects but I was running
                // into problems doing so. In their preset state they function fine but aren't very clean
                orderFormStartDate: '=',
                orderFormEndDate: '=',
                orderFormCategory: '=',
                orderFormGroupby: '=',
                orderFormSubmit: '=',
                reasonFormStartDate: '=',
                reasonFormEndDate: '=',
                reasonFormCategory: '=',
                reasonFormLimit: '=',
                reasonFormSubmit: '=',
                lineData: '=',
                barData: '='
            },
            controller: ContainerController,
            controllerAs: 'vm',
            bindToController: true,
            //transcludes the html for the charts and forms
            transclude: true
        };
    }

    ContainerController.$inject = ['$scope','logger', 'ReturnService'];

    function ContainerController($scope, logger, ReturnService) {
        var vm = this;

        vm.init = init;
        vm.getOrderChartData = getOrderChartData;
        vm.getReasonChartData = getReasonChartData;

        function init() {
            //init objects so i can set properties on them
            vm.orderChartData = {};
            vm.reasonChartData = {};

            //initial data for lineChart
            vm.initialOrderData = {
                startDate: '2016-06-18',
                endDate: '2016-07-25',
                category: 'All categories'
            };

            //initial data for barChart
            vm.initialReasonData = {
                startDate: '2016-06-18',
                endDate: '2016-07-25',
                category: 'All categories',
                limit: 50
            };

            //make initial service call
            getOrderChartData(vm.initialOrderData);
            getReasonChartData(vm.initialReasonData);
        } //end init

        //call service and get data for linechart
        function getOrderChartData(chartData) {
            if (chartData.startDate && chartData.endDate) {

                //make service call
                ReturnService.loadReturnCount(chartData.startDate, chartData.endDate, chartData.category, chartData.groupby)
                    .then(function (payload) {
                        vm.lineData = payload.data;
                    }, function (err) {
                        logger.error(err.statusText + ' ' + err.status + ' occurred retrieving return order data');
                    });
            }
        }

        //call service and get data for barChart
        function getReasonChartData(chartData) {
            if (chartData.startDate && chartData.endDate) {

                //make service call
                ReturnService.loadReasonCount(chartData.startDate, chartData.endDate, chartData.category, chartData.limit)
                    .then(function(payload) {
                        vm.barData = payload.data;
                    }, function(err) {
                        logger.error(err.statusText + ' ' + err.status + ' occurred retrieving return reason data');
                    });
            }
        }

        //orderChart watchers, watch all values on the order form and set them if they change
        $scope.$watch('vm.orderFormStartDate', function () {
            vm.orderChartData.startDate = parseDate(vm.orderFormStartDate);
        });
        $scope.$watch('vm.orderFormEndDate', function () {
            vm.orderChartData.endDate = parseDate(vm.orderFormEndDate);
        });
        $scope.$watch('vm.orderFormCategory', function () {
                vm.orderChartData.category = vm.orderFormCategory;
        });
        $scope.$watch('vm.orderFormGroupby', function () {
            vm.orderChartData.groupby = vm.orderFormGroupby;
        });
        //submit form if submit is pressed
        $scope.$watch('vm.orderFormSubmit', function () {
            if (vm.orderFormSubmit === true) {
                getOrderChartData(vm.orderChartData);
                vm.orderFormSubmit = false;
            }
        });

        //reasonChart watchers, watch all values on the reason form and set them if they change
        $scope.$watch('vm.reasonFormStartDate', function () {
            vm.reasonChartData.startDate = parseDate(vm.reasonFormStartDate);
        });
        $scope.$watch('vm.reasonFormEndDate', function () {
            vm.reasonChartData.endDate = parseDate(vm.reasonFormEndDate);
        });
        $scope.$watch('vm.reasonFormCategory', function () {
                vm.reasonChartData.category = vm.reasonFormCategory;
        });
        $scope.$watch('vm.reasonFormLimit', function () {
            vm.reasonChartData.limit = vm.reasonFormLimit;
        });

        //submit form if submit is pressed
        $scope.$watch('vm.reasonFormSubmit', function () {
            if (vm.reasonFormSubmit === true) {
                getReasonChartData(vm.reasonChartData);
                vm.reasonFormSubmit = false;
            }
        });

        //parse the date into a string from a date object
        function parseDate(dateObj) {
            if(dateObj) {
                var mm = dateObj.getMonth();
                var dd = dateObj.getDate();

                //these if statements we're added as sometimes the object would parse out the 0 prefixed to the month/date
                if(mm < 10){
                    mm = '0' + mm;
                }
                if(dd < 10){
                    dd = '0' + dd;
                }

                //concatenate the vars taken from the obj into a string
                return [dateObj.getFullYear(), mm, dd].join('-');
            }
        }

    }
})();
