(function () {
    'use strict';

    angular
      .module('app.notification')
      .controller('NotificationController', NotificationController);

      function NotificationController($scope, $filter, NotificationData, DTOptionsBuilder, DTColumnBuilder, api){

        $scope.dataTableshow = true;
        $scope.validCaptureURL = true;
        $scope.validDisplayURL = true;
        $scope.DisplayURL = [];
        $scope.CaptureURL = [];
        $scope.test = 'hi';
        $scope.data = {
            FromDate: '',
            ToDate: ''
        };

        var vm = this;
        vm.formWizard = {};
        vm.formWizard = {
          noti_message : "",
          mobile_hide_1: true,
          top_on_mobile_2: true,
          live_user_count_3: true,
          set_max_live_count_4 : "",
          refer_user_as_5 : "",
          display_last_6 : "",
          display_last_days_7 : "",
          display_most_recent_8: true,
          own_noti_seen_9: true,
          hide_unknown_10: true,
          display_internal_11 : "",
        };
        vm.notification = [];
        angular.forEach(NotificationData, function(obj,idx){
            vm.notification.push(obj);
        });

        vm.dtOptions = {
            dom       : '<"top"f>rt<"bottom"<"left"<"length"l>><"right"<"info"i><"pagination"p>>>',
            pagingType: 'simple',
            autoWidth : false,
            responsive: true
        };
        vm.dtInstance = {};

        $scope.openNotificationPanel = function() {
            vm.formWizard = {};
            $scope.dataTableshow = false;
        };
        $scope.createNotification = function(e){
          e.preventDefault();
          var get_data_url = $scope.CaptureURL.toString();
          var show_data_url = $scope.DisplayURL.toString();
          vm.formWizard['member_id'] = sessionStorage.getItem('member_id');
          vm.formWizard['get_data_url'] = get_data_url;
          vm.formWizard['show_data_url'] = show_data_url;
          var CreateNotificationData = vm.formWizard;

          api.services.createNotification.post(CreateNotificationData,
              function(response){
                  console.log(response);
                  $scope.cancelCreateNotification();
              },
              function(error){
                  console.log(error);
              }
          );
        }
        $scope.cancelCreateNotification = function() {
            $scope.DisplayURL = [];
            $scope.CaptureURL = [];
            $scope.dataTableshow = true;
        };
        $scope.editNotification = function(id) {
            $scope.dataTableshow = false;
            angular.forEach(vm.notification, function(obj, idx){
                if(obj.id == id){
                    $scope.DisplayURL.push(obj.get_data_url);
                    $scope.CaptureURL.push(obj.show_data_url);
                    vm.formWizard.Message = obj.noti_message;
                }
            });
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
        $scope.normalizeDate = function(dateString, format) {
            var date = new Date(dateString);
            var formatDate = date.getFullYear()+"/"+date.getMonth()+"/"+date.getDate();
            var normalized = date.getFullYear() + '' + (("0" + (date.getMonth() + 1)).slice(-2)) + '' + ("0" + date.getDate()).slice(-2);
            if(format){
              return formatDate;
            }else{
              return normalized;
            }
        };
      }
})();
