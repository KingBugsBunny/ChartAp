(function () {
    'use strict';

    angular
        .module('app.components.returnReasonForm')
        .directive('returnReasonForm', returnReasonFormDirective);

    function returnReasonFormDirective() {
        return {
            restrict: 'E',
            templateUrl: 'app/components/returnReasonForm/returnReasonForm.html',
            scope: {
                reasonFormStartDate: '=',
                reasonFormEndDate: '=',
                reasonFormCategory: '=',
                reasonFormLimit: '=',
                reasonFormSubmit: '='
            },
            controller: ReturnReasonFormController,
            controllerAs: 'vm',
            bindToController: true
        };
    }

    function ReturnReasonFormController() {
        var vm = this;

        vm.init = init;
        vm.submit = submit;

        function init() {

            //init values set on form. I am unsure if this way is slower than setting them in HTML
            vm.reasonFormCategory = 'All categories';
            vm.reasonFormLimit = '10';

            //this value is watched in the container and fires the service if true
            vm.reasonFormSubmit = false;

            //populate selects
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

            vm.limits = [
                '10',
                '25',
                '50',
                '100',
                '200'
            ];
        }

        //sets submit true and causes the service to fire in the containerController
        function submit() {
            vm.reasonFormSubmit = true;
        }
    }
})();
