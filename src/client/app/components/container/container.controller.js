(function () {
    'use strict';

    angular
        .module('app.components.container')
        .directive('container', containerDirective);

    function containerDirective() {
        return {
            restrict: 'E',
            templateUrl: 'app/components/container/container.html',
            scope: {},
            controller: ContainerController,
            controllerAs: 'vm',
            bindToController: true,
            transclude: true
        };
    }

    ContainerController.$inject = ['ReturnServiceMock', 'ReturnReasonServiceMock'];

    function ContainerController(ReturnServiceMock, ReturnReasonServiceMock) {
        var vm = this;

        vm.init = init;

        function init() {
            //get Data
            getReturnData();
            getReturnReasonData();

            //set chart options
            setReturnBasicOptions();
            setReturnReasonBasicOptions();

        } //end init

        //TODO: add watches
        //watch startDate

        //watch endDate

        //watch category

        //watch limit


        function getReturnData() {

            vm.returnOrderData.values = ReturnServiceMock();
            vm.returnOrderData.key = 'return Order';
            vm.returnOrderData.color = 'red';
        }

        function getReturnReasonData() {

            vm.returnReasonData = ReturnReasonServiceMock;
            vm.returnOrderData.key = 'return reasons';
            vm.returnOrderData.color = 'blue';

        }

        function setReturnBasicOptions() {
            vm.orderCountOptions = {
                chart: {
                    type: 'lineChart',
                    xAxis: {
                        axisLabel: 'Date'
                    },
                    yAxis: {
                        axisLabel: 'Number of returns'
                    },
                    title: 'Returns over time'
                }
            }
        }

        function setReturnReasonBasicOptions() {
            vm.returnReasonOptions = {
                chart: {
                    type: 'multiBarChart',
                    xAxis: {
                        axisLabel: 'Reason'
                    },
                    yAxis: {
                        axisLabel: 'Number of returns'
                    },
                    title: 'Return Reasons'
                }
            }
        }
    }
})();
