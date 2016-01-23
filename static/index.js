/**
 * Created by jonathan on 13/12/15.
 */
angular.module('appSales.index', []).
controller('indexCtrl', ['notify', '$rootScope', '$scope', '$cookies',
    function (notify, $rootScope, $scope, $cookies) {

        $scope.LoadPage = function () {
            $rootScope.__messagesucess = [];
            $rootScope.__messagewarning =[];
            $rootScope.__messagedanger = [];
            $rootScope.__messageinfo = [];
        };

        $scope.DismissNotify = function (type, index) {
            notify.CloseNotify(type, index);
        };

        $scope.GetMessagesSucess = function () {
            return $rootScope.__messagesucess;
        };
        $scope.GetMessagesWarning = function () {
            return $rootScope.__messagewarning;
        };
        $scope.GetMessagesDanger = function () {
            return $rootScope.__messagedanger;
        };
        $scope.GetMessagesInfo = function () {
            return $rootScope.__messageinfo;
        };

        $scope.Logged = function () {
            return $rootScope.IS_LOGGED;
        };

        $scope.Logout = function () {
            $cookies.remove('User-Token')
        };
    }
]);