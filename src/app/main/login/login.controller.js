(function ()
{
    'use strict';

    angular
        .module('app.login')
        .controller('LoginController', LoginController);

        function LoginController($state, $scope, api) {
            var vm = this;
            vm.userchek = true;
            vm.form = {};
            $scope.login = function() {
                api.login.loginUsr.post({'email': vm.form.email, 'password': vm.form.password},
                    function (response){
                      if(response[0] != undefined){
                          $state.go('app.dashboard');
                          vm.userchek = true;
                          sessionStorage.setItem('member_id', response[0].member_id);
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
