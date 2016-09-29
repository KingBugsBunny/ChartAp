(function() {
    'use strict';

    angular
        .module('app.components.returnForm')
        .directive('returnForm', returnFormDirective);

    function returnFormDirective () {
        return {
            restrict: 'E',
            templateUrl: 'app/components/returnForm/returnForm.html',
            scope: {},
            controller: ReturnFormController,
            controllerAs: 'vm',
            bindToController: true
        };

        function ReturnFormController() {
            var vm = this;
            vm.form = {
              startDate: '2016-06-18',
                endDate: '2018-05-13'
            };

            vm.form.startDateRaw = new Date(vm.form.startDate);
            vm.form.endDateRaw = new Date(vm.form.endDate);

            vm.submit = submit;

            vm.categories = [
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

            function submit() {
                //parse dates
                vm.form.startDate = parseDate(vm.form.startDateRaw);
                vm.form.endDate = parseDate(vm.form.endDateRaw);

                //call service to retrieve data

                console.log('vm.form', vm.form);
            }

            function parseDate(dateObj) {
                var mm = dateObj.getMonth();
                var dd = dateObj.getDate();

                var date = [dateObj.getFullYear(), mm , dd].join('');

                //!mm[1] && '0', mm, !dd[1] && '0', dd.join('');

                return date;
            }
        }
    }
})();
