'use strict';

angular.module('App.Services', [])

    .factory('redditFactory', function($http, $q, $modal){

        var subreddit;
        return{

            // Subreddit field for display listing
            subreddit : '',

            getListing: function(scope, options){

                var listing = [];           // Help array with articles listing
                var result = $q.defer();    // Add result in to the queue
                var subForm = scope.subreddit;


                // create url - when we have subreddit we can show article only for this name
                var url = (subForm) ? 'http://www.reddit.com/r/' + subForm + '/new.json' : 'http://www.reddit.com/new.json';
                // emit that we will get data from reddit and controller must disable pager
                scope.$emit('disablePager');
                $http({method: 'GET', url: url, params: {sort : options.sort, limit: options.limit, before: options.before, after: options.after}}).
                    success(function(data) {
                        // Get articles listing from JSON
                        data = data.data.children;
                        _(data).each(function(item){
                            listing.push(item.data);
                        });
                        subreddit = subForm;
                        result.resolve(listing);

                    }).
                    error(function() {
                        var dataResult = {
                            status: 'error',
                            oldSubreddit: subreddit
                        };
                        $modal.open({
                            templateUrl: 'modalErrorListing.html',
                            controller: 'ErrorInstanceCtrl',
                            resolve: {
                                items: function () {
                                    return dataResult;
                                }
                            }
                        });
                        result.reject(dataResult);
                    });

                return result.promise;
            },

            getComments: function(subreddit, id, options){

                var comments = [];          // Help array with articles listing
                var result = $q.defer();    // Add result in to the queue
                var url = 'http://www.reddit.com/r/'+ subreddit +'/comments/'+ id + '.json';

                $http({method: 'GET', url: url, params: {depth: options.depth, limit: options.limit, sort: options.sort}}).
                    success(function(data) {

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
                    error(function() {
                        result.reject();
                    });
                return result.promise;

            },

            login: function(){
                // User test, created on reddit.com
                var options ={
                    user: 'test_cc',
                    pass: 'zaqwsx'
                };
                var url = 'http://www.reddit.com/api/login?api_type=json&user=' + options.user + '&passwd=' + options.pass + '&rem=True';
                var headers = {
                    'User-Agent' : 'fooBot/1.0 by test_cc',
                    'Content-Type': 'application/x-www-form-urlencoded'
                };

                var login = $q.defer();
                $http({method: 'POST', url: url, header:headers, withCredentials: true}).
                    success(function(data) {
                        login.resolve(data.json.data);
                    });
                return login.promise;
            },

            addComment: function(dataComment){
                var comment = $q.defer();
                this.login().then(function(result){
                    var loginData = result;
                    var url = 'https://ssl.reddit.com/api/comment?api_type=json&text=' + encodeURIComponent(dataComment.text) + '&thing_id=' + dataComment.name;
                    var headers  = {
                        'User-Agent' : 'fooBot/0.1 by test_cc',
                        'X-Modhash'  : loginData.modhash,
                        'Cookie'     : 'reddit_session=' + loginData.cookie,
                        'Content-Type': 'application/x-www-form-urlencoded'
                    };

                    $http({method: 'POST', url: url, header:headers}).
                        success(function(data) {
                            // because always will be errors, my login is without oauth2
                            comment.resolve(data.json);
                        });

                });
                return comment.promise;
            }

        };
    });
