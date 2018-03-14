(function ()
{
    'use strict';

    angular
        .module('app.register', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider)
    {
        // State
        $stateProvider.state('app.auth_register', {
            url      : '/auth_register',
            views    : {
                'main@'                    : {
                    templateUrl: 'app/core/layouts/content-only.html',
                    controller : 'MainController as vm'
                },
                'content@app.auth_register': {
                    templateUrl: 'app/main/register/register.html',
                    controller : 'RegisterController as vm'
                }
            },
            bodyClass: 'register'
        });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/register');

        msApiProvider.register('regi',
              [
                'https://justngage.azurewebsites.net/login',
                {email:'@email', password: '@password'}
              ]
        );
    }

})();
