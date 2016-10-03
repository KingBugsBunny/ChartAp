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
                reasonFormSubmit: '='

            },
            controller: ContainerController,
            controllerAs: 'vm',
            bindToController: true,
            transclude: true
        };
    }

    ContainerController.$inject = ['$scope', 'logger', 'ReturnService'];

    function ContainerController($scope, ReturnService) {
        var vm = this;

        vm.init = init;
        vm.getOrderChartData = getOrderChartData;
        vm.getReasonChartData = getReasonChartData;

        function init() {
            vm.orderChartData = {};
            vm.reasonChartData = {};

        } //end init

        function getOrderChartData(chartData) {
            if(chartData.startDate && chartData.endDate) {
                console.log('called order service!', chartData);
            }

        }

        function getReasonChartData(chartData) {
            if(chartData.startDate && chartData.endDate) {
                console.log('called reason service!', chartData);
            }
        }

        //orderChart watchers
        $scope.$watch('vm.orderFormStartDate', function() {
            vm.orderChartData.startDate = vm.orderFormStartDate;
        });
        $scope.$watch('vm.orderFormEndDate', function() {
            vm.orderChartData.endDate = vm.orderFormEndDate;
        });
        $scope.$watch('vm.orderFormCategory', function() {
            vm.orderChartData.category = vm.orderFormCategory;
        });
        $scope.$watch('vm.orderFormSubmit', function() {
            if(vm.orderFormSubmit === true){
                getOrderChartData(vm.orderChartData);
                vm.orderFormSubmit = false;
            }
        });


        //reasonChart watchers
        //orderChart watchers
        $scope.$watch('vm.reasonFormStartDate', function() {
            vm.reasonChartData.startDate = vm.reasonFormStartDate;
        });
        $scope.$watch('vm.reasonFormEndDate', function() {
            vm.reasonChartData.endDate = vm.reasonFormEndDate;
        });
        $scope.$watch('vm.reasonFormCategory', function() {
            vm.reasonChartData.category = vm.reasonFormCategory;
        });
        $scope.$watch('vm.reasonFormLimit', function() {
            vm.reasonChartData.limit = vm.reasonFormLimit;
        });

        $scope.$watch('vm.reasonFormSubmit', function() {
            if(vm.reasonFormSubmit === true) {
                getReasonChartData(vm.reasonChartData);
                vm.reasonFormSubmit = false;
            }
        });


    }
})();
