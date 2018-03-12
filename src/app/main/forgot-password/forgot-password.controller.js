(function ()
{
    'use strict';

    angular
        .module('app.forgot-password')
        .controller('ForgotPasswordController', function($scope, $state){
        
            angular.extend($scope, {
               sendResetlink: function() {
                   $state.go('app.login');
               } 
            });
    });
})();