'use strict';

/**
 * @ngdoc function
 * @name redditReaderApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the redditReaderApp
 */
angular.module('redditReaderApp')
    .controller('DetailsCtrl', function ($scope, $routeParams, $sce, $modal, redditFactory) {

        // default options for get comments for article name
        var options = {
            depth: 1,
            limit: 10,
            sort: 'top'
        };



        $scope.getArticle = function(){
            // return data of article
            redditFactory.getComments($routeParams.subreddit, $routeParams.id, options).then(function(result){
                $scope.data = result;

            });
        };

        $scope.$on('$viewContentLoaded', function(){
            $scope.subreddit = $routeParams.subreddit;
            $scope.id = $routeParams.id;
            $scope.getArticle();
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


