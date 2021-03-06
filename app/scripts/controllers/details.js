'use strict';

/**
 * @ngdoc function
 * @name redditReaderApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the redditReaderApp
 */
angular.module('redditReaderApp')
    .controller('DetailsCtrl', function ($scope, $routeParams, $sce, $modal, $location, redditFactory) {

        // default options for get comments for article name
        var options = {
            depth: 1,
            limit: 10,
            sort: 'top'
        };



        $scope.getArticle = function(subreddit, id){
            // return data of article
            redditFactory.getComments(subreddit, id, options)
                .then(function success(result) {
                    $scope.data = result;
                }, function error() {
                    $location.path('/');
                });
        };

        $scope.$on('$viewContentLoaded', function(){
            $scope.subreddit = $routeParams.subreddit;
            $scope.id = $routeParams.id;
            $scope.getArticle($scope.subreddit, $scope.id);
        });

        // function for adding comment after submit text in comment-form
        $scope.addComment = function(){
            var dataComment = {
                text: $scope.comment,
                name: $scope.data.article.name
            };
            redditFactory.addComment(dataComment).then(function(result){
                if (result.errors.length > 0){
                    $modal.open({
                        templateUrl: 'modalErrorComment.html',
                        controller: 'ErrorInstanceCtrl',
                        resolve: {
                            items: function () {
                                return result;
                            }
                        }
                    });
                }
            });
        };
    });


