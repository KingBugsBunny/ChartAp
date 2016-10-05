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
                orderFormStartDate: '=',
                orderFormEndDate: '=',
                orderFormCategory: '=',
                orderFormGroupby: '=',
                orderFormSubmit: '='
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

            //init values set on form. I am unsure if this way is slower than setting them in HTML
            vm.orderFormGroupby = 'day';
            vm.orderFormCategory = 'All categories';

            //this value is watched in the container and fires the service if true
            vm.orderFormSubmit = false;

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
            vm.orderFormSubmit = true;
        }
    }
})();
