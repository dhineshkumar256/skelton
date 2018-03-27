(function ()
{
    'use strict';

    angular
        .module('app.settings')
        .controller('SettingsController', SettingsController)


        function SettingsController($scope, $mdDialog, $state, api, ProfileData) {
            var vm = this;
            vm.userData = {};
            if(ProfileData[0] != null){
                vm.userData.firstname = ProfileData[0].firstname;
                vm.userData.lastname = ProfileData[0].lastname;
                vm.userData.phone = ProfileData[0].phone;
                vm.userData.business_name = ProfileData[0].business_name;
                vm.userData.address = ProfileData[0].address;
                vm.userData.email = ProfileData[0].email;
                vm.userData.password = ProfileData[0].password;
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
