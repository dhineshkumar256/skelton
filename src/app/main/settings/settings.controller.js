(function ()
{
    'use strict';

    angular
        .module('app.settings')
        .controller('SettingsController', function($scope, $mdDialog, $state){
        
        $scope.card = {
            date: new Date()
        },
        angular.extend($scope, {
            addpayment: function(ev){
                $mdDialog.show({
                    controller: DialogController,
                    templateUrl: 'app/main/settings/settings.addpaymentModal.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose:true
                })
                .then(function(answer) {
                    console.log('then');
                }, function() {
                    console.log('end');
                });
                
                function DialogController($scope, $mdDialog){
                    $scope.cancel = function() {
                        $mdDialog.cancel();
                    };
                    $scope.addcard = function() {
                        $mdDialog.hide();
                    };
                }
            },
            changePlan: function() {
                $state.go('app.payment');
            }
        });
    });
})();
