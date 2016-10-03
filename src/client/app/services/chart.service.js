(function(){
    'use strict';

angular.module('app.services')
    .factory('ChartService', ChartService);

ChartService.$inject = ['ReturnServiceMock', 'ReturnReasonServiceMock'];
function ChartService(ReturnServiceMock, ReturnReasonServiceMock) {

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
            xAxis: {
                axisLabel: 'Date'
            },
            yAxis: 'Number of returns'
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
            }
        }
    }
}
})();
