(function ()
{
    'use strict';

    angular
        .module('app.login')
        .controller('LoginController', LoginController);

        function LoginController($rootScope, $state, $scope, api) {
            var vm = this;
            vm.userchek = true;
            vm.form = {};
            $scope.loginLoadingProgress = true;
            $scope.login = function() {
                vm.userchek = true;
                var loginAuthData = {'email': vm.form.email, 'password': vm.form.password};
                $scope.loginLoadingProgress = false;
                api.services.loginUsrapi.post(loginAuthData,
                    function (response){
                      if(response[0] != undefined){
                        $scope.loginLoadingProgress = true;
                          $state.go('app.dashboard');
                          vm.userchek = true;
                          sessionStorage.setItem('member_id', response[0].member_id);
                          $rootScope.ShowUsername = response[0].email;
                      }else{
                        vm.userchek = false;
                      }
                    },
                    function (error) {

                    }
                )
            }
        }
})();
