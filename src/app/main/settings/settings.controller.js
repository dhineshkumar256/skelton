(function ()
{
    'use strict';

    angular
        .module('app.settings')
        .controller('SettingsController', SettingsController)

        function SettingsController($rootScope, $scope, $mdDialog, $state, api, ProfileData) {
            var vm = this;
            vm.userData = {};
            $scope.errorMsg = [];
            $scope.successMsg = [];
            $scope.templateContent = '';
            $scope.alertMsg = function(textContent) {
              alert = $mdDialog.alert({
                  title: 'Important !!',
                  textContent: textContent,
                  clickOutsideToClose: false,
                  ok: 'Close'
              });
              $mdDialog.show( alert )
              .finally(function() {
                  alert = undefined;
              });
            };
            if(ProfileData[0] != null){
                vm.userData.firstname = ProfileData[0].firstname;
                vm.userData.lastname = ProfileData[0].lastname;
                vm.userData.phone = ProfileData[0].phone;
                vm.userData.business_name = ProfileData[0].business_name;
                vm.userData.address = ProfileData[0].address;
                vm.userData.email = ProfileData[0].email;
                vm.userData.password = ProfileData[0].password;
            }else{
                var textContent = 'Update Your Profile!!'
                $scope.alertMsg(textContent);
                $scope.errorMsg.push('You Should Update Your Profile !!');
            }
            $scope.changePlan = function(){
              $state.go('app.payment');
            };
            $scope.updateUserdata = function(){
              $rootScope.loadingProgress = true;
              if(vm.userData) {
                var updateregistrationData = vm.userData;
                updateregistrationData['member_id'] = sessionStorage.getItem('member_id');
                $scope.successMsg.push('Profile Updates Successfully !!');
                $rootScope.loadingProgress = false;
                api.services.updateregistration.post(updateregistrationData,
                    function(response){
                    },
                    function(error){
                      console.log(error);
                    }
                );
              }
            };
        }
})();
