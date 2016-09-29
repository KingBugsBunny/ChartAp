(function () {
    'use strict';

    /**
     * @ngdoc service
     * @name app.services.service:restService
     * @module app.services
     * @description
     *
     * # restService
     * The restService service is responsible for making RESTful requests to a
     * backend service
     */
    angular
        .module('app.services')
        .factory('restService', restService);

    // Manually identify the controller dependencies. This provides
    // minification-safe dependency injection
    restService.$inject = ['$http', '$q'];

    /**
     * @ngdoc function
     * @name app.services.service:restService#restService
     * @module app.services
     * @param {Object} $http the AngularJS $http service
     * @param {Object} $q the AngularJS $q service
     * @description
     *
     * # restService
     * Internal `restService` function is responsible for making RESTful requests to a
     * backend service
     */
    function restService($http, $q) {
        var service = {
            GET: get,
            PUT: put,
            POST: post,
            DELETE: del,
            buildFilter: buildFilter
        };

        return service;

        /**
         * @ngdoc method
         * @name app.services.service:restService#get
         * @module app.services
         * @param {String} url absolute or relative URL of the resource that is being requested
         * @param {Object} headers map of strings or functions which return strings representing
         * HTTP headers to send to the server. If the return value of a function is null, the header
         * will not be sent. Functions accept a config object as an argument.
         * @param {Function} callback the callback function that should be called when the request completes
         * @param {boolean|Cache} cache if true, a default $http cache will be used to cache the GET request,
         * otherwise if a cache instance built with $cacheFactory, this cache will be used for caching.
         * @param {Object.<string|Object>} params map of strings or objects which will be turned to
         * ?key1=value1&key2=value2 after the url. If the value is not a string, it will be JSONified.
         * @description
         * get will retrieve a RESTful resource
         */
        function get(url, headers, callback, cache, params) {
            return makeCall('GET', url, null, headers, callback, cache, params);
        }

        /**
         * @ngdoc method
         * @name app.services.service:restService#put
         * @module app.services
         * @param {String} url absolute or relative URL of the resource that is being requested
         * @param {string|Object} data data to be sent as the request message data.
         * @param {Object} headers map of strings or functions which return strings representing
         * HTTP headers to send to the server. If the return value of a function is null, the header
         * will not be sent. Functions accept a config object as an argument.
         * @param {Function} callback the callback function that should be called when the request completes
         * @description
         * put will update a RESTful resource
         */
        function put(url, data, headers, callback) {
            return makeCall('PUT', url, data, headers, callback);
        }

        /**
         * @ngdoc method
         * @name app.services.service:restService#post
         * @module app.services
         * @param {String} url absolute or relative URL of the resource that is being requested
         * @param {string|Object} data data to be sent as the request message data.
         * @param {Object} headers map of strings or functions which return strings representing
         * HTTP headers to send to the server. If the return value of a function is null, the header
         * will not be sent. Functions accept a config object as an argument.
         * @param {Function} callback the callback function that should be called when the request completes
         * @description
         * post will create a new RESTful resource
         */
        function post(url, data, headers, callback) {
            return makeCall('POST', url, data, headers, callback);
        }

        /**
         * @ngdoc method
         * @name app.services.service:restService#del
         * @module app.services
         * @param {String} url absolute or relative URL of the resource that is being requested
         * @param {Object} headers map of strings or functions which return strings representing
         * HTTP headers to send to the server. If the return value of a function is null, the header
         * will not be sent. Functions accept a config object as an argument.
         * @param {Function} callback the callback function that should be called when the request completes
         * @description
         * del will delete a RESTful resource
         */
        function del(url, headers, callback) {
            return makeCall('DELETE', url, null, headers, callback);
        }

        /**
         * @ngdoc function
         * @name app.services.service:restService#isNonError
         * @module app.services
         * @param {Number} status an HTTP response status code
         * @description
         *
         * # isNonError
         * isNonError will examine an HTTP status code to determine if the response is an error response
         * @returns {Boolean} true if the status code is an error code
         */
        function isNonError(status) {
            return status >= 100 && status <= 399; // 100, 200, and 300 series status codes (non-errors)
        }

        /**
         * @ngdoc function
         * @name app.services.service:restService#resolveDeferred
         * @module app.services
         * @param {Promise} deferred the promise object
         * @param {Object} result the result object
         * @param {Function} callback the callback function that should be invoked upon resolution
         * @description
         *
         * # resolveDeferred
         * resolveDeferred will take an HTTP response object and resolve or reject it
         */
        function resolveDeferred(deferred, result, callback) {
            if (isNonError(result.status)) {
                // process paging headers
                processPagingHeaders(result);

                result.data = callback ? callback(result.data) : result.data;
                deferred.resolve(result);
            } else {
                deferred.reject({code: 'ERR', result: result});
            }
        }

        function processPagingHeaders(result) {
            var headers = result.headers(),
                contentRange = headers['content-range'],
                parts;

            if (contentRange) {
                parts = contentRange.split('/');

                result.recordCount = parseInt(parts[1], 10);
                result.range = parts[0];
            }
        }

        /**
         * @ngdoc function
         * @name app.services.service:restService#makeCall
         * @module app.services
         * @param {String} method the HTTP method that should be used for the call
         * @param {String} url absolute or relative URL of the resource that is being requested
         * @param {string|Object} data data to be sent as the request message data.
         * @param {Object} headers map of strings or functions which return strings representing
         * HTTP headers to send to the server. If the return value of a function is null, the header
         * will not be sent. Functions accept a config object as an argument.
         * @param {Function} callback the callback function that should be called when the request completes
         * @param {boolean|Cache} cache if true, a default $http cache will be used to cache the GET request,
         * otherwise if a cache instance built with $cacheFactory, this cache will be used for caching.
         * @param {Object.<string|Object>} getParams map of strings or objects which will be turned to
         * ?key1=value1&key2=value2 after the url. If the value is not a string, it will be JSONified.
         * getParams is only valid with a GET request.
         * @returns {Promise}
         * @description
         *
         * # makeCall
         * makeCall will execute an HTTP request
         */
        function makeCall(method, url, data, headers, callback, cache, getParams) {
            var deferred = $q.defer(),
                params;

            // if it is a get and cache is not defined then cache is true
            if (method === 'GET' && typeof cache === 'undefined') {
                cache = false;
            }

            // create the params
            params = {
                url: url,
                method: method,
                data: data,
                headers: headers,
                cache: cache,
                params: getParams
            };

            $http(params)
                .then(function (result) {
                    resolveDeferred(deferred, result, callback);
                }, function (err) {
                    deferred.reject(err);
                });

            return deferred.promise;
        }

        function buildFilter(qry) {
            var filter = [];

            for (var key in qry) {
                if (qry.hasOwnProperty(key)) {
                    filter.push(key + '::' + qry[key]);
                }
            }

            return filter.join('|');
        }
    }

})();
