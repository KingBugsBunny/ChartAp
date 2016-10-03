(function () {
    'use strict';
    angular.module('app.services')
        .factory('ReturnReasonServiceMock', ReturnReasonServiceMock);

    function ReturnReasonServiceMock() {
        return [
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
                "value": null
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
})();
