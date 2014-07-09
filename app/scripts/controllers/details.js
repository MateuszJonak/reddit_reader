'use strict';

/**
 * @ngdoc function
 * @name redditReaderApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the redditReaderApp
 */
angular.module('redditReaderApp')
  .controller('DetailsCtrl', function ($scope, $routeParams, redditFactory) {
        redditFactory.getComment($routeParams.id).then(function(result){
            $scope.data = result;
//            console.log(result);

        });

  });
