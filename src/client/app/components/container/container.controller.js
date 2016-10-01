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

    ContainerController.$inject = ['$scope', 'logger', 'chartService'];

    function ContainerController($scope, logger, chartService) {
        var vm = this;

        vm.init = init;
        
        function init() {
            

        } //end init

        //TODO: add watches
        //watch startDate

        //watch endDate

        //watch category

        //watch limit
        
    }
})();
