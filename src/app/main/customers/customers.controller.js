(function ()
{
    'use strict';

    angular
        .module('app.customers')
        .controller('CustomersController', CustomersController);

    /** @ngInject */
    function CustomersController($mdSidenav, CustomerData)
    {

        var vm = this;

        vm.toggleSidenav = toggleSidenav;

        function toggleSidenav(sidenavId)
        {
            $mdSidenav(sidenavId).toggle();
        }

        vm.employees = CustomerData.data;

        vm.dtOptions = {
            dom       : '<"top"f>rt<"bottom"<"left"<"length"l>><"right"<"info"i><"pagination"p>>>',
            pagingType: 'simple',
            autoWidth : false,
            responsive: true
        };


    }
})();
