'use strict';

/**
 * @ngdoc overview
 * @name kdBingoApp
 * @description
 * # kdBingoApp
 *
 * Main module of the application.
 */
angular
  .module('kdBingoApp', [
    'ngAnimate',
    'ngStorage',
    'ngCookies',
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/proof', {
        templateUrl: 'views/proof.html',
        controller: 'ProofCtrl',
        controllerAs: 'proof'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
