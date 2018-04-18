(function ()
{
    'use strict';

    angular
        .module('app.pixels', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider
            .state('app.pixels', {
                url    : '/pixels',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/pixels/pixels.html',
                        controller : 'PixelsController as vm'
                    }
                },
                resolve: {
                    PixelsData: function (msApi)
                    {
                        return msApi.resolve('sample@get');
                    }
                }
            });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/pixels');

        // Api
        msApiProvider.register('sample', ['app/data/sample/sample.json']);

        // Navigation
        msNavigationServiceProvider.saveItem('fuse', {
            title : 'PIXELS',
            group : true,
            weight: 1
        });

        msNavigationServiceProvider.saveItem('fuse.pixels', {
            title    : 'Pixels',
            icon     : 'icon-console',
            state    : 'app.pixels',
            /*stateParams: {
                'param1': 'page'
             },*/
            //translate: 'SAMPLE.SAMPLE_NAV',
            weight   : 1
        });
    }
})();
