'use strict';

/**
 * @ngdoc function
 * @name redditReaderApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the redditReaderApp
 */
angular.module('redditReaderApp')

    .controller('MainCtrl', function ($scope, $location, redditFactory) {

        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];

        $scope.displayListing = function(){
            redditFactory.getListing($scope.subreddit).then(function(result){
                $scope.articles = result;

            });
        }

        $scope.goToArticle = function(permalink){
            redditFactory.permalink = permalink;
            $location.path('/details');
        }

    });
