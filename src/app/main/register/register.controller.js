(function ()
{
    'use strict';

    angular
        .module('app.register')
        .controller('RegisterController', RegisterController);

    /** @ngInject */
    function RegisterController(api, $scope, $state)
    {
        var vm = this;
        vm.passchek = true;
        vm.form = {};
        var bool = true, email = 'rajdhinesh256@gmail.com',
            password = 'd123';
        $scope.registerAcc = function(){
          if(vm.form.password == vm.form.passwordConfirm){
              vm.passchek = true;
              bool=true;
          }else{
            vm.passchek = false;
            bool = false;
          }
          if(bool){
            api.register.registerAcc.post({'email': vm.form.email, 'password': vm.form.password},
                function (response){
                  sessionStorage.setItem('member_id', response[0].member_id);
                  $state.go('app.settings');
                },
                function(error) {
                  console.log(error);
                }
            );
          }
        }
    }
})();
