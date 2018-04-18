(function ()
{
    'use strict';

    angular
        .module('app.payment')
        .controller('PaymentController', PaymentController)
        .directive('cardNumber', function($browser){
            return{
              require : 'ngModel',
              link : function($scope, $element, $attrs, ngModelCtrl) {
                  var formatter = function() {
                    var chunks = $element.val().replace(/[^\d]+/g,'').match(/\d{1,4}/g);
                      if(chunks){
                        $element.val(chunks.join(' ').slice(0,19));
                      }else{
                        $element.val('');
                      }
                  };

                  ngModelCtrl.$parsers.push(function(viewValue) {
                    viewValue = viewValue.replace(/[^\d]+/g,'').slice(0,16);
                    if(viewValue.charAt(0) != 4 && viewValue.charAt(0) != 5 && viewValue){
                      ngModelCtrl.$setValidity('first_char', false);
                    }else{
                      ngModelCtrl.$setValidity('first_char', true);
                    }

                    if(viewValue.length < 16){
                      ngModelCtrl.$setValidity('card_length', false);
                    }else{
                      ngModelCtrl.$setValidity('card_length', true);
                    }

                    return viewValue;
                  });
                  ngModelCtrl.$render = function() {
                    formatter();
                  };
                  $element.bind('change', formatter);
                  $element.bind('keydown', function(event) {
                    var key = event.keyCode;
                    if (key == 91 || (15 < key && key < 19) || (37 <= key && key <= 40)){
                      return;
                    }
                    $browser.defer(formatter);
                  });
                  $element.bind('paste cut', function() {
                    $browser.defer(formatter);
                  });
              }
            };
        })
        .directive('cardDate', function($browser){
            return {
              require: 'ngModel',
              link: function($scope, $element, $attrs, ngModelCtrl) {
                var formatter = function() {
                  var chunks = $element.val().replace(/[^\d]+/g,'').match(/\d{1,2}/g);
                  if(chunks){
                    $element.val(chunks.join(' / ').slice(0,7));
                  }else{
                    $element.val('');
                  }
                };
                ngModelCtrl.$parsers.push(function(viewValue) {
                  viewValue = viewValue.replace(/[^\d]+/g,'');
                  var chunks = viewValue.match(/\d{1,2}/g);
                  if(chunks[0] > 12 || chunks[0] == '00'){
                    ngModelCtrl.$setValidity('date', false);
                  }else{
                    ngModelCtrl.$setValidity('date', true);
                  }
                  if(viewValue.length < 4){
                    ngModelCtrl.$setValidity('date_length', false);
                  }else{
                    ngModelCtrl.$setValidity('date_length', true);
                  }
                  return chunks.join(' / ').slice(0,7);
                });
                ngModelCtrl.$render = function() {
                  formatter();
                };
                $element.bind('change', formatter);
                $element.bind('keydown', function(event) {
                  var key = event.keyCode;
                  if (key == 91 || (15 < key && key < 19) || (37 <= key && key <= 40)){ return; }
                  $browser.defer(formatter);
                });
                $element.bind('paste cut', function() {
                  $browser.defer(formatter);
                });
              }
            };
        })
        .directive('cardCvv', function($browser){
            return {
              require: 'ngModel',
              link: function($scope, $element, $attrs, ngModelCtrl) {
                var formatter = function() {
                    $element.val($element.val().replace(/[^\d]+/g,'').slice(0,3));
                };
                ngModelCtrl.$parsers.push(function(viewValue) {
                  viewValue = viewValue.replace(/[^\d]+/g,'');
                  if(viewValue.length < 3){
                    ngModelCtrl.$setValidity('cvv_length', false);
                  }else{
                    ngModelCtrl.$setValidity('cvv_length', true);
                  }
                  return viewValue.slice(0,3);
                });
                ngModelCtrl.$render = function() {
                  formatter();
                };
                $element.bind('change', formatter);
                $element.bind('keydown', function(event) {
                  var key = event.keyCode;
                  if (key == 91 || (15 < key && key < 19) || (37 <= key && key <= 40)){
                    return;
                  }
                  $browser.defer(formatter);
                });
                $element.bind('paste cut', function() {
                  $browser.defer(formatter);
                });
              }
            };
        });

    /** @ngInject */
    function PaymentController(AllPlansData, $scope, api)
    {
        var vm = this;
        $scope.cardData = {};
        TCO.loadPubKey('sandbox');
        vm.AllPlansData = AllPlansData;
        $scope.paymentMode = false;
        $scope.planId = "";

        $scope.startPlan = function(planId) {
            $scope.planId = planId;
            $scope.paymentMode = true;
        };
        $scope.madePayment = function() {
            $scope.cardData['sellerId'] = '901366713';
            $scope.cardData['publishableKey'] = '15EB93A2-A80C-41D6-B530-3A39F6A8990D';
            var temp = $scope.cardData['expMonth'].split('/');
            $scope.cardData['expMonth'] = temp[0].replace(/\s+/g, '');
            $scope.cardData['expYear'] = temp[1].replace(/\s+/g, '');
            TCO.requestToken($scope.successCallback, $scope.errorCallback, $scope.cardData);
        };
        $scope.successCallback = function(data) {
            var checkoutData = {
                "member_id" : sessionStorage.getItem('member_id'),
                "productid" : $scope.planId,
                "token"     : data.response.token.token
            };
            api.services.checkoutapi.post(checkoutData,
              function(response) {
                console.log(response);
              },
              function(error) {
                console.log(error);
              }
            )
        };
        $scope.errorCallback = function(data) {
            console.log(data);
        }
    }
})();
