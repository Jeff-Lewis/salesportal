'use strict';

angular.module('appSales.home', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/home', {
        templateUrl: 'home/home.html',
        controller: 'homeCtrl'
    });
}])
.controller('homeCtrl', [
        '$scope',
        '$http',
        function($scope, $http) {

        }
    ]
)
.run([ '$http', '$cookies', '$location', function($http, $cookies, $location) {
   // $cookies.put('myFavorite', 'oatmeal');
    $http.defaults.headers.post['X-CSRFToken'] = $cookies.csrftoken;
}]);