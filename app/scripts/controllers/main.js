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

        var optionsListing = {
            'sort': 'new',
            'limit': 10,
            'before': null,
            'after': null
        }

        $scope.subreddit = redditFactory.subreddit;

        $scope.displayListing = function(){
            redditFactory.getListing($scope.subreddit, optionsListing).then(function(result){
                $scope.articles = result;

            });
        }

        // Initial config for pager
        $scope.totalItems = 1000;
        $scope.currentPage = 1;
        $scope.itemsPerPage = 10;


        $scope.$watch('currentPage', function(newPage, oldPage){

            if( newPage > oldPage){
                options.after = $scope.articles[9].name;
            } else if (newPage < oldPage){
                options.before = $scope.articles[0].name;
            }

            redditFactory.getListing($scope.subreddit, optionsListing).then(function(result){
                $scope.articles = result;
            });

        });

    })

    .directive('article', function() {

        return {
            restrict: 'E',
            templateUrl: 'views/include/article.html',
            scope: {
                a: '=articleData',
                shortDescription: '=shortDescription'
            }
        };

    })

