(function(){
    'use strict';

    angular
        .module('app.directives.d3Lines')
        .directive('d3LinesDirective', D3LinesDirective);

    function D3LinesDirective () {
        return {
            restrict: 'EA',
            scope: {},
            require: 'd3',
            link: D3LinesLinkFunction
        };
    }

    function D3LinesLinkFunction (scope, element, attrs){
        var chart = d3.selectElement(element[0]);

        var svg = d3.append('div')
            .attr('class', 'chart')
            .selectAll('div')
            .classed('svg-container', true)
            .append('svg')
            .attr('viewBox', '0 0 ' + 500 + ' ' + 300 + '')
            .classed('svg-content-responsive', true);

        chart.append(svg);

    }

})();
