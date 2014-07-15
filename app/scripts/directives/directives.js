'use strict';

angular.module('App.Directives', [])

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

    });