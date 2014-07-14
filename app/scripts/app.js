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
        'ngSanitize',
        'ui.bootstrap'
    ])

    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
            .when('/details/:subreddit/:id', {
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

            getListing: function(scope, subreddit, options){

                var listing = [];           // Help array with articles listing
                var result = $q.defer();    // Add result in to the queue
                this.subreddit = subreddit; // save subreddit when we want back to main view

                // create url - when we have subreddit we can show article only for this name
                var url = (subreddit) ? 'http://www.reddit.com/r/' + subreddit + '/new.json' : 'http://www.reddit.com/new.json';
                // emit that we will get data from reddit and controller must disable pager
                scope.$emit('disablePager');
                $http({method: 'GET', url: url, params: {sort : options.sort, limit: options.limit, before: options.before, after: options.after}}).
                    success(function(data, status, headers, config) {
                        // Get articles listing from JSON
                        var data = data.data.children;
                        _(data).each(function(item){
                            listing.push(item.data);
                        });
                        result.resolve(listing);

                    }).
                    error(function(data, status, headers, config) {

                    });

                return result.promise;

            },

            getComments: function(subreddit, id, options){

                var comments = [];          // Help array with articles listing
                var result = $q.defer();    // Add result in to the queue
                var url = 'http://www.reddit.com/r/'+ subreddit +'/comments/'+ id + '.json';

                $http({method: 'GET', url: url, params: {depth: options.depth, limit: options.limit, sort: options.sort}}).
                    success(function(data, status, headers, config) {

                        // Get article data from JSON
                        var article = data[0].data.children[0].data;

                        // Get comments listing from JSON
                        var dataComments = data[1].data.children;
                        _(dataComments).each(function(item){
                            comments.push(item.data);
                        });

                        // Last element was undefined
                        comments.splice(options.limit);

                        result.resolve({'article': article, 'comments': comments});

                    }).
                    error(function(data, status, headers, config) {
                        // called asynchronously if an error occurs
                        // or server returns response with an error status.
                    });
                return result.promise;

            },

            login: function(){
                // User test, created on reddit.com
                var options ={
                    user: 'test_cc',
                    pass: 'zaqwsx'
                }
                var url = 'http://www.reddit.com/api/login?api_type=json&user=' + options.user + '&passwd=' + options.pass + '&rem=True'
                var headers = {
                    'User-Agent' : 'fooBot/1.0 by test_cc',
                    'Content-Type': 'application/x-www-form-urlencoded'
                }

                var login = $q.defer();
                $http({method: 'POST', url: url, header:headers, withCredentials: true}).
                    success(function(data, status, headers, config) {
//                        console.log('fdfdf');
                        login.resolve(data.json.data);
                    }).
                    error(function(data, status, headers, config) {

                    });
                return login.promise;
            },

            addComment: function(dataComment){

                this.login().then(function(result){
                    var loginData = result;
                    var url = 'https://ssl.reddit.com/api/comment?api_type=json&text=' + encodeURIComponent(dataComment.text) + '&thing_id=' + dataComment.name;
                    var headers  = {
                        'User-Agent' : 'fooBot/0.1 by test_cc',
                        'X-Modhash'  : loginData.modhash,
                        'Cookie'     : 'reddit_session=' + loginData.cookie,
                        'Content-Type': 'application/x-www-form-urlencoded'
                    };
                    $http({method: 'POST', url: url, header:headers, data:{message: "message"}}).
                        success(function(data, status, headers, config) {
                            console.log(data.errors);
                        }).
                        error(function(data, status, headers, config) {

                        });
                });



            }

        }
    })

    // directive for article box
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

    // directive for ajax spinner
    .directive('spinner', function() {

        return {
            restrict: 'E',
            template: '<span class="ajax-spinner" ng-if="ifSpinner" class="animate-if" ng-style="{\'background-image\': \'url(../images/gif-load.gif)\'} "></span>',
            scope: {
                url: '=urlSpinner',
                ifSpinner: '=ifSpinner'
            }
        };

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

    // Convert time from articles
    .filter('timesince', function() {
        return function(val) {
            var seconds = Math.floor(((new Date().getTime()/1000) - val))

            var interval = Math.floor(seconds / 31536000);

            if (interval >= 1) {
                if(interval == 1) return interval + " year ago";
                else
                    return interval + " years ago";
            }
            interval = Math.floor(seconds / 2592000);
            if (interval >= 1) {
                if(interval == 1) return interval + " month ago";
                else
                    return interval + " months ago";
            }
            interval = Math.floor(seconds / 86400);
            if (interval >= 1) {
                if(interval == 1) return interval + " day ago";
                else
                    return interval + " days ago";
            }
            interval = Math.floor(seconds / 3600);
            if (interval >= 1) {
                if(interval == 1) return interval + " hour ago";
                else
                    return interval + " hours ago";
            }
            interval = Math.floor(seconds / 60);
            if (interval >= 1) {
                if(interval == 1) return interval + " minute ago";
                else
                    return interval + " minutes ago";
            }
            return Math.floor(seconds) + " seconds ago";
        };
    })

    // Convert time from articles
    .filter('urltophoto', function() {
        return function(val) {
            if(url.indexOf('imgur.com') > -1 || url.indexOf('jpg') == -1){
                console.log(val);
                return val + '.jpg';
            }
            return val;
        };
    })

    // change default pager directive from ui.bootstrap
    .config(function($provide) {
        $provide.decorator('pagerDirective', function($delegate) {
            var directive = $delegate[0];
            directive.scope.disablePager = '=disablePager';
            directive.scope.mySelectPage = '@mySelectPage';
            return $delegate;
        });
    });

// change template for pagination pager
angular.module("template/pagination/pager.html", []).run(["$templateCache", function($templateCache) {
    $templateCache.put("template/pagination/pager.html",
            "<ul class=\"pager\">\n" +
            "  {{pagerDisable}}<li ng-class=\"{disabled: noPrevious() || disablePager }\"><a href class='btn prev' ng-click=\"disablePager || selectPage(page - 1)\">{{getText('previous')}}</a></li>\n" +
            "  <li ng-class=\"{disabled: noNext() || disablePager }\"><a href class='btn next' ng-click=\"disablePager || selectPage(page + 1)\">{{getText('next')}}</a></li>\n" +
            "</ul>");
}]);

