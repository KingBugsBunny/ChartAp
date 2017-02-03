(function () {
    'use strict';
    angular.module('app.services')
        .factory('ReturnReasonServiceMock', ReturnReasonServiceMock);

    ReturnReasonServiceMock.$inject = [ '$q'];


    function ReturnReasonServiceMock($q) {

        var deferred = $q.defer();

        return {
            loadReasonCount: loadReasonCount
        };

        function loadReasonCount() {

            //mock data for bar chart, taken from an API call
            var mockData = {
                data: {
                    key: 'Order reasons',
                    color: 'blue',
                    data: [
                        {
                            "count": 708,
                            "value": "Invalid Size"
                        },
                        {
                            "count": 656,
                            "value": "Wrong Color"
                        },
                        {
                            "count": 632,
                            "value": "Damaged Product"
                        },
                        {
                            "count": 607,
                            "value": "No Longer Want"
                        },
                        {
                            "count": 596,
                            "value": "Wrong Product"
                        },
                        {
                            "count": 551,
                            "value": "Late Delivery"
                        }
                    ]
                }
            };

            deferred.resolve(mockData);

            return deferred.promise;
        }
    }
})();
