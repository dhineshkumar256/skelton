(function ()
{
    'use strict';

    angular
        .module('app.notification', ['datatables', 'datatables.light-columnfilter'])
        .run(initDT)
        .config(config);

    /** @ngInject */
    function initDT(DTDefaultOptions) {
      DTDefaultOptions.setLoadingTemplate(
        '<div layout="row" layout-sm="column" layout-align="space-around"> <md-progress-circular md-mode="indeterminate"></md-progress-circular></div>'
      );
    };
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {

        var member_id = {'member_id' : sessionStorage.getItem('member_id')};
        console.log(member_id);
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
                    NotificationData: function (apiResolver)
                    {
                        return apiResolver.resolve('services.getNotificationapi@post', member_id);
                    }
                }
            });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/notification');

        // Api
        //msApiProvider.register('tables.notificationTable', ['https://justngage.azurewebsites.net/allnotification']);

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
