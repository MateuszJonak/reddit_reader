'use strict';

/**
 * @ngdoc overview
 * @name redditReaderApp
 * @description
 * # redditReaderApp
 *
 * Main module of the application.
 */
angular
    .module('redditReaderApp', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngRoute'
    ])

    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
            .when('/details', {
                templateUrl: 'views/details.html',
                controller: 'AboutCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    })

    .factory('redditFactory', function($http, $q){
        return{
            getListing: function(subreddit){
                var articlesArray = [];
                var result = $q.defer();
                var url = (subreddit) ? 'http://www.reddit.com/r/' + subreddit + '/new.json?sort=new' : 'http://www.reddit.com/new.json?sort=new';
                $http({method: 'GET', url: url}).
                    success(function(data, status, headers, config) {
                        data = data.data.children;
                        _(data).each(function(item){
                            articlesArray.push(item.data);
                        });
                        result.resolve(articlesArray);
                    }).
                    error(function(data, status, headers, config) {
                        // called asynchronously if an error occurs
                        // or server returns response with an error status.
                    });
                return result.promise;

            },

            getComment: function(){

            }
        }
    })
