/**
 * Created by jonathan on 19/12/15.
 */
'use strict';

appSales
.factory('notify', [
    '$rootScope',
    function ($rootScope) {
        return {
            ShowNotify: function (type, message) {

                if (type == 'success')
                    $rootScope.__messagesucess.push(message);
                else if (type == 'warning')
                    $rootScope.__messagewarning.push(message);
                else if (type == 'danger')
                    $rootScope.__messagedanger.push(message);
                else //info
                    $rootScope.__messageinfo.push(message);
            },
            CloseNotify: function (type, index) {

                if (type == 'success')
                    $rootScope.__messagesucess.splice(index, 1);
                else if (type == 'warning')
                    $rootScope.__messagewarning.splice(index, 1);
                else if (type == 'danger')
                    $rootScope.__messagedanger.splice(index, 1);
                else //info
                    $rootScope.__messageinfo.splice(index, 1);
            }
        }
    }
    ]
);