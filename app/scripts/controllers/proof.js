'use strict';

/**
 * @ngdoc function
 * @name kdBingoApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the kdBingoApp
 */
angular.module('kdBingoApp')
  .controller('ProofCtrl', function ($localStorage) {
    this.result = undefined;
    this.storage = $localStorage;
    var self = this;

    this.proof = function() {
      var values = [self.a, self.b, self.c, self.d, self.e];

      if (_.filter(values, function(o) { return o === undefined || o.trim() === ''; }).length > 1) {

        self.result = false;
        return false;
      };

      var values = _.map(values, function(o) { return parseInt(o); });
      var values = _.filter(values, function(o) { return o !== undefined && !isNaN(o); });
      self.result = _.every(values, function(o) { return _.find(self.storage.calls, function(c) { return c.value === o; }) });

      return self.result;
    }

  });
