'use strict';

angular.module('appSales.clients', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/clients', {
        templateUrl: 'clients/clients.html',
        controller: 'clientsCtrl'
    });
}])

.controller('clientsCtrl', [
    'notify',
    '$scope',
    'request',
    function(notify, $scope, request) {
        $scope.index = -1;
        $scope.data = [];
        $scope.dataAddress = [];
        $scope.deletedata = [];

        $scope.NewReg = false;

        $scope.model = {
            id: 'NaN',
            index: 0,
            name: '',
            address: []
        };

        $scope.addr = {
            id: 'NaN',
            index: 0,
            address: '',
            number: '',
            district: ''
        };

        $scope.defaultData = function () {
            $scope.index = -1;
            $scope.model.id = 'NaN';
            $scope.model.name = '';
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
            $scope.data.pop();
            request.GetJSON('clients/', function (err, data) {
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

            $scope.model.address = [];
            for (var i = 0, leng = $scope.data[_index].address.length; i < leng; i++){
                $scope.dataAddress.push({
                    id: $scope.data[_index].address[i]._id,
                    index: $scope.data[_index].address[i].index,
                    address: $scope.data[_index].address[i].address,
                    district: $scope.data[_index].address[i].district,
                    number: $scope.data[_index].address[i].number
                });
            }
        };

        $scope.DeleteRegister = function (_index) {
            request.DeleteForm('clients/' + $scope.data[_index]._id, function (err, data) {
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
                $scope.model.name = $scope.deletedata[0].name;
                $scope.model.id = 'NaN';

                $scope.model.name = $scope.deletedata[0].name;
                $scope.model.index = $scope.deletedata[0].index;

                $scope.model.address = [];
                for (var i = 0, leng = $scope.deletedata[0].address.length; i < leng; i++){
                    $scope.dataAddress.push({
                        id: $scope.deletedata[0].address[i]._id,
                        index: $scope.deletedata[0].address[i].index,
                        address: $scope.deletedata[0].address[i].address,
                        district: $scope.deletedata[0].address[i].district,
                        number: $scope.deletedata[0].address[i].number
                    });
                }

                $scope.PostData();
            }
        };

        $scope.PostData = function () {
            var requestJSON = {};
            $scope.model.address = [];

            if ($scope.model.id == 'NaN'){
                requestJSON = {
                    "id":$scope.model.id,
                    "index": $scope.model.index,
                    "name": $scope.model.name,
                    "address": $scope.salesorder.address
                };

                for(var i= 0, leng = $scope.dataAddress.length; i < leng; i++){
                    requestJSON.address.push({
                        index: $scope.dataAddress[i].index,
                        district: $scope.dataAddress[i].district,
                        number: $scope.dataAddress[i].number,
                        address: $scope.dataAddress[i].address
                    });
                }

                request.PostJSON('clients/', JSON.stringify(requestJSON),
                    function (err, data) {
                        if (!err) {
                            if (data.error) {
                                for (var i = 0, leng = data.error.length; i < leng; i++)
                                    notify.ShowNotify('warning', data.error[i].msg);
                            }
                            else {
                                $scope.LoadGrid();
                                $scope.defaultData();
                                $scope.deletedata.pop();
                                $scope.NewReg = false;

                            }
                        }
                    });
            }
            else {
                requestJSON = {
                    "id":$scope.model.id,
                    "index": $scope.model.index,
                    "name": $scope.model.name,
                    "address": $scope.salesorder.address
                };

                for(var i= 0, leng = $scope.dataAddress.length; i < leng; i++){
                    requestJSON.address.push({
                        index: $scope.dataAddress[i].index,
                        id: $scope.dataAddress[i]._id,
                        district: $scope.dataAddress[i].district,
                        number: $scope.dataAddress[i].number,
                        address: $scope.dataAddress[i].address
                    });
                }

                request.PutJSON('clients/', JSON.stringify(requestJSON),
                    function (err, data) {
                        if (!err) {
                            if (data.error) {
                                for (var i = 0, leng = data.error.length; i < leng; i++)
                                    notify.ShowNotify('warning', data.error[i].msg);
                            }
                            else {

                                $scope.LoadGrid();
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