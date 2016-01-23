/**
 * Created by jonathan on 19/12/15.
 */

appSales.directive('price', [
    '$filter',
    function($filter) {
        return {
            restrict:'A',
            require: 'ngModel',
            link: function(scope, element, attrs, ngModelController) {
                ngModelController.$parsers.push(function(data) {
                    //convert data from view format to model format

                    data=$filter('comma2decimal')(data);

                    return data;
                });

                ngModelController.$formatters.push(function(data) {
                    //convert data from model format to view format

                    data=$filter('decimal2comma')(data);

                    return data;
                });
            }
        };
    }
    ]
);

appSales.filter('comma2decimal', [
    function() {
        return function(input) {
            var ret=(input)?input.toString().trim().replace(",","."):null;
            return parseFloat(ret);
        };
    }
]);

appSales.filter('decimal2comma', [
    function() {
        return function(input) {
            var ret=(input)?input.toString().replace(".",","):null;
            if(ret){
                var decArr=ret.split(",");
                if(decArr.length>1){
                    var dec=decArr[1].length;
                    if(dec===1){ret+="0";}
                }
            }
            return ret;
        };
    }
]);