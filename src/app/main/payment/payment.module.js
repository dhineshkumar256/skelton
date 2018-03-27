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
                    AllPlansData: function (apiResolver)
                    {
                        return apiResolver.resolve('services.allplansapi@get', {});
                    }
                }
            });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/payment');

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
