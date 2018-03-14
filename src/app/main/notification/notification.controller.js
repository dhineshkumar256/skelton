(function () {
    'use strict';

    angular
      .module('app.notification')
      .controller('NotificationController', NotificationController);

      function NotificationController($scope, $filter, NotificationData, DTOptionsBuilder, DTColumnBuilder){

        $scope.dataTableshow = true;
        $scope.validCaptureURL = true;
        $scope.validDisplayURL = true;
        $scope.DisplayURL = [];
        $scope.CaptureURL = [];
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
        vm.dtInstance = {};

        $scope.createNotification = function() {
            vm.formWizard = {};
            $scope.dataTableshow = false;
        };
        $scope.cancelCreateNotification = function() {
            $scope.DisplayURL = [];
            $scope.CaptureURL = [];
            $scope.dataTableshow = true;
        };
        $scope.editNotification = function() {
            vm.formWizard = {capture:"http://www.google.com",
                                PostURL:"http://www.google.com"
                            };
            $scope.dataTableshow = false;
        };
        $scope.validateURL = function(url, type){
          var expression = /https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,}/;
          var regex = new RegExp(expression);
          if (url.match(regex)) {
              $scope.validCaptureURL = true;
              $scope.validDisplayURL = true;
          } else {
              if(type == 'Capture'){
                  $scope.CaptureURL.pop();
                  $scope.validCaptureURL = false;
              }else{
                  $scope.DisplayURL.pop();
                  $scope.validDisplayURL = false;
              }
          }
        };
        $scope.fnTablefilter = function() {
            var fromdate = $scope.normalizeDate($scope.data.FromDate),
                todate = $scope.normalizeDate($scope.data.ToDate);
            vm.notification = $filter('filter')(NotificationData.data ,function(val, idx, data){
              var Sdate = $scope.normalizeDate(val.createDate);
                if(fromdate <= Sdate && Sdate <= todate){
                    return true
                } else if (Sdate >= fromdate && todate === '' && fromdate !== ''){
                    return true;
                } else if (Sdate <= todate && fromdate === '' && todate !== ''){
                    return true;
                } else {
                    return false;
                }
            });
            vm.dtInstance.rerender();
        };
        $scope.normalizeDate = function(dateString) {
            var date = new Date(dateString);
            var normalized = date.getFullYear() + '' + (("0" + (date.getMonth() + 1)).slice(-2)) + '' + ("0" + date.getDate()).slice(-2);
            return normalized;
        };
      }
})();
