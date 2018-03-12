(function () {
    'use strict';

    angular
      .module('app.notification')
      .controller('NotificationController', NotificationController);

      function NotificationController($scope, NotificationData, DTOptionsBuilder, DTColumnBuilder){

        $scope.dataTableshow = true;
        $scope.URL1 = [];
        $scope.data = {
            mobile: false,
            count: false,
            mobileDevice: false,
            recent: false,
            unknownuser: false,
            own: false,
            FromDate: '',
            ToDate: ''
        };

        var vm = this;
        vm.notification = NotificationData.data;
        vm.dtOptions = {
            dom       : '<"top"f>rt<"bottom"<"left"<"length"l>><"right"<"info"i><"pagination"p>>>',
            pagingType: 'simple',
            autoWidth : false,
            responsive: true
        };


        // vm.dtColumns = [
        //   DTColumnBuilder.newColumn('Name').withTitle('Customer Name'),
        //   DTColumnBuilder.newColumn('createDate').withTitle('Created Date'),
        //   DTColumnBuilder.newColumn('status').withTitle('Status'),
        //   DTColumnBuilder.newColumn('view').withTitle('View/Edit'),
        // ];

        // vm.dtOptions = DTOptionsBuilder.newOptions().withPaginationType('full_numbers').withDisplayLength(2);

        $scope.createNotification = function() {
            vm.formWizard = {};
            $scope.dataTableshow = false;
        };
        $scope.cancelCreateNotification = function() {
            $scope.dataTableshow = true;
        };
        $scope.editNotification = function() {
          console.log('hi')
            vm.formWizard = {capture:"http://www.google.com",
                                PostURL:"http://www.google.com"
                            };
            console.log(vm);
            $scope.dataTableshow = false;
        };
        $scope.validateURL = function(url){
            var reg = url.match("(https*:\/\/)*[-a-zA-Z0-9/.?=+%&_]+\.(com|net|edu|gov|co|org)[.in]*[-a-zA-Z0-9/.?=+%&_]*");
            if (reg) {
              $scope.isURLValid = true;
            } else {
              $scope.isURLValid = false;
              $scope.URL1 = [];
            }
            console.log($scope.isURLValid);
        };
      }
})();
