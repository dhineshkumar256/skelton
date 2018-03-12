(function ()
{
    'use strict';

    angular
        .module('app.payment', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider
            .state('app.payment', {
                url    : '/payment',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/payment/payment.html',
                        controller : 'PaymentController as vm'
                    }
                },
                resolve: {
                    SampleData: function (msApi)
                    {
                        return msApi.resolve('sample@get');
                    }
                }
            });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/payment');

        // Api
        msApiProvider.register('sample', ['app/data/sample/sample.json']);

        // Navigation
        msNavigationServiceProvider.saveItem('fuse', {
            title : 'Payment',
            group : true,
            weight: 1
        });

        /*msNavigationServiceProvider.saveItem('fuse.payment', {
            title    : 'Payment',
            icon     : 'icon-tile-four',
            state    : 'app.payment',
            weight   : 1
        });*/
    }
})();