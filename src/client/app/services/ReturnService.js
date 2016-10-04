(function() {
    'use strict';

    angular.module('app.services')
        .factory('ReturnService', ReturnService);

    ReturnService.$inject = ['restService'];

    function ReturnService(restService) {

        var exUrl = 'http://13.84.149.217:8000';
        var orderResource = '/returns/count/order_date?';
        var reasonResource = '/returns/countdistinct/return_reason?';


        return {
            loadReturnCount: loadReturnCount,
            loadReasonCount: loadReasonCount
        };

        function loadReturnCount(startDate, endDate, category, groupby) {
        	if (category === undefined || category === 'All categories'){
        		category = '';
        	}

        	if(groupby === undefined || groupby === 'day'){
        	    groupby = '';
        	}

            return restService.GET(
                exUrl + orderResource + 'start_date=' + startDate +
                 '&end_date=' + endDate + '&category=' + category);
        }

        function loadReasonCount(startDate, endDate, category, limit) {
        	if (category === undefined || category === 'All categories') {
        		category = '';
        	}

            return restService.GET(
                exUrl + reasonResource +
                 'start_date=' + startDate +'&end_date=' +
                 endDate + '&category=' + category +
                  '&limit=' + limit);
        }
    }
})();
