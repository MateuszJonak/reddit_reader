'use strict';

/**
 * @ngdoc function
 * @name redditReaderApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the redditReaderApp
 */
angular.module('redditReaderApp')
    .controller('DetailsCtrl', function ($scope, $routeParams,$sce, redditFactory) {

        redditFactory.getComment($routeParams.subreddit, $routeParams.id, 1, 10, 'top').then(function(result){
            $scope.data = result;

        });


    })
    .directive('articleImg', function($http) {
        return {
            restrict: 'E',
            template: '<img class="img-responsive content-img" ng-src="{{ urlImg }}"/>',
            link: function (scope, element, attrs) {

                scope.$watch(attrs.urlImg, function(newValue){
                    if (newValue !== undefined){
                        var urlImg = '';
                        if(newValue.indexOf('imgur.com') > -1 || newValue.indexOf('jpg') > -1){
                            urlImg = newValue;
                            // trick for imgur without jpg at the end
                            if(newValue.indexOf('imgur.com') > -1 || newValue.indexOf('jpg') == -1){
                                urlImg += '.jpg';

                                // Preload image for check if he is
                                var loadElement = angular.element(document.createElement('img'));
                                loadElement.attr('src', urlImg);

                                loadElement.bind('load', function() {
                                    loadElement.addClass('img-responsive content-img');
                                    element.html(loadElement);
                                });
                            }

                        }

                    }

                });


            }
        };


    })
