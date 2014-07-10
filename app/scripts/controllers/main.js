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
        $scope.subreddit = redditFactory.subreddit;
        $scope.displayListing = function(){
            redditFactory.getListing($scope.subreddit, 'new').then(function(result){
                $scope.articles = result;

            });
        }

        // Display newest article on first enter,
        // And Display article by subreddit, after back from details
        $scope.displayListing($scope.subreddit);


    });
