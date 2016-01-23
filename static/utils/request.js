/**
 * Created by jonathan on 13/12/15.
 */
'use strict';

appSales.
factory('request', [
    'URLS',
    '$http',
    '$cookies',
    function (URLS, $http, $cookies) {
        return {
            GetParamJSON: function (url, data, callback) {
                var uri = URLS.BASE_API + url;
                $http({
                    method: 'GET',
                    url: uri,
                    headers: {'Content-Type': 'application/json','x-access-token' : $cookies.get('User-Token')},
                    data: data
                }).success(function (data, status) {
                    callback(false, data, status);
                }).error(function (data, status) {
                    callback(true, data, status);
                });
            },
            GetJSON: function (url, callback) {
                var uri = URLS.BASE_API + url;
                $http({
                    method: 'GET',
                    url: uri,
                    headers: {'Content-Type': 'application/json','x-access-token' : $cookies.get('User-Token')}
                }).success(function (data, status) {
                    callback(false, data, status);
                }).error(function (data, status) {
                    callback(true, data, status);
                });
            },
            PostForm: function (url, data, callback) {
                var uri = URLS.BASE_API + url;
                $http({
                    method: 'POST',
                    url: uri,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','x-access-token' : $cookies.get('User-Token')},
                    data: data
                }).success(function (data, status) {
                    callback(false, data, status);
                }).error(function (data, status) {
                    callback(true, data, status);
                });
            },
            PostJSON: function (url, data, callback) {
                var uri = URLS.BASE_API + url;
                $http({
                    method: 'POST',
                    url: uri,
                    headers: {'Content-Type': 'application/json','x-access-token' : $cookies.get('User-Token')},
                    data: data
                }).success(function (data, status) {
                    callback(false, data, status);
                }).error(function (data, status) {
                    callback(true, data, status);
                });
            },
            PutForm: function (url, data, callback) {
                var uri = URLS.BASE_API + url;
                $http({
                    method: 'PUT',
                    url: uri,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','x-access-token' : $cookies.get('User-Token')},
                    data: data
                }).success(function (data, status) {
                    callback(false, data, status);
                }).error(function (data, status) {
                    callback(true, data, status);
                });
            },
            PutJSON: function (url, data, callback) {
                var uri = URLS.BASE_API + url;
                $http({
                    method: 'PUT',
                    url: uri,
                    headers: {'Content-Type': 'application/json','x-access-token' : $cookies.get('User-Token')},
                    data: data
                }).success(function (data, status) {
                    callback(false, data, status);
                }).error(function (data, status) {
                    callback(true, data, status);
                });
            },
            DeleteJSON: function (url, data, callback) {
                var uri = URLS.BASE_API + url;
                $http({
                    method: 'DELETE',
                    url: uri,
                    headers: {'Content-Type': 'application/json','x-access-token' : $cookies.get('User-Token')},
                    data: data
                }).success(function (data, status) {
                    callback(false, data, status);
                }).error(function (data, status) {
                    callback(true, data, status);
                });
            },
            DeleteParamForm: function (url, data, callback) {
                var uri = URLS.BASE_API + url;
                $http({
                    method: 'DELETE',
                    url: uri,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','x-access-token' : $cookies.get('User-Token')},
                    data: data
                }).success(function (data, status) {
                    callback(false, data, status);
                }).error(function (data, status) {
                    callback(true, data, status);
                });
            },
            DeleteForm: function (url, callback) {
                var uri = URLS.BASE_API + url;
                $http({
                    method: 'DELETE',
                    url: uri,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','x-access-token' : $cookies.get('User-Token')}
                }).success(function (data, status) {
                    callback(false, data, status);
                }).error(function (data, status) {
                    callback(true, data, status);
                });
            }
        }
    }
]);