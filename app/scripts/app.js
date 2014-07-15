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
        'ngRoute',
        'ngSanitize',
        'ui.bootstrap',
        'App.Routes',
        'App.Services',
        'App.Directives',
        'App.Filters'
    ])


    .controller('ErrorInstanceCtrl', function ($scope, $modalInstance, items) {
        $scope.items = items;
        $scope.ok = function () {
            $modalInstance.close();

        };
    })

    // change default pager directive from ui.bootstrap
    .config(function($provide) {
        $provide.decorator('pagerDirective', function($delegate) {
            var directive = $delegate[0];
            directive.scope.disablePager = '=disablePager';
            return $delegate;
        });
    });

// change template for pagination pager
angular.module('template/pagination/pager.html', []).run(['$templateCache', function($templateCache) {
    $templateCache.put('template/pagination/pager.html',
            '<ul class="pager">\n' +
            '  <li ng-class="{disabled: noPrevious() || disablePager }"><a href class="btn prev" ng-click="disablePager || selectPage(page - 1)">{{getText("previous")}}</a></li>\n' +
            '  <li ng-class="{disabled: noNext() || disablePager }"><a href class="btn next" ng-click="disablePager || selectPage(page + 1)">{{getText("next")}}</a></li>\n' +
            '</ul>');
}]);

