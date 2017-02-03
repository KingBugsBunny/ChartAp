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
                orderForm: '=',
                reasonForm: '=',
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

    ContainerController.$inject = ['$scope','logger', 'ReturnServiceMock', 'ReturnReasonServiceMock'];

    function ContainerController($scope, logger, ReturnServiceMock, ReturnReasonServiceMock) {
        var vm = this;

        vm.init = init;
        vm.getOrderChartData = getOrderChartData;
        vm.getReasonChartData = getReasonChartData;

        function init() {
            //init objects so i can set properties on them
            vm.orderChartData = {};
            vm.reasonChartData = {};
            vm.orderForm = {};
            vm.reasonForm = {};


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

        //call service and get data for line-chart
        function getOrderChartData(chartData) {
            if (chartData.startDate && chartData.endDate) {

                //make service call
                ReturnServiceMock.loadReturnCount(chartData.startDate, chartData.endDate, chartData.category, chartData.groupby)
                    .then(function (payload) {
                        vm.lineData = payload.data;
                    }, function (err) {
                        console.log(err);
                        if(err.status === 500){
                            logger.warning('Too many calls have been made recently, The amount of calls are rate limited. Please wait 20 seconds and attempt to call again');
                        } else {
                            logger.error(err.statusText + ' ' + err.status + ' occurred retrieving return order data');
                        }
                    });
            }
        }

        //call service and get data for barChart
        function getReasonChartData(chartData) {
            if (chartData.startDate && chartData.endDate) {

                //make service call
                ReturnReasonServiceMock.loadReasonCount(chartData.startDate, chartData.endDate, chartData.category, chartData.limit)
                    .then(function(payload) {
                        vm.barData = payload.data;
                    }, function(err) {
                        if(err.status === 500){
                            logger.warning('Too many calls have been made recently, The amount of calls are rate limited. Please wait 20 seconds and attempt to call again');
                        } else {
                            logger.error(err.statusText + ' ' + err.status + ' occurred retrieving return order data');
                        }
                    });
            }
        }

        //orderChart watchers, watch all values on the order form and set them if they change
        $scope.$watch('vm.orderForm.startDate', function () {
            vm.orderChartData.startDate = parseDate(vm.orderForm.startDate);
        });
        $scope.$watch('vm.orderForm.endDate', function () {
            vm.orderChartData.endDate = parseDate(vm.orderForm.endDate);
        });
        $scope.$watch('vm.orderForm.category', function () {
                vm.orderChartData.category = vm.orderForm.category;
        });
        $scope.$watch('vm.orderForm.groupby', function () {
            vm.orderChartData.groupby = vm.orderForm.formGroupby;
        });
        //submit form if submit is pressed
        $scope.$watch('vm.orderForm.submit', function () {
            if (vm.orderForm.submit === true) {
                getOrderChartData(vm.orderChartData);
                vm.orderForm.submit = false;
            }
        });

        //reasonChart watchers, watch all values on the reason form and set them if they change
        $scope.$watch('vm.reasonForm.startDate', function () {
            vm.reasonChartData.startDate = parseDate(vm.reasonForm.startDate);
        });
        $scope.$watch('vm.reasonForm.endDate', function () {
            vm.reasonChartData.endDate = parseDate(vm.reasonForm.endDate);
        });
        $scope.$watch('vm.reasonForm.category', function () {
                vm.reasonChartData.category = vm.reasonForm.category;
        });
        $scope.$watch('vm.reasonForm.limit', function () {
            vm.reasonChartData.limit = vm.reasonForm.limit;
        });

        //submit form if submit is pressed
        $scope.$watch('vm.reasonForm.submit', function () {
            if (vm.reasonForm.submit === true) {
                getReasonChartData(vm.reasonChartData);
                vm.reasonForm.submit = false;
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
