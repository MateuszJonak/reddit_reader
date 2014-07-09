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
        redditFactory.getComment($scope.id).then(function(result){
            $scope.data = result;

        });

  })
