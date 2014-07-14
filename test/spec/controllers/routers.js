'use strict';

describe('Config RouteProvider', function () {

    // load the controller's module
    beforeEach(module('redditReaderApp'));

    var route,
        location,
        rootScope,
        scope,
        DetailsCtrl,
        routeParams;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($route, $location, $rootScope) {
        route = $route;
        location = $location;
        rootScope = $rootScope;
        scope = $rootScope.$new();
        routeParams = {'id': '123456', 'subreddit': 'xyz'};
        DetailsCtrl = $controller('DetailsCtrl', {
            $scope: scope
        });
    }));

    if('should map routes to controllers', function(){
        expect(route.current).toBeUndefined();
        location.path('/');
        rootScope.$digest();

        expect(route.current.templateUrl).toBe('views/main.html');
        expect(route.current.controller).toBe('MainCtrl');

        var params = {'id': '2ampcb', 'subreddit': 'jquery'}
        location.path('/details/'+ params.subreddit +'/'+ params.id);
        rootScope.$digest();

        expect(route.current.templateUrl).toBe('views/details.html');
        expect(route.current.controller).toBe('DetailsCtrl');
        expect(scope.id).toBe(params.id);
        expect(scope.subreddit).toBe(params.subreddit);


        location.path('/other');
        rootScope.$digest();

        expect(location.path()).toBe('/');
        expect(route.current.templateUrl).toBe('views/main.html');
        expect(route.current.controller).toBe('MainCtrl');
    });






});
