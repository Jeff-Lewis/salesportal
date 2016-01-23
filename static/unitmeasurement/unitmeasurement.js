/**
 * Created by jonathan on 02/01/16.
 */
'use strict';

angular.module('appSales.unitmeasurement', ['ngRoute'])

    .config(['$routeProvider',  function($routeProvider) {
        $routeProvider.when('/unitmeasurement', {
            templateUrl: 'unitmeasurement/unitmeasurement.html',
            controller: 'unitmeasurementCtrl'
        });
    }])

    .controller('unitmeasurementCtrl', [
        'notify',
        '$scope',
        'request',
        function(notify, $scope, request) {
            $scope.index = -1;
            $scope.data = [];
            $scope.deletedata = [];
            $scope.NewReg = false;

            $scope.model = {
                id: 'NaN',
                prefix:'',
                description: '',
                factor: 0
            };

            $scope.defaultData = function () {
                $scope.index = -1;
                $scope.model.description = '';
                $scope.model.factor = 0;
                $scope.model.id = 'NaN';
                $scope.model.prefix = '';
            };

            $scope.NewRegister = function () {
                $scope.NewReg = true;
            };

            $scope.CancelRegister = function () {
                $scope.NewReg = false;
                $scope.defaultData();
            };

            $scope.LoadGrid = function () {
                request.GetJSON('unitmeasurement/', function (err, data) {
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
                $scope.model.prefix = $scope.data[_index].prefix;
                $scope.model.id = $scope.data[_index]._id;
                $scope.model.description = $scope.data[_index].description;
                $scope.model.factor = $scope.data[_index].factor;
            };

            $scope.DeleteRegister = function (_index) {

                request.DeleteForm('unitmeasurement/' + $scope.data[_index]._id, function (err, data) {
                    if (!err) {
                        $scope.deletedata.pop();
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
                    $scope.model.description = $scope.deletedata[0].description;
                    $scope.model.prefix = $scope.deletedata[0].prefix;
                    $scope.model.factor = $scope.deletedata[0].factor;
                    $scope.model.id = 'NaN';
                    $scope.PostData();
                }
            };

            $scope.PostData = function () {
                var reqbody = 'prefix='+ $scope.model.prefix;
                reqbody += '&description='+ $scope.model.description;
                reqbody += '&factor='+ parseFloat( $scope.model.factor);



                if ($scope.model.id == 'NaN') {

                    request.PostForm('unitmeasurement/', reqbody,
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
                                    $scope.NumProducts = $scope.data.length;
                                }
                            }
                        });
                }
                else {
                    reqbody += '&id=' + $scope.model.id;

                    request.PutForm('unitmeasurement/', reqbody,
                        function (err, data) {
                            if (!err) {
                                if (data.error) {
                                    for (var i = 0, leng = data.error.length; i < leng; i++)
                                        notify.ShowNotify('warning', data.error[i].msg);
                                }
                                else {
                                    $scope.data[$scope.index].id = data.id;
                                    $scope.data[$scope.index].description = data.description;
                                    $scope.data[$scope.index].factor = data.factor;
                                    $scope.data[$scope.index].prefix = data.prefix;
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