'use strict';

describe('Config: Routes', function () {

    // load the controller's module
    beforeEach(module('redditReaderApp'));

    var DetailsCtrl,
        scope,
        $httpBackend;

    // Initialize the controller and a mock scope
    beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
        $httpBackend = _$httpBackend_;
        scope = $rootScope.$new();
        DetailsCtrl = $controller('DetailsCtrl', {
            $scope: scope
        });
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });


    describe('Routes maps', function(){
        var route,
            location,
            rootScope,
            data;


        // Initialize the controller and a mock scope
        beforeEach(inject(function ($route, $location, $rootScope) {
            route = $route;
            location = $location;
            rootScope = $rootScope;
            data = '{"kind": "Listing", "data": {"modhash": "", "children": ' +
                '[{"kind": "t3", "data": {"domain": "i.imgur.com", "banned_by": null, "media_embed": {}, "subreddit": "food", "selftext_html": null, "selftext": "", "likes": null, "secure_media": null, "link_flair_text": null, "id": "2annqm", "gilded": 0, "secure_media_embed": {}, "clicked": false, "stickied": false, "author": "CertifiedPuppyRapist", "media": null, "score": 1, "approved_by": null, "over_18": false, "hidden": false, "thumbnail": "default", "subreddit_id": "t5_2qh55", "edited": false, "link_flair_css_class": null, "author_flair_css_class": null, "downs": 0, "saved": false, "is_self": false, "permalink": "/r/food/comments/2annqm/baby_grand_piano_filled_with_chocolate_mousse/", ' +
                '"name": "t3_2annqm", "created": 1405363360.0, "url": "http://i.imgur.com/HAONYHf.jpg", "author_flair_text": null, "title": "Baby Grand Piano filled with Chocolate Mousse", "created_utc": 1405334560.0, "ups": 1, "num_comments": 0, "visited": false, "num_reports": null, "distinguished": null}}], ' +
                '"after": null, "before": null}}';
        }));

        it('should map routes to controllers', function(){
            expect(route.current).toBeUndefined();

            $httpBackend.expectGET('views/main.html').respond(200);

            location.path('/');
            rootScope.$digest();

            $httpBackend.flush();
            expect(route.current.templateUrl).toBe('views/main.html');
            expect(route.current.controller).toBe('MainCtrl');


            var params = {'id': '2ampcb', 'subreddit': 'jquery'};

            $httpBackend.expectGET('views/details.html').respond(200);

            location.path('/details/'+ params.subreddit +'/'+ params.id);
            rootScope.$digest();

            $httpBackend.flush();
            expect(route.current.templateUrl).toBe('views/details.html');
            expect(route.current.controller).toBe('DetailsCtrl');


            location.path('/other');
            rootScope.$digest();

            expect(location.path()).toBe('/');
            expect(route.current.templateUrl).toBe('views/main.html');
            expect(route.current.controller).toBe('MainCtrl');
        });
    });

});