/* global angular Plaid */
/* eslint no-param-reassign: ["error", { "props": false }] */

angular.module('store.service', ['app.store'])
  .factory('store', function ($location, $http, $rootScope, $ionicPopup, Pet) {
    const buyFood = function (context) {
      $http.get(`http://35.167.2.107:3000/v1/pet_stats/?id__is=${$rootScope.pet.id}`)
          .then(res => {
            const perc = res.data.data[0].goal_progress / res.data.data[0].goal_amt;
            const prog = res.data.data[0].goal_progress;
            const goal = res.data.data[0].goal_amt;
            if (perc < 0.5 && context.item.cost + prog >= goal / 2) {
              Pet.evolve = 1;
            } else if (perc < 1 && context.item.cost + prog >= goal) {
              Pet.evolve = 2;
            }
          }, err => {
            console.warn(err);
          });
      $http.get(`http://35.167.2.107:3000/v1/bank_tokens/?user_id__is=${$rootScope.user}`)
        .then((res) => {
          console.log(context, 'heres context');
          const transaction = {
            user_id: $rootScope.user,
            pet_id: $rootScope.pet.id,
            item_id: context.item.id,
            amount: context.item.cost,
            checking: res.data.data[0].token,
            savings: res.data.data[1].token,
            pending: true,
          };
          console.log('transaction: ', transaction);
          $http.post('http://35.167.2.107:3000/v1/transactions', transaction)
            .then((response) => {
              console.log('resfdsfsfs: ', response);
              const types = {
                1: 'pet',
                2: 'octopus',
                3: 'dragon',
              };
              const type = types[$rootScope.pet.pet_type_id];
              $location.path(`/market/${type}`);
            }, (error) => {
              console.warn(error);
            });
        });
    };
    return {
      buyFood,
    };
  });
