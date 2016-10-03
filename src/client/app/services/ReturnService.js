(function () {
    'use strict';

    angular.module('app.services')
        .factory('ReturnService', ReturnService);

    ReturnService.$inject = ['restService'];

    function ReturnService(restService) {

        var resource = '/returns/count/order_date?';

        return {
            loadReturnCount: loadReturnCount,
            loadReasonCount: loadReasonCount
        };

        function loadReturnCount(startDate, endDate, category) {
        	if (category === undefined || category === 'All categories'){
        		category = '';
        	}

            return restService.GET(
                resource + 'start_date=' + startDate +
                 '&end_date=' + endDate + '&category=' + category);
        }

        function loadReasonCount(startDate, endDate, category, limit) {
        	if (category === undefined || category === 'All categories') {
        		category = '';
        	}

            return restService.GET(
                resource +
                 'start_date=' + startDate +'&end_date' +
                 endDate + '&category=' + category +
                  '&limit=' + limit);
        }
    }
})();
