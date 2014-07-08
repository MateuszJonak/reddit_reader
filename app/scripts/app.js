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
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
