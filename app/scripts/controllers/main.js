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
            redditFactory.getListing($scope.subreddit, 'new', 10).then(function(result){
                $scope.articles = result;
//                console.log(result);

            });
        }

        // Display newest article on first enter,
        // And Display article by subreddit, after back from details
        $scope.displayListing();


    })
    .controller('PaginationCtrl', function ($scope, redditFactory) {
        $scope.totalItems = 100000;
        $scope.currentPage = 1;
        $scope.itemsPerPage = 10;

//        $scope.watch('articles', function(newValue){
//            $scope.articles = newValue;
//        })

        $scope.pageChanged = function () {
            redditFactory.getListing($scope.subreddit, 'new', 10, null, $scope.articles[9].name).then(function(result){
                $scope.articles = result;
            });
            console.log($scope.currentPage);
        };

    })
    
