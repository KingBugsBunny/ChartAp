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
                startDate: '=',
                endDate: '=',
                category: '=',
                limit: '='
            },
            controller: ReturnReasonFormController,
            controllerAs: 'vm',
            bindToController: true
        };
    }

    ReturnReasonFormController.$inject = [];

    function ReturnReasonFormController() {
        var vm = this;

        vm.submit = submit;
        vm.init = init;

        function init() {
            vm.form = {
                startDate: '2016-06-18',
                endDate: '2018-05-13',
                category: 'All categories',
                limit: 50
            };

            vm.form.startDateRaw = new Date(vm.form.startDate);
            vm.form.endDateRaw = new Date(vm.form.endDate);

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
                50,
                100,
                150,
                200
            ];
        }

        //TODO: add watches
        //watch for startDate

        //watch for endDate

        function submit() {
            //parse dates
            vm.form.startDate = parseDate(vm.form.startDateRaw);
            vm.form.endDate = parseDate(vm.form.endDateRaw);

            //category is set by ngModel
            //limit is set by ngModel
        }

        function parseDate(dateObj) {
            var mm = dateObj.getMonth();
            var dd = dateObj.getDate();

            return [dateObj.getFullYear(), mm, dd].join('');
        }
    }
})();
