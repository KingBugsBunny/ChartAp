(function() {
    'use strict';

    angular.module('app.services')
        .factory('ReturnService', ReturnService);

    ReturnService.$inject = ['restService'];

    function ReturnService(restService) {

        //set variables that will be used multiple times
        var exUrl = 'http://13.84.149.217:8000';
        var orderResource = '/returns/count/order_date?';
        var reasonResource = '/returns/countdistinct/return_reason?';

        //return functions to expose them on the service
        return {
            loadReturnCount: loadReturnCount,
            loadReasonCount: loadReasonCount
        };

        //call for line chart and consumes the order API
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

        //call for bar chart and consumes the Reason API
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
