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
                orderFormStartDate: '=',
                orderFormEndDate: '=',
                orderFormCategory: '=',
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
            vm.orderChartData = {};
            vm.reasonChartData = {};

            vm.initialOrderData = {
                startDate: '2016-06-18',
                endDate: '2016-07-25',
                category: 'All categories'
            };

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

        function getOrderChartData(chartData) {
            if (chartData.startDate && chartData.endDate) {

                ReturnService.loadReturnCount(chartData.startDate, chartData.endDate, chartData.category)
                    .then(function (payload) {
                        vm.lineData = payload.data;

                    }, function (err) {
                        logger.error(err.statusText + ' ' + err.status + ' occurred retrieving return order data');
                    });
            }
        }

        function getReasonChartData(chartData) {
            if (chartData.startDate && chartData.endDate) {

                ReturnService.loadReasonCount(chartData.startDate, chartData.endDate, chartData.category, chartData.limit)
                    .then(function(payload) {
                        vm.barData = payload.data;

                    }, function(err) {
                        logger.error(err.statusText + ' ' + err.status + ' occurred retrieving return reason data');
                    });
            }
        }

        //orderChart watchers
        $scope.$watch('vm.orderFormStartDate', function () {
            vm.orderChartData.startDate = parseDate(vm.orderFormStartDate);
        });
        $scope.$watch('vm.orderFormEndDate', function () {
            vm.orderChartData.endDate = parseDate(vm.orderFormEndDate);
        });
        $scope.$watch('vm.orderFormCategory', function () {
                vm.orderChartData.category = vm.orderFormCategory;
        });
        $scope.$watch('vm.orderFormSubmit', function () {
            if (vm.orderFormSubmit === true) {
                getOrderChartData(vm.orderChartData);
                vm.orderFormSubmit = false;
            }
        });

        //reasonChart watchers
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

        $scope.$watch('vm.reasonFormSubmit', function () {
            if (vm.reasonFormSubmit === true) {
                getReasonChartData(vm.reasonChartData);
                vm.reasonFormSubmit = false;
            }
        });

        function parseDate(dateObj) {
            if(dateObj) {
                var mm = dateObj.getMonth();
                var dd = dateObj.getDate();

                return [dateObj.getFullYear(), mm, dd].join('-');
            }
        }

    }
})();
