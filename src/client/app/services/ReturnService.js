(function () {
    'use strict';

    angular.module('app.services')
        .factory('ReturnService', ReturnService);

    ReturnService.$inject = ['restService'];

    function ReturnService(restService) {

        var resource = '/returns/count/order_date/';

        return {
            loadReturnCount: loadReturnCount,
            loadReasonsCount: loadReasonsCount
        };

        function loadReturnCount(startDate, endDate, category) {
        	if (category === undefined || category === 'All categories'){
        		category = '';
        	}

            return restService.GET(
                resource + 'category=' + category +
                '&start_date=' + startDate +
                 '&end_date=' + endDate);
        }

        function loadReasonsCount(startDate, endDate, category, limit) {
        	if (category === undefined) {
        		category = '';
        	}

        	if (limit === undefined) {
        		limit = '';
        	}

            return restService.GET(
                resource + 'category=' + category +
                 '&start_date=' + startDate +
                  '&end_date' + endDate +
                  '&limit=' + limit);
        }
    }
})();
