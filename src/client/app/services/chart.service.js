(function(){
    'use strict';

angular.module('app.services')
    .factory('chartService', chartService);

chartService.$inject = ['ReturnServiceMock', 'ReturnReasonServiceMock'];
function chartService(ReturnServiceMock, ReturnReasonServiceMock) {

    return {
        getReturnData: getReturnData,
        getReturnReasonData: getReturnReasonData,
        setReturnOrderOptions: setReturnOrderOptions,
        setReturnReasonBasicOptions: setReturnReasonBasicOptions
    };

    //get chart data
    function getReturnData() {
        var returnOrderData = {};
        returnOrderData.values = ReturnServiceMock;
        returnOrderData.key = 'return Order';
        returnOrderData.color = 'red';
        returnOrderData.strokeWidth = 2;

        return returnOrderData;
    }

    function getReturnReasonData() {
        var returnReasonData = {};

        returnReasonData.values = ReturnReasonServiceMock;
        returnReasonData.key = 'Order reasons';
        returnReasonData.color = 'blue';

        return returnReasonData;
    }

    //get chart options
    function setReturnOrderOptions() {
        return {
            type: 'lineChart',
            xAxis: 'Date',
            yAxis: 'Number of returns',
            title: 'Returns over time'
        };
    }

    function setReturnReasonBasicOptions() {
        return {
            type: 'multiBarChart',
            xAxis: {
                axisLabel: 'Reason'
            },
            yAxis: {
                axisLabel: 'Number of returns'
            },
            title: 'Return Reasons'
        }
    }
}
})();
