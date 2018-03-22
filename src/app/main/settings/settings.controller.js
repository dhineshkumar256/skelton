(function ()
{
    'use strict';

    angular
        .module('app.settings')
        .controller('SettingsController', SettingsController)


        function SettingsController($scope, $mdDialog, $state, api, ProfileData) {
            var vm = this;
            vm.userData = {};
            function DialogController($scope, $mdDialog){
              $scope.cancel = function() {
                $mdDialog.cancel();
              };
              $scope.addcard = function() {
                $mdDialog.hide();
              };
            };

            if(ProfileData[0].firstname != null){
                vm.userData.firstname = ProfileData[0].firstname;
                vm.userData.lastname = ProfileData[0].lastname;
                vm.userData.phone = ProfileData[0].phone;
                vm.userData.business_name = ProfileData[0].business_name;
                vm.userData.address = ProfileData[0].address;
            }else{
                alert = $mdDialog.alert({
                    title: 'Important !!',
                    textContent: 'Update Your Profile!!',
                    ok: 'Close'
                });
                $mdDialog.show( alert )
                .finally(function() {
                    alert = undefined;
                });
            }
            $scope.card = {
              date: new Date()
            };
            $scope.addpayment = function(ev){
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
            };
            $scope.changePlan = function(){
              $state.go('app.payment');
            };
            $scope.updateUserdata = function(){
              if(vm.userData) {
                var updateregistrationData = vm.userData;
                updateregistrationData['member_id'] = sessionStorage.getItem('member_id');
                api.services.updateregistration.post(updateregistrationData,
                    function(response){
                      console.log(response);
                    },
                    function(error){
                      console.log(error);
                    }
                );
              }
            };
        }
})();
