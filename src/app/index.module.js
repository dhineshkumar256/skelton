(function ()
{
    'use strict';

    /**
     * Main module of the Fuse
     */
    angular
        .module('fuse', [

            // Core
            'app.core',

            // Navigation
            'app.navigation',

            // Toolbar
            'app.toolbar',

            // Quick Panel
            'app.quick-panel',

            // dashboard
            'app.dashboard',

            // notification
            'app.notification',
            
            //customers
            'app.customers',

            // pixels
            'app.pixels',
        
            // Profile
            'app.settings',

            //login 
            'app.login',
        
            //register
            'app.register',
            
            //payment
            'app.payment',
        
            //forgot password
            'app.forgot-password'
        
        ]);
})();