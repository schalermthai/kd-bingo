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

    function generateQuiz(item, level) {
      if (level < 10) {
        return item.value;
      } else if (level < 20) {
        var operator = random(10);
        return (item.value - operator) + " + " + operator + " = ?";
      } else if (level < 30) {
        var operator1 = random(5);
        var operator2 = random(5);
        return (item.value - operator1 + operator2) + " + " + operator1 + " - " + operator2 + " = ?";
      } else {
        var operator1 = random(5);
        var operator2 = random(5);
        var operator3 = random(5);
        return (item.value - operator1 + operator2 - operator3) +
        " + " + operator1 +
        " - " + operator2 +
        " + " + operator3 +
        " = ?";
      }
    }

    function random(limit) {
      return Math.floor(Math.random() * 100) % limit + 1;
    }

    function init() {

      self.storage.deck = self.storage.deck || [];
      self.storage.calls = self.storage.calls || [];

      if (self.storage.deck.length === 0) {

        for (var i = 1; i <= 75; i++) {
          self.storage.deck.push({ col: header(i), value: i });
        }

        self.storage.deck = _.shuffle(self.storage.deck);

        for (var i = 0; i < self.storage.deck.length; i++) {
          self.storage.deck[i].quiz = generateQuiz(self.storage.deck[i], i);
        }
      }
    }
  });
