'use strict';

/**
 * @ngdoc function
 * @name redditReaderApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the redditReaderApp
 */
angular.module('redditReaderApp')
  .controller('AboutCtrl', function ($scope, redditFactory) {
        $scope.permalink = redditFactory.permalink;

  });
