'use strict';

/**
 * @ngdoc function
 * @name kdBingoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the kdBingoApp
 */
angular.module('kdBingoApp')
  .controller('MainCtrl', function ($localStorage) {
    this.storage = $localStorage;
    var self = this;

    init();

    this.index = function(i) {
      if (i < 5) {
        return "h" + (i + 1);
      }

      return "h6";
    }

    this.generate = function() {
      if (self.storage.deck.length > 0) {
        var val = self.storage.deck.shift();
        self.storage.calls.unshift(val);
      }
    }

    this.reset = function() {
      $localStorage.$reset();
      init();
    }

    function header(value) {
      if (value > 0 && value <= 15) {
        return "B";
      } else if (value > 15 && value <= 30) {
        return "I";
      } else if (value > 30 && value <= 45) {
        return "N";
      } else if (value > 45 && value <= 60) {
        return "G";
      } else if (value > 60) {
        return "O";
      }
    }

    function init() {

      self.storage.deck = self.storage.deck || [];
      self.storage.calls = self.storage.calls || [];

      if (self.storage.deck.length === 0) {

        for (var i = 1; i <= 75; i++) {
          self.storage.deck.push({ col: header(i), value: i });
        }

        self.storage.deck = _.shuffle(self.storage.deck);
      }
    }
  });
