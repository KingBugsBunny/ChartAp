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
                reasonForm: '='
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

            vm.reasonForm = {
                category : 'All categories',
                limit : '10',
                startDate: new Date('2016-06-18'),
                endDate: new Date('2016-07-25'),
                submit : false
            };

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
            vm.reasonForm.submit = true;
        }
    }
})();
