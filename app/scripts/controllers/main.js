'use strict';

/**
 * @ngdoc function
 * @name redditReaderApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the redditReaderApp
 */
angular.module('redditReaderApp')
    .controller('MainCtrl', function ($scope, $http) {
        $scope.awesomeThings = [
          'HTML5 Boilerplate',
          'AngularJS',
          'Karma'
        ];

        $scope.display = function(){
            $scope.articles = [];
            $http({method: 'GET', url: 'http://www.reddit.com/r/' + $scope.subreddit + '/new.json?sort=new'}).
                success(function(data, status, headers, config) {
                    var articles = data.data.children;
                    for (var i=0; i<articles.length; i++ ){
                        $scope.articles.push(articles[i].data);
                    }
                }).
                error(function(data, status, headers, config) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                });
        }

    });
