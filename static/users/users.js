'use strict';

angular.module('appSales.users', ['ngRoute'])
.config(['$routeProvider',  function($routeProvider) {

  $routeProvider.when('/users', {
    templateUrl: 'users/users.html',
    controller: 'usersCtrl'
  });
}])

.controller('usersCtrl', [
    'notify',
    '$scope',
    'request',
    function(notify, $scope, request) {
        $scope.index = -1;
        $scope.data = [];
        $scope.deletedata = [];

        $scope.NewReg = false;

        $scope.model = {
            index: 0,
            id: 'NaN',
            email: '',
            name: '',
            password: '',
            passwordbis: ''
        };

        $scope.defaultData = function () {
            $scope.index = -1;
            $scope.model.name = '';
            $scope.model.password = '';
            $scope.model.passwordbis = '';
            $scope.model.id = 'NaN';
            $scope.model.index = 0;
            $scope.model.email = '';

        };

        $scope.NewRegister = function () {
            $scope.NewReg = true;
            $scope.model.index = Math.floor((Math.random() * 9999999999) + 1);
        };

        $scope.CancelRegister = function () {
            $scope.NewReg = false;
            $scope.defaultData();
        };

        $scope.LoadGrid = function () {
            request.GetJSON('users/', function (err, data) {
                if (!err) {
                    for (var i = 0, leng = data.length; i < leng; i++) {
                        $scope.data.push(data[i]);
                    }

                }
                else {
                    notify.ShowNotify('danger', 'Não foi possível carregar os dados');
                }
            });
        };

        $scope.LoadRegister = function (_index) {
            $scope.NewReg = true;
            $scope.index = _index;
            $scope.model.id = $scope.data[_index]._id;
            $scope.model.name = $scope.data[_index].name;
            $scope.model.index = $scope.data[_index].index;
            $scope.model.email = $scope.data[_index].email;
        };

        $scope.DeleteRegister = function (_index) {

            request.DeleteForm('users/' + $scope.data[_index]._id, function (err, data) {
                if (!err) {
                    $scope.deletedata.pop();
                    console.log(data);
                    $scope.deletedata.push($scope.data[_index]);
                    $scope.data.splice(_index, 1);
                    $scope.defaultData();

                }
                else {
                    notify.ShowNotify('danger', 'Não foi possível excluir o registro.');
                }
            });
        };

        $scope.RestoreRegister = function () {
            if ($scope.deletedata.length > 0) {
                $scope.model.name = $scope.deletedata[0].name;
                $scope.model.email = $scope.deletedata[0].email;
                $scope.model.index = $scope.deletedata[0].index;
                $scope.model.password = $scope.deletedata[0].password;
                $scope.model.passwordbis = $scope.deletedata[0].password;
                $scope.model.id = 'NaN';
                $scope.PostData();
            }
        };

        $scope.PostData = function () {
            var reqbody = 'name='+ $scope.model.name;
            reqbody += '&password='+ $scope.model.password;
            reqbody += '&passwordbis='+ $scope.model.passwordbis;
            reqbody += '&email='+ $scope.model.email;
            reqbody += '&index='+ $scope.model.index;

            if ($scope.model.id == 'NaN') {
                request.PostForm('users/', reqbody,
                    function (err, data) {
                        if (!err) {
                            if (data.error) {
                                for (var i = 0, leng = data.error.length; i < leng; i++)
                                    notify.ShowNotify('warning', data.error[i].msg);
                            }
                            else {
                                $scope.data.push(data);
                                $scope.defaultData();
                                $scope.deletedata.pop();
                                $scope.NewReg = false;

                            }
                        }
                    });
            }
            else {
                reqbody += '&id='+$scope.model.id;

                request.PutForm('users/', reqbody,
                    function (err, data) {
                        console.log(data);
                        if (!err) {
                            if (data.error) {

                                for (var i = 0, leng = data.error.length; i < leng; i++)
                                    notify.ShowNotify('warning', data.error[i].msg);
                            }
                            else {
                                $scope.data[$scope.index].id = data.id;
                                $scope.data[$scope.index].name = data.name;
                                $scope.data[$scope.index].password = data.password;
                                $scope.data[$scope.index].passwordbis = data.passwordbis;
                                $scope.data[$scope.index].index = data.index;
                                $scope.data[$scope.index].email = data.email;
                                $scope.defaultData();
                                $scope.deletedata.pop();
                                $scope.NewReg = false;

                            }
                        }
                    });
            }
        };
    }
    ]
);