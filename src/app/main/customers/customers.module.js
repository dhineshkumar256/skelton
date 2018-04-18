(function ()
{
    'use strict';

    angular
        .module('app.customers', ['datatables', 'datatables.columnfilter'])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider
            .state('app.customers', {
                url    : '/customers',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/customers/customers.html',
                        controller : 'CustomersController as vm'
                    }
                },
                resolve: {
                    CustomerData: function (msApi)
                    {
                        return msApi.resolve('tables.employees100@get');
                    }
                }
            });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/customers');

        // Api
        msApiProvider.register('tables.employees100', ['app/data/tables/employees100.json']);

        // Navigation
        msNavigationServiceProvider.saveItem('fuse', {
            title : 'CUSTOMERS',
            group : true,
            weight: 1
        });

        msNavigationServiceProvider.saveItem('fuse.customers', {
            title    : 'Customers',
            icon     : 'icon-account',
            state    : 'app.customers',
            /*stateParams: {
                'param1': 'page'
             },*/
            //translate: 'SAMPLE.SAMPLE_NAV',
            weight   : 1
        });
    }
})();
