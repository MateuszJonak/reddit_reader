'use strict';

describe('Controller: MainCtrl', function () {

    // load the controller's module
    beforeEach(module('redditReaderApp'));

    var MainCtrl,
        scope,
        redditBackend,
        $httpBackend;

    // Initialize the controller and a mock scope
    beforeEach(inject(function (_$httpBackend_, $controller, $rootScope, redditFactory) {
        $httpBackend = _$httpBackend_;
        scope = $rootScope.$new();
        redditBackend = redditFactory;
        MainCtrl = $controller('MainCtrl', {
            $scope: scope,
            redditFactory: redditBackend
        });
    }));

    describe('Subreddit forms', function()    {

        var data,
            dataNew;

        beforeEach(function () {
            data = '{"kind": "Listing", "data": {"modhash": "", "children": ' +
                '[{"kind": "t3", "data": {"domain": "i.imgur.com", "banned_by": null, "media_embed": {}, "subreddit": "food", "selftext_html": null, "selftext": "", "likes": null, "secure_media": null, "link_flair_text": null, "id": "2annqm", "gilded": 0, "secure_media_embed": {}, "clicked": false, "stickied": false, "author": "CertifiedPuppyRapist", "media": null, "score": 1, "approved_by": null, "over_18": false, "hidden": false, "thumbnail": "default", "subreddit_id": "t5_2qh55", "edited": false, "link_flair_css_class": null, "author_flair_css_class": null, "downs": 0, "saved": false, "is_self": false, "permalink": "/r/food/comments/2annqm/baby_grand_piano_filled_with_chocolate_mousse/", ' +
                '"name": "t3_2annqm", "created": 1405363360.0, "url": "http://i.imgur.com/HAONYHf.jpg", "author_flair_text": null, "title": "Baby Grand Piano filled with Chocolate Mousse", "created_utc": 1405334560.0, "ups": 1, "num_comments": 0, "visited": false, "num_reports": null, "distinguished": null}}], ' +
                '"after": null, "before": null}}';

            dataNew = '{"kind": "Listing", "data": {"modhash": "", "children": ' +
                '[{"kind": "t3", "data": {"domain": "i.imgur.com", "banned_by": null, "media_embed": {}, "subreddit": "food", "selftext_html": null, "selftext": "", "likes": null, "secure_media": null, "link_flair_text": null, "id": "2annqm", "gilded": 0, "secure_media_embed": {}, "clicked": false, "stickied": false, "author": "CertifiedPuppyRapist", "media": null, "score": 1, "approved_by": null, "over_18": false, "hidden": false, "thumbnail": "default", "subreddit_id": "t5_2qh55", "edited": false, "link_flair_css_class": null, "author_flair_css_class": null, "downs": 0, "saved": false, "is_self": false, "permalink": "/r/food/comments/2annqm/baby_grand_piano_filled_with_chocolate_mousse/", ' +
                '"name": "t3_2ampcb", "created": 1405363360.0, "url": "http://i.imgur.com/HAONYHf.jpg", "author_flair_text": null, "title": "Baby Grand Piano filled with Chocolate Mousse2", "created_utc": 1405334560.0, "ups": 1, "num_comments": 0, "visited": false, "num_reports": null, "distinguished": null}}], ' +
                '"after": "t3_2annqm", "before": null}}';


        });

        afterEach(function() {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        it('should return data listing from reddit', function() {
            scope.subreddit = 'jquery';
            scope.submitSubreddit();
            $httpBackend.expectGET('http://www.reddit.com/r/jquery/new.json?limit=10&sort=new').respond(200, data);
            $httpBackend.flush();
            expect(scope.articles.length).toBe(1);
            expect(scope.currentPage).toBe(1);
        });

        it('should return next data listing', function() {
            scope.subreddit = 'jquery';
            scope.submitSubreddit();
            $httpBackend.expectGET('http://www.reddit.com/r/jquery/new.json?limit=10&sort=new').respond(200, data);
            $httpBackend.flush();

            scope.currentPage = 2;
            $httpBackend.expectGET('http://www.reddit.com/r/jquery/new.json?after=t3_2annqm&limit=10&sort=new').respond(200, dataNew);
            $httpBackend.flush();
            expect(scope.articles.length).toBe(1);
            expect(scope.currentPage).toBe(2);

        });

        it('should subreddit be not valid', function() {
            scope.subreddit = 'gdgdgdfgdfgd';
            scope.submitSubreddit();
            $httpBackend.expectGET('http://www.reddit.com/r/gdgdgdfgdfgd/new.json?limit=10&sort=new').respond(302);
            $httpBackend.expectGET('modalErrorListing.html').respond(200);
            $httpBackend.flush();
            expect(scope.articles).toBeUndefined();
        });

    });

});