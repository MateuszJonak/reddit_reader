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
        var options = {
            depth: 1,
            limit: 10,
            sort: 'top'
        }

        redditFactory.getComments($routeParams.subreddit, $routeParams.id, options).then(function(result){
            $scope.data = result;

        });



        $scope.addComment = function(){
            var dataComment = {
                text: $scope.comment,
                name: $scope.data.article.name
            }
            redditFactory.addComment(dataComment);
        }
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

angular.module("template/pagination/pager.html", []).run(["$templateCache", function($templateCache) {
    $templateCache.put("template/pagination/pager.html",
            "<ul class=\"pager\">\n" +
            "  <li ng-class=\"{disabled: noPrevious(), previous: align}\"><a href class='btn prev' ng-click=\"selectPage(page - 1)\">{{getText('previous')}}</a></li>\n" +
            "  <li ng-class=\"{disabled: noNext(), next: align}\"><a href class='btn next' ng-click=\"selectPage(page + 1)\">{{getText('next')}}</a></li>\n" +
            "</ul>");
}]);