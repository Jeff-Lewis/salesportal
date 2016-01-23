'use strict';

angular.module('appSales.products', ['ngRoute'])

.config(['$routeProvider',  function($routeProvider) {
  $routeProvider.when('/products', {
    templateUrl: 'products/products.html',
    controller: 'productsCtrl'
  });
}])

.controller('productsCtrl', [
    'notify',
    '$scope',
    'request',
    function(notify, $scope, request) {
        $scope.index = -1;
        $scope.data = [];
        $scope.dataUnit = [];
        $scope.deletedata = [];

        $scope.NewReg = false;

        $scope.model = {
            id: 'NaN',
            code:'',
            description: '',
            value: 0,
            unitmeasurement: ''
        };

        $scope.InitView = function () {
            $scope.LoadGrid();
            $scope.LoadUnit();
        };

        $scope.defaultData = function () {
            $scope.index = -1;
            $scope.model.description = '';
            $scope.model.value = 0;
            $scope.model.id = 'NaN';
            $scope.model.code = '';
            $scope.model.unitmeasurement = '';
        };

        $scope.NewRegister = function () {
            $scope.NewReg = true;
        };

        $scope.CancelRegister = function () {
            $scope.NewReg = false;
            $scope.defaultData();
        };

        $scope.LoadGrid = function () {
            request.GetJSON('products/', function (err, data) {
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

        $scope.LoadUnit = function () {
            request.GetJSON('unitmeasurement/', function (err, data) {
                if (!err) {
                    for (var i = 0, leng = data.length; i < leng; i++) {
                        $scope.dataUnit.push(data[i]);
                    }

                }
                else {
                    notify.ShowNotify('danger', 'Não foi possível carregar unidade de medida.');
                }
            });
        };

        $scope.LoadRegister = function (_index) {
            $scope.NewReg = true;
            $scope.index = _index;
            $scope.model.code = $scope.data[_index].code;
            $scope.model.id = $scope.data[_index]._id;
            $scope.model.description = $scope.data[_index].description;
            $scope.model.value = $scope.data[_index].value;
            $scope.model.unitmeasurement = $scope.data[_index].unitmeasurement;
        };

        $scope.DeleteRegister = function (_index) {

            request.DeleteForm('products/' + $scope.data[_index]._id, function (err, data) {
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
                $scope.model.value = $scope.deletedata[0].value;
                $scope.model.unitmeasurement = $scope.deletedata[0].unitmeasurement;
                $scope.model.code = $scope.deletedata[0].code;
                $scope.model.id = 'NaN';
                $scope.PostData();
            }
        };

        $scope.PostData = function () {
            var reqbody = 'code='+ $scope.model.code;
            reqbody += '&description='+ $scope.model.description;
            reqbody += '&value='+ parseFloat( $scope.model.value);
            reqbody += '&unitmeasurement='+ $scope.model.unitmeasurement;



            if ($scope.model.id == 'NaN') {

                request.PostForm('products/', reqbody,
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
                reqbody += '&id=' + $scope.model.id;

                request.PutForm('products/', reqbody,
                    function (err, data) {
                        if (!err) {
                            if (data.error) {
                                for (var i = 0, leng = data.error.length; i < leng; i++)
                                    notify.ShowNotify('warning', data.error[i].msg);
                            }
                            else {
                                $scope.data[$scope.index].id = data.id;
                                $scope.data[$scope.index].description = data.description;
                                $scope.data[$scope.index].value = data.value;
                                $scope.data[$scope.index].code = data.code;
                                $scope.data[$scope.index].unitmeasurement = data.unitmeasurement;
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