(function ()
{
    'use strict';

    angular
        .module('app.forgot-password', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider.state('app.auth_forgot-password', {
            url      : '/auth_forgot-password',
            views    : {
                'main@'                                 : {
                    templateUrl: 'app/core/layouts/content-only.html',
                    controller : 'MainController as vm'
                },
                'content@app.auth_forgot-password': {
                    templateUrl: 'app/main/forgot-password/forgot-password.html',
                    controller : 'ForgotPasswordController as vm'
                }
            },
            bodyClass: 'forgot-password'
        });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/forgot-password');
    }

})();