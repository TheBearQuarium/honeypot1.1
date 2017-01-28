/* global angular TweenMax */
/* eslint no-param-reassign: ["error", { "props": false }] */

angular.module('app.pet', [])
  .controller('PetCtrl', function ($scope, $rootScope, $http, Pet) {
    $scope.bearTouch = Pet.bearTouch;
    Pet.bearGrow();
    Pet.setBackground();
    Pet.getStats()
      .then(res => {
        $scope.stats = res;
      });
  });
