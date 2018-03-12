(function ()
{
    'use strict';

    angular
        .module('app.login')
        .controller('LoginController', function($scope, $state){
            
            angular.extend($scope, {
                login: function(){
                    console.log('hi');
                    $state.go('app.dashboard');
                }
            });
    });
})();
