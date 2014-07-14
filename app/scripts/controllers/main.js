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

        // default options for getting listing
        var optionsListing = {
            'sort': 'new',
            'limit': 10,
            'before': null,
            'after': null
        };

        // Initial config for pager
        $scope.totalItems = 1000;
        $scope.currentPage = 1;
        $scope.itemsPerPage = 10;

        // Initial subreddit from redditFactory
        $scope.subreddit = redditFactory.subreddit;

        // Function for show and hide listing or ajax spinner
        var showListing = function(listing, spinner){
            $scope.ifListing = listing;
            $scope.ifSpinner = spinner;
        };

        // that function return listing data for our options file
        // and show and hide div with listing
        var getListing = function(options){
            showListing(false, true);
            redditFactory.getListing($scope, $scope.subreddit, options).then(function(result){
                $scope.articles = result;
                $scope.disablePager = false;
                showListing(true, false);
            });
        };

        // function is starting when we submit subreddit forms
        $scope.submitSubreddit = function() {
            $scope.currentPage = 1;
            getListing(optionsListing);
        };

        // redditFactory emit information that pager must be disable,
        // because he start getting data from reddit
        $scope.$on('disablePager', function () {
            $scope.disablePager = true;
        });

        // Get next data from reddit when we change currentPage
        $scope.$watch('currentPage', function(newPage, oldPage){
            var options = angular.copy(optionsListing);

            if( newPage > oldPage){
                options.after = $scope.articles[9].name;
            } else if (newPage < oldPage){
                options.before = $scope.articles[0].name;
            }

            getListing(options);
        });

    });



