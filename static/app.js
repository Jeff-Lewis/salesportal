'use strict';

// Declare app level module which depends on views, and components
var appSales;
appSales = angular.module('appSales', [
    'ngRoute',
    'ngResource',
    'ngCookies',
    'appSales.index',
    'appSales.users',
    'appSales.products',
    'appSales.unitmeasurement',
    'appSales.clients',
    'appSales.home',
    'appSales.login',
    'appSales.salesorder'
]);

appSales
    .constant('URLS', {
        BASE:  'http://app.portal.com',
        BASE_API: 'http://app.portal.com/api/'
    })

    .factory('Auth',  function ($cookies, URLS, $http) {
          return {
              isLoggedIn: function (callback) {
                  var cookie = $cookies.get('User-Token');
                  if (cookie) {
                      $http({
                          method: 'POST',
                          url: URLS.BASE_API + 'users/authenticate',
                          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                          data: 'keytoken=' + cookie
                      }).success(function (data) {
                          callback(data.auth.success);
                      }).error(function () {
                          callback(false);
                      });
                  }
                  else
                      callback(false);
              }
          }
        })

    .config(['$routeProvider', '$cookiesProvider', '$locationProvider', '$httpProvider',
        function ($routeProvider, $cookiesProvider, $locationProvider, $httpProvider) {
            $httpProvider.defaults.withCredentials = true;


            $routeProvider.when('/login', {
                templateUrl: 'login/login.html',
                controller: 'loginCtrl'
            })
                .otherwise({redirectTo: '/home'});
        }])

    .run(['$rootScope', '$http', '$cookies', '$location', 'Auth', 'notify',
          function ($rootScope, $http, $cookies, $location, Auth, notify) {
              $http.defaults.headers.post['X-CSRFToken'] = $cookies.get('csrf-Token');
              $http.defaults.headers.post['x-access-token'] = $cookies.get('User-Token');
              $rootScope.$on('$locationChangeStart', function (event) {
                  Auth.isLoggedIn(function (ok) {
                      $rootScope.IS_LOGGED = ok;
                      if (!ok)
                          $location.path('/login');
                  });
              });
        }]);
