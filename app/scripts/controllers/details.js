'use strict';

/**
 * @ngdoc function
 * @name redditReaderApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the redditReaderApp
 */
angular.module('redditReaderApp')
    .controller('DetailsCtrl', function ($scope, $routeParams, $sce, redditFactory) {

        // default options for get comments for article name
        var options = {
            depth: 1,
            limit: 10,
            sort: 'top'
        };

        // return data of article
        redditFactory.getComments($routeParams.subreddit, $routeParams.id, options).then(function(result){
            $scope.data = result;

        });

        // function for adding comment after submit text in comment-form
        $scope.addComment = function(){
            var dataComment = {
                text: $scope.comment,
                name: $scope.data.article.name
            };
            redditFactory.addComment(dataComment);
        };
    })

    // directive defining image from article url
    .directive('articleImg', function() {
        return {
            restrict: 'E',
            template: '<img class="img-responsive content-img" ng-src="{{ urlImg }}"/>',
            link: function (scope, element, attrs) {

                scope.$watch(attrs.urlImg, function(newValue){
                    if (newValue !== undefined){
                        var urlImg = '';
                        // if url contains 'imgur.com' or 'jpg' ten we can predict that there is a image
                        if(newValue.indexOf('imgur.com') > -1 || newValue.indexOf('jpg') > -1){
                            urlImg = newValue;
                            // trick for imgur without jpg at the end
                            if(newValue.indexOf('imgur.com') > -1 && newValue.indexOf('jpg') === -1) {
                                urlImg += '.jpg';
                            }

                            // Preload image for check if url is good
                            var loadElement = angular.element(document.createElement('img'));
                            loadElement.attr('src', urlImg);

                            loadElement.bind('load', function() {
                                loadElement.addClass('img-responsive content-img');
                                element.html(loadElement);
                            });
                        }


                    }

                });


            }
        };


    });

