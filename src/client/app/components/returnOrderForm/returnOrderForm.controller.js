(function() {
    'use strict';

    angular
        .module('app.components.returnOrderForm')
        .directive('returnOrderForm', returnOrderFormDirective);

    function returnOrderFormDirective () {
        return {
            restrict: 'E',
            templateUrl: 'app/components/returnOrderForm/returnOrderForm.html',
            scope: {
                startDate: '=',
                endDate: '=',
                category: '='
            },
            controller: ReturnOrderFormController,
            controllerAs: 'vm',
            bindToController: true
        };
    }

    ReturnOrderFormController.$inject = [];

    function ReturnOrderFormController() {
        var vm = this;

        vm.submit = submit;
        vm.init = init;

        function init () {
            vm.form = {
                startDate: '2016-06-18',
                endDate: '2018-05-13',
                category: 'All categories'
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

            return [dateObj.getFullYear(), mm , dd].join('');
        }
    }
})();
