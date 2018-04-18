(function ()
{
    'use strict';

    angular
        .module('app.settings', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider
            .state('app.settings', {
                url    : '/settings',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/settings/settings.html',
                        controller : 'SettingsController as vm'
                    }
                },
                resolve: {
                    ProfileData: function (apiResolver)
                    {
                        var member_id = {'member_id' : sessionStorage.getItem('member_id')};
                        return apiResolver.resolve('services.getprofileapi@post', member_id);
                    }
                }
            });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/settings');

        // Api
        //msApiProvider.register('sample', ['app/data/sample/sample.json']);

        // Navigation
        msNavigationServiceProvider.saveItem('fuse', {
            title : 'SETTINGS',
            group : true,
            weight: 1
        });

        msNavigationServiceProvider.saveItem('fuse.settings', {
            title    : 'Settings',
            icon     : 'icon-apps',
            state    : 'app.settings',
            /*stateParams: {
                'param1': 'page'
             },*/
            //translate: 'SAMPLE.SAMPLE_NAV',
            weight   : 1
        });
    }
})();
