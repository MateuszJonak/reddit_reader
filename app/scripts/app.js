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
        'ngRoute',
        'ngSanitize'
    ])

    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
            .when('/details/:id', {
                templateUrl: 'views/details.html',
                controller: 'DetailsCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    })

    .factory('redditFactory', function($http, $q){

        return{
            // Subreddit field for display listing
            subreddit : this.subreddit,

            getListing: function(subreddit){
                // Array with articles listing
                var listing = [];
                var result = $q.defer();
                this.subreddit = subreddit;
                var url = (subreddit) ? 'http://www.reddit.com/r/' + subreddit + '/new.json?sort=new' : 'http://www.reddit.com/new.json?sort=new';

                $http({method: 'GET', url: url}).
                    success(function(data, status, headers, config) {
                        // Get articles listing from JSON
                        var data = data.data.children;
                        _(data).each(function(item){
                            listing.push(item.data);
                        });
                        result.resolve(listing);

                    }).
                    error(function(data, status, headers, config) {
                        // called asynchronously if an error occurs
                        // or server returns response with an error status.
                    });
                return result.promise;

            },

            getComment: function(id){
                // Array with comments listing
                var comments = [];
                var result = $q.defer();
                var url = 'http://www.reddit.com/'+ id + '.json';

                $http({method: 'GET', url: url}).
                    success(function(data, status, headers, config) {
                        // Get article data from JSON
                        var article = data[0].data.children[0].data;
                        // Get comments listing from JSON
                        var dataComments = data[1].data.children;
                        _(dataComments).each(function(item){
                            comments.push(item.data);
                        });
                        result.resolve({'article': article, 'comments': comments});

                    }).
                    error(function(data, status, headers, config) {
                        // called asynchronously if an error occurs
                        // or server returns response with an error status.
                    });
                return result.promise;

            }
        }
    })

    // Change String for HTML code
    .filter('unsafe', function($sce) {
        return function(val) {
            return $sce.trustAsHtml(val);
        };
    })

    // Decode signs like &lt;/p&gt;
    .filter('htmldecode', function() {
        return function(val) {
            var e = document.createElement('div');
            e.innerHTML = val;
            return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
        };
    })
