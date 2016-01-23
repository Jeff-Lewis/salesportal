/**
 * Created by jonathan on 18/12/15.
 */
'use strict';

angular.module('appSales.salesorder', ['ngRoute'])
    .config(['$routeProvider',  function($routeProvider) {

        $routeProvider.when('/salesorder', {
            templateUrl: 'salesorder/salesorder.html',
            controller: 'salesorderCtrl'
        });
    }])

.controller('salesorderCtrl', [
    '$scope',
    'request',
    'notify',
    '$filter',
    function($scope, request, notify, $filter) {
        $scope.index = -1;
        $scope.data = [];
        $scope.dataitems = [];
        $scope.dataclient = [];
        $scope.dataproduct = [];
        $scope.deletedata = [];
        $scope.deleteitemOrder = [];

        $scope.NumOrders = 0;
        $scope.NumClients = 0;
        $scope.NumItems = 0;
        $scope.NumProducts = 0;
        $scope.NewReg = false;
        $scope.EditReg = false;

        $scope.txtsearchClient = '';
        $scope.txtsearchProduct = '';


        $scope.salesorder = {
            id:'NaN',
            idclient:'NaN',
            date:'',
            modifieddate:'',
            status : '0',
            quantityitems:0,
            totalvalue:0,
            items:[]
        };

        $scope.salesorderitem = {
            id:'NaN',
            index:1,
            iditem:{
                _id:'NaN',
                description: ''
            },
            quantity:0,
            value:0,
            totalitem:0
        };

        $scope.client = {
            id:'NaN',
            name:'',
            clientname:''
        };

        $scope.product = {
            id:'NaN',
            description:'',
            value:''
        };

        $scope.InitPage = function () {
            $scope.LoadGrid();
            $scope.GetClients();
            $scope.GetProducts();
        };

        $scope.NewRegister = function () {
            $scope.NewReg = true;
            $scope.salesorder.date = $filter('date')(Date.now(), 'dd/MM/yyyy') ;
            $scope.salesorder.modifieddate = $filter('date')(Date.now(), 'dd/MM/yyyy HH:mm:ss') ;
        };

        $scope.CancelRegister = function () {
            $scope.NewReg = false;
            $scope.defaultData();
            $scope.defaultClient();
            $scope.defaultProduct();
        };

        /* Products */
        $scope.defaultProduct = function () {
            $scope.product.id = 'NaN';
            $scope.product.description = '';
            $scope.product.value = '';
        };

        $scope.searchProduct = function () {

        };

        $scope.ckeProductChange = function (pindex) {

        };

        $scope.existsProduct = function (_id) {
            for(var i = 0, leng = $scope.dataitems.length; i< leng; i++){
                if ($scope.dataitems[i].iditem._id == _id){
                    return true;
                }
            }
            return false;
        };

        $scope.productConfirm = function () {
            for (var i= 0, leng=$scope.dataproduct.length; i < leng; i++){
                if($scope.dataproduct[i].checked) {
                    if(!$scope.existsProduct($scope.dataproduct[i]._id)) {
                        $scope.dataitems.push({
                            index: Math.floor((Math.random() * 100) + 1),
                            iditem: { _id: $scope.dataproduct[i]._id, description: $scope.dataproduct[i].description },
                            quantity: 1,
                            value: $scope.dataproduct[i].value,
                            totalitem: $scope.dataproduct[i].value
                        });
                    }
                }
            }
            angular.forEach($scope.dataproduct, function(product, index) {
                product.checked = false;
            });
            $scope.txtsearchProduct = '';
        };

        var CalcSalesOrderTotal = function () {
            $scope.NumItems = $scope.dataitems.length;
            $scope.salesorder.quantityitems = $scope.dataitems.length;
            $scope.salesorder.totalvalue = $scope.SumItems('totalvalue');
        };

        $scope.$watch('dataitems', CalcSalesOrderTotal, true );

        $scope.GetProducts = function () {
            request.GetJSON('products/', function (err, data) {
                if (!err) {
                    for (var i = 0, leng = data.length; i < leng; i++) {
                        $scope.dataproduct.push({
                            checked: false,
                            _id:data[i]._id,
                            description:data[i].description,
                            value:data[i].value
                        });
                    }
                    $scope.NumProducts = $scope.dataproduct.length;
                }
                else {
                    alert('Erro');
                }
            });
        };

        /* Clients */
        $scope.defaultClient = function () {
            $scope.client.id = 'NaN';
            $scope.client.name = '';
            $scope.client.clientname = '';
        };

        $scope.searchClient = function () {
            console.log('searchClient');
        };

        $scope.ckeClientChange = function (pindex) {
            angular.forEach( $filter('filter')($scope.dataclient, $scope.txtsearchClient), function(client, index) {
                if (pindex != index)
                    client.checked = false;
            });
        };

        $scope.clientConfirm = function () {
            for (var i= 0, leng=$scope.dataclient.length; i < leng; i++){
                if($scope.dataclient[i].checked) {
                    $scope.client.id = $scope.dataclient[i]._id;
                    $scope.client.name = $scope.dataclient[i].name;
                    $scope.client.clientname = i + ' - ' + $scope.dataclient[i].name;
                    break;
                }
                else{
                    $scope.defaultClient();
                }
            }
            angular.forEach($scope.dataclient, function(client, index) {
                client.checked = false;
            });
            $scope.txtsearchClient = '';
        };

        $scope.GetClients = function () {
            request.GetJSON('clients/', function (err, data) {
                if (!err) {
                    for (var i = 0, leng = data.length; i < leng; i++) {
                        $scope.dataclient.push({ checked: false, _id:data[i]._id, name:data[i].name});
                    }
                    $scope.NumClients = $scope.dataclient.length;
                }
                else {
                    alert('Erro');
                }
            });
        };


        /* Sales Order */
        $scope.defaultData = function () {
            $scope.index = -1;
            $scope.salesorder.id = 'NaN';
            $scope.salesorder.idclient = 'NaN';
            $scope.salesorder.date = '';
            $scope.salesorder.modifieddate = '';
            $scope.salesorder.status  = '0';
            $scope.salesorder.quantityitems = 0;
            $scope.salesorder.totalvalue = 0;
            $scope.salesorder.items = [];

            $scope.salesorderitem.id = 'NaN';
            $scope.salesorderitem.index = 1;
            $scope.salesorderitem.iditem._id = 'NaN';
            $scope.salesorderitem.iditem.description = '';
            $scope.salesorderitem.quantity = 0;
            $scope.salesorderitem.value = 0;
            $scope.salesorderitem.totalitem = 0;

            $scope.client.id = 'NaN';
            $scope.client.name = '';
            $scope.client.clientname = '';

            $scope.product.id = 'NaN';
            $scope.product.description = '';
            $scope.product.value = '';

            $scope.dataitems = [];

            $scope.NumItems = $scope.dataitems.length;
            $scope.salesorder.quantityitems = $scope.dataitems.length;
            $scope.salesorder.totalvalue = $scope.SumItems('totalvalue');
        };

        $scope.EditOrderItem = function (index) {

            angular.forEach( $filter('filter')($scope.dataitems, { index: index}), function(orderitem, index) {
                $scope.salesorderitem.id = orderitem._id;
                $scope.salesorderitem.index = orderitem.index;
                $scope.salesorderitem.iditem._id = orderitem.iditem._id;
                $scope.salesorderitem.iditem.description =  orderitem.iditem.description;
                $scope.salesorderitem.quantity = orderitem.quantity;
                $scope.salesorderitem.value = orderitem.value;
                $scope.salesorderitem.totalitem = orderitem.totalitem;

            });


            $scope.EditReg = true;
        };

        $scope.DeleteOrderItem = function (index) {
            angular.forEach( $filter('filter')($scope.dataitems, { index: index}), function(orderitem, index) {
                $scope.deleteitemOrder.push(orderitem);
                $scope.dataitems.splice(index, 1);
            });
        };

        $scope.RestoreOrderItem = function () {
            angular.forEach( $scope.deleteitemOrder, function(orderitem, index) {
                $scope.dataitems.push(orderitem);
            });

            $scope.deleteitemOrder.pop();
        };

        $scope.SaveOrderItem = function (index) {
            angular.forEach( $filter('filter')($scope.dataitems, { index: index}), function(orderitem, index) {
                orderitem._id = $scope.salesorderitem.id ;
                orderitem.index = $scope.salesorderitem.index ;
                orderitem.iditem._id = $scope.salesorderitem.iditem._id ;
                orderitem.iditem.description = $scope.salesorderitem.iditem.description ;
                orderitem.quantity = $scope.salesorderitem.quantity ;
                orderitem.value = $scope.salesorderitem.value ;
                orderitem.totalitem = $scope.salesorderitem.totalitem ;

            });
            $scope.EditReg = false;
        };

        var TotalOrderItem = function () {
            $scope.salesorderitem.totalitem = $scope.salesorderitem.quantity * $scope.salesorderitem.value;
        };

        $scope.$watch('salesorderitem.quantity',TotalOrderItem, true );
        $scope.$watch('salesorderitem.value',TotalOrderItem, true );

        $scope.CancelOrderItem = function (index) {
            $scope.EditReg = false;
        };


        $scope.DecodeStatus = function (e) {
            if(e == '1')
                return 'Aprovado';
            else if(e == '2')
                return 'Reprovado';
            else if(e == '3')
                return 'Concluído';
            else
                return 'Pendente';
        };

        $scope.SumItems = function (type) {
            var ret = 0;

            var i = 0;
            var leng = $scope.dataitems.length;
            if (type == 'qty'){

                for (i = 0; i < leng; i++) {
                    ret += parseFloat($scope.dataitems[i].quantity, 0);
                }
            }
            else if (type == 'totalvalue'){
                for (i = 0; i < leng; i++) {
                    ret += parseFloat($scope.dataitems[i].totalitem, 2);
                }
            }
            return ret;
        };



        $scope.LoadGrid = function () {
            request.GetJSON('salesorder/', function (err, data) {
                if (!err) {
                    $scope.data.pop();
                    for (var i = 0, leng = data.length; i < leng; i++) {
                        $scope.data.push(data[i]);
                    }
                    $scope.NumOrders = $scope.data.length;
                }
                else {
                    notify.ShowNotify('danger', 'Não foi possível carregar os dados');
                }
            });
        };


        $scope.EditRegister = function (_index) {

            request.GetJSON('salesorder/' + _index, function (err, data) {
                if(!err){
                    $scope.NewReg = true;
                    //$scope.index = _index;

                    $scope.salesorder.id = data._id;
                    $scope.client.id = data.idclient._id;
                    $scope.client.name = data.idclient.name;
                    $scope.client.clientname = data.idclient.name;
                    $scope.salesorder.date = $filter('date')(data.date, 'dd/MM/yyyy') ;
                    $scope.salesorder.modifieddate = $filter('date')(data.modifieddate, 'dd/MM/yyyy HH:mm:ss') ;
                    $scope.salesorder.status  =  data.status.toString();
                    $scope.salesorder.quantityitems = data.quantityitems;
                    $scope.salesorder.totalvalue = data.totalvalue;

                    for (var i= 0, leng= data.items.length; i < leng; i++) {
                        $scope.dataitems.push({
                            index: data.items[i].index,
                            iditem: {_id: data.items[i].iditem._id, description: data.items[i].iditem.description},
                            quantity: data.items[i].quantity,
                            value: data.items[i].value,
                            totalitem: data.items[i].totalitem
                        });


                    }

                    //$scope.salesorder.items = data.items;
                }
                else {
                    notify.ShowNotify('danger', 'Não foi possível carregar o registro.');
                }

            });



        };

        $scope.DeleteRegister = function (_index) {
            console.log(_index);

            request.DeleteForm('salesorder/' +  $scope.data[_index]._id, function (err, data) {
                if (!err) {
                    $scope.deletedata.pop();
                    $scope.deletedata.push($scope.data[_index]);
                    $scope.data.splice(_index, 1);
                    $scope.defaultData();
                    $scope.NumOrders = $scope.data.length;
                }
                else {
                    alert('Não foi possível excluir o registro.');
                    //notify.ShowNotify('danger', 'Não foi possível excluir o registro.');
                }
            });
        };

        $scope.RestoreRegister = function () {
            if ($scope.deletedata.length > 0) {

                $scope.salesorder.id = 'NaN';
                $scope.client.id = $scope.deletedata[0].idclient._id;
                $scope.client.name = $scope.deletedata[0].idclient.name;
                $scope.client.clientname = $scope.deletedata[0].idclient.name;
                $scope.salesorder.date = $filter('date')($scope.deletedata[0].date, 'dd/MM/yyyy') ;
                $scope.salesorder.modifieddate = $filter('date')($scope.deletedata[0].modifieddate, 'dd/MM/yyyy HH:mm:ss') ;
                $scope.salesorder.status  =  $scope.deletedata[0].status.toString();
                $scope.salesorder.quantityitems = $scope.deletedata[0].quantityitems;
                $scope.salesorder.totalvalue = $scope.deletedata[0].totalvalue;

                for (var i= 0, leng= $scope.deletedata[0].items.length; i < leng; i++) {
                    $scope.dataitems.push({
                        index: $scope.deletedata[0].items[i].index,
                        iditem: {_id: $scope.deletedata[0].items[i].iditem._id, description: $scope.deletedata[0].items[i].iditem.description},
                        quantity: $scope.deletedata[0].items[i].quantity,
                        value: $scope.deletedata[0].items[i].value,
                        totalitem: $scope.deletedata[0].items[i].totalitem
                    });
                }


                $scope.PostData();
            }
        };

        $scope.PostData = function () {
            var requestJSON = {};
            $scope.salesorder.items = [];

            if ($scope.salesorder.id == 'NaN') {
                requestJSON = {
                    "idclient":$scope.client.id,
                    "date": new Date($scope.salesorder.date),
                    "modifieddate": new Date($scope.salesorder.modifieddate),
                    "status": $scope.salesorder.status,
                    "quantityitems": $scope.salesorder.quantityitems,
                    "totalvalue": $scope.salesorder.totalvalue,
                    "items": $scope.salesorder.items
                };

                for(var i= 0, leng = $scope.dataitems.length; i < leng; i++){
                    requestJSON.items.push({
                        index: $scope.dataitems[i].index,
                        iditem: $scope.dataitems[i].iditem._id,
                        quantity: $scope.dataitems[i].quantity,
                        value: $scope.dataitems[i].value,
                        totalitem: $scope.dataitems[i].totalitem
                    });
                }


                request.PostJSON('salesorder/', JSON.stringify(requestJSON),
                    function (err, data) {
                        if (!err) {
                            if (data.error) {
                                for (var i = 0, leng = data.error.length; i < leng; i++)
                                    notify.ShowNotify('warning', data.error[i].msg);
                            }
                            else {
                                $scope.data.pop();
                                $scope.LoadGrid();
                                $scope.defaultData();
                                $scope.deletedata.pop();
                                $scope.NewReg = false;
                                $scope.NumOrders = $scope.data.length;
                            }
                        }
                    });
            }
            else {
                requestJSON = {
                    "id" : $scope.salesorder.id,
                    "idclient":$scope.client.id,
                    "date": new Date($scope.salesorder.date),
                    "modifieddate": new Date($scope.salesorder.modifieddate),
                    "status": $scope.salesorder.status,
                    "quantityitems": $scope.salesorder.quantityitems,
                    "totalvalue": $scope.salesorder.totalvalue,
                    "items": $scope.salesorder.items
                };

                for(var i= 0, leng = $scope.dataitems.length; i < leng; i++){
                    requestJSON.items.push({
                        index: $scope.dataitems[i].index,
                        iditem: $scope.dataitems[i].iditem._id,
                        quantity: $scope.dataitems[i].quantity,
                        value: $scope.dataitems[i].value,
                        totalitem: $scope.dataitems[i].totalitem
                    });
                }

                request.PutJSON('salesorder/', JSON.stringify(requestJSON),
                    function (err, data) {
                        if (!err) {
                            if (data.error) {
                                for (var i = 0, leng = data.error.length; i < leng; i++){
                                    if (data.error[i].msg)
                                        notify.ShowNotify('warning', data.error[i].msg);
                                    else
                                        alert(data.error[i]);
                                }

                            }
                            else {
                                $scope.data.pop();
                                $scope.LoadGrid();
                                $scope.defaultData();
                                $scope.deletedata.pop();
                                $scope.NewReg = false;
                                $scope.NumOrders = $scope.data.length;
                            }
                        }
                    });
            }
        };
    }
    ]
);