'use strict';

/**
 * @ngdoc function
 * @name redditReaderApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the redditReaderApp
 */
angular.module('redditReaderApp')
  .controller('DetailsCtrl', function ($scope, $routeParams,$sce, redditFactory) {
        $scope.id = $routeParams.id;
        redditFactory.getComment($routeParams.subreddit, $routeParams.id, 1, 10, 'top').then(function(result){
            $scope.data = result;

        });

  })
