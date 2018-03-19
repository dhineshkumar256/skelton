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
        var bool = true;
        $scope.registerAcc = function(){
          if(vm.form.password == vm.form.passwordConfirm){
              vm.passchek = true;
              bool=true;
          }else{
            vm.passchek = false;
            bool = false;
          }
          if(bool){
            var registerAuthData = {'email': vm.form.email, 'password': vm.form.password};
            api.services.registerAcc.post(registerAuthData,
                function (response){
                  if(response[0]){
                    sessionStorage.setItem('member_id', response[0].member_id);
                    $state.go('app.settings');
                  }else {
                    console.log('account Already Exist');
                  }
                },
                function(error) {
                  console.log(error);
                }
            );
          }
        }
    }
})();
