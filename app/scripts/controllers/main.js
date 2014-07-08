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
        $http({method: 'GET', url: 'http://www.reddit.com/r/jquery/new.json?sort=new'}).
            success(function(data, status, headers, config) {
                console.log(data);
                // this callback will be called asynchronously
                // when the response is available
            }).
            error(function(data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
    });
