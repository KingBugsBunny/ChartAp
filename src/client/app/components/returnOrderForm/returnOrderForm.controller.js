(function () {
    'use strict';

    angular
        .module('app.components.returnOrderForm')
        .directive('returnOrderForm', returnOrderFormDirective);

    function returnOrderFormDirective() {
        return {
            restrict: 'E',
            templateUrl: 'app/components/returnOrderForm/returnOrderForm.html',
            scope: {
                orderForm: '='
            },
            controller: ReturnOrderFormController,
            controllerAs: 'vm',
            bindToController: true
        };
    }

    function ReturnOrderFormController() {
        var vm = this;

        vm.init = init;
        vm.submit = submit;


        function init() {
            vm.orderForm = {
                category: 'All categories',
                groupby: 'day',
                startDate: '',
                endDate: '',
                submit : false
            };

            //populate my selection options
            vm.categories = [
                'All categories',
                'Men\'s Footwear',
                'Fitness',
                'Mobiles and Tablets',
                'Mobile Accessories',
                'Women\'s Watches',
                'Tools',
                'Men\'s Watches',
                'Women\'s Clothing',
                'Kitchen Appliances',
                'Women\'s Footwear',
                'Eyewear',
                'Computer Accessories',
                'Men\'s Clothing',
                'Men\'s Grooming'
            ];

            vm.groupBy = [
                'day',
                'week',
                'month'
            ]
        }

        //sets submit true and causes the service to fire in the containerController
        function submit() {
            vm.orderForm.submit = true;
        }
    }
})();
