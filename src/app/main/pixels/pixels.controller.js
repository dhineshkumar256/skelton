(function ()
{
    'use strict';

    angular
        .module('app.pixels')
        .controller('PixelsController', PixelsController);

    /** @ngInject */
    function PixelsController(PixelsData)
    {
        var vm = this;

        // Data
        vm.helloText = PixelsData.data.helloText;

        // Methods

        //////////
    }
})();
