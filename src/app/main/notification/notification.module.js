(function ()
{
    'use strict';

    angular
        .module('app.notification', ['datatables', 'datatables.light-columnfilter'])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider
            .state('app.notification', {
                url    : '/notification',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/notification/notification.html',
                        controller : 'NotificationController as vm'
                    }
                },
                resolve: {
                    NotificationData: function (msApi)
                    {
                        return msApi.resolve('tables.notificationTable@get');
                    }
                }
            });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/notification');

        // Api
        msApiProvider.register('tables.notificationTable', ['app/data/tables/notificationTable.json']);

        // Navigation
        msNavigationServiceProvider.saveItem('fuse', {
            title : 'NOTIFICATION',
            group : true,
            weight: 1
        });

        msNavigationServiceProvider.saveItem('fuse.notification', {
            title    : 'Notifications',
            icon     : 'icon-tile-four',
            state    : 'app.notification',
            /*stateParams: {
                'param1': 'page'
             },*/
            //translate: 'SAMPLE.SAMPLE_NAV',
            weight   : 1
        });
    }
})();
