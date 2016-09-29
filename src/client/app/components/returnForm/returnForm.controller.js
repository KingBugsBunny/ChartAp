(function() {
    'use strict';

    angular
        .module('app.components.returnForm')
        .directive('returnForm', returnFormDirective);

    function returnFormDirective () {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/components/returnForm/returnForm.html',
            scope: {},
            controller: ReturnFormController,
            controllerAs: 'vm',
            bindToController: true
        };

        ReturnFormController.$inject = ['ReturnService'];

        function ReturnFormController(ReturnService) {
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

            function submit() {
                //parse dates
                vm.form.startDate = parseDate(vm.form.startDateRaw);
                vm.form.endDate = parseDate(vm.form.endDateRaw);

                //call service to retrieve data
                ReturnService.loadReturnCount(vm.form.startDate, vm.form.endDate, vm.form.category)

                console.log('vm.form', vm.form);
            }

            function parseDate(dateObj) {
                var mm = dateObj.getMonth();
                var dd = dateObj.getDate();

                return [dateObj.getFullYear(), mm , dd].join('');
            }
        }

        return directive;
    }
})();
